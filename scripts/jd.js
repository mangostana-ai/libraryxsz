// find isbn
const info = document.querySelector(".p-parameter>ul>li:nth-child(2)")
var cts = info.textContent.split(/\n/).filter(item => item.replaceAll(/\s|\t| /g,'').length> 0)
var isbn = cts[cts.length-1].match(/(\d+)/)[1]

// meet library
chrome.runtime.sendMessage({isbn: isbn}, function(response) {
    console.log(response);
    if ( response == null) {
        return null;
    }
    var aside = document.querySelector("#ypds-list");
    
    var gray = document.createElement('div');
    gray.classList = 'm m-aside';
    var title = document.createElement('div');
    title.styleList = 'mt';
    var h2 = document.createElement('h2');
    h2.textContent = '深圳图书馆可借馆藏';
    title.appendChild(h2);
    gray.appendChild(title);

    var content = document.createElement('div');
    content.styleList = 'mc';

    var ul = document.createElement('ul');
    ul.styleList = 'lh';
    Object.keys(response).forEach(key => {
        var cnt = response[key];
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = 'javascript:void(0)';
        a.textContent = `${key} (${cnt})`;
        li.appendChild(a);
        
        ul.appendChild(li);
    })
    content.appendChild(ul);
    gray.appendChild(content);

    aside.prepend(gray);

  });