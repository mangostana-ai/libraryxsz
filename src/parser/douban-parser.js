function parseSearch(dom) {
    // parse html
    var parser = new DOMParser();
    var doc = parser.parseFromString(dom, "text/html");
    var title = doc.querySelector('.result>.content>.title');
    if (title) {
        var c = title.querySelector('h3>span');
        if (c && c.textContent.indexOf('书籍')>-1) {
            var a = title.querySelector('h3>a');
            var fnInfo = a.getAttribute('onclick');
            var m = fnInfo.match(/sid[^\d]+(\d+)/);
            return m[1];
        }
    }


    return 0;
}

function parseSubject(dom) {
    //  
    var parser = new DOMParser();
    var doc = parser.parseFromString(dom, "text/html");
    var list = doc.querySelectorAll('.review-list>div');
    if(list) {
        var tempList = [];
        for(var i = 0; i < 3; i++) {
            var node = list[i];
            if (node) {
                let children = node.getElementsByTagName("*");
                for (let item of children) {
                    item.style.fontSize = "12px"; //getNewFontSizeSomewhere();
                }
            }
            tempList.push(node);
        }
        return tempList;
    }
    return [];
}

export { parseSearch, parseSubject }