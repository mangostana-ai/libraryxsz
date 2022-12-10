var isbn = document.querySelector('.bookInfo>.li:nth-child(3)>.column:nth-child(2)>.infoItem>:last-child').textContent;

// meet library
chrome.runtime.sendMessage({ isbn: isbn,visit: 'library' }, function (response) {
    console.log(response);
    if (response == null) {
        return null;
    }
    var aside = document.querySelector("body");
    var con = document.createElement('div');
    con.classList = 'download-con libraryxsz';
    con.style = 'position: fixed;top:240px;left:15px;z-index:100';
    aside.prepend(con);

    var title = document.createElement('div');
    title.classList = 'download-tit';
    var h3 = document.createElement('h3');
    h3.textContent = '深圳图书馆可借馆藏';
    title.appendChild(h3);
    con.appendChild(title);

    var list = document.createElement('div');
    list.classList = 'device-list';
    con.appendChild(list);

    var ul = document.createElement('ul');
    list.appendChild(ul);

    Object.keys(response).forEach(key => {
        var cnt = response[key];
        var li = document.createElement('li');
        li.textContent = `${key} (${cnt})`;
        ul.appendChild(li);
    })
})