

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    checkBorrowable(request).then(sendResponse);
    return true; // return true to indicate you want to send a response asynchronously
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create(
        {
            title: '查询深圳图书馆：%s', // %s表示选中的文字
            contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
            documentUrlPatterns: ["https://*.zhihu.com/*"],
            id: "pamjfaaphhhkijadcpoadijenmlldcni"
        }
    )
  });

chrome.contextMenus.onClicked.addListener((info, tab) => {
    checkBorrowable({title: info.selectionText}).then(result => {
        chrome.tabs.sendMessage(tab.id, result, (response)=>{});
    });
    
});

async function checkBorrowable(request) {
    var books = await getBooks(request);
    // await .....
    var json = JSON.parse(books);
    if (json && json.data && json.data.docs && json.data.docs.length > 0) {
        // Promise.all
        let docs = json.data.docs;
        let arr = []
        docs.forEach(item => {
            arr.push(getBorrowable(item));
        });
        let data = await Promise.all(arr).then((values) => {
            console.log(values);
            let addrToCount = {};
            values.forEach(value => {
                console.log(value);
                if (value instanceof Array) {
                    value.forEach(item => {
                        if (addrToCount.hasOwnProperty(item.library)) {
                            addrToCount[item.library] += item.cnt;
                        } else {
                            addrToCount[item.library] = item.cnt;
                        }
                    });
                }

            });
            return addrToCount;
        });
        return data;
    }
    return {};
}
async function getBooks(request) {
    let {isbn, title} = request;
    if (isbn == 0) {
        return {};
    }
    var url = '';
    if (title) {
        url = `https://szlib.org.cn/api/opacservice/getQueryResult?v_index=title&v_value=${title}+&library=all&v_tablearray=bibliosm,serbibm,apabibibm,mmbibm,&cirtype=&sortfield=ptitle&sorttype=desc&pageNum=10&v_page=1&v_startpubyear=&v_endpubyear=&v_secondquery=`;
    } else {
        url = `https://szlib.org.cn/api/opacservice/getQueryResult?v_index=isbn&v_value=${isbn}+&library=all&v_tablearray=bibliosm,serbibm,apabibibm,mmbibm,&cirtype=&sortfield=ptitle&sorttype=desc&pageNum=10&v_page=1&v_startpubyear=&v_endpubyear=&v_secondquery=`;
    }
    let response = await fetch(url, { mode: 'no-cors' });
    // .then(r => r.text())
    // .then(result => {
    //     return result;
    // })
    return await response.text();
}

async function getBorrowable(item) {
    let recordid = item.recordid;
    let url = `https://szlib.org.cn/api/opacservice/getBookDetail?metaTable=bibliosm&metaId=${recordid}&library=all`;
    let response = await fetch(url, { mode: 'no-cors' });
    let text = await response.text();
    var json = JSON.parse(text);
    if (json && json['CanLoanBook'] && json['CanLoanBook'].length > 0) {
        let canLoanBooks = json['CanLoanBook'];
        return canLoanBooks.map(item => {
            return {
                library: item.serviceaddrnotes,
                cnt: item.recordList.length
            }
        });
    }
    return {};
}
