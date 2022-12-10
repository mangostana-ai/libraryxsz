import {parseSearch, parseSubject} from '../parser/douban-parser'

var info = document.querySelector('.media_info>span:nth-child(2)').textContent;
var isbn = 0;
if (info && info.indexOf('ISBN') > -1) {
    isbn = info.replaceAll(/[^\d]/g,'');
}

// meet library
chrome.runtime.sendMessage({isbn: isbn, visit: 'douban-search'}, function(searchResult) {

    if ( searchResult == null) {
        return null;
    }
    var sid = parseSearch(searchResult);
    console.log(sid);

    chrome.runtime.sendMessage({sid: sid, visit: 'douban-subject'}, function(subject) {
        if ( subject == null) {
            return null;
        }
        var reviewList = parseSubject(subject);
        if (reviewList) {
            var content = document.querySelector('.body_top');
            var p = document.createElement('p');
            p.classList = 'media_scretch';
            var span = document.createElement('span');
            span.classList = 'scretch_tit';
            span.textContent = '豆瓣热评 ：';
            p.appendChild(span);
            
            reviewList.forEach(e => {
                p.appendChild(e);
            })

            content.appendChild(p);
        }
    });
});