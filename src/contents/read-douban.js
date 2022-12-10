var isbn = document.querySelector('.article-meta>p:last-child>span:last-child').textContent;

// meet library
chrome.runtime.sendMessage({ isbn: isbn,visit: 'library' }, function (response) {
    console.log(response);
    if (response == null) {
        return null;
    }
    var aside = document.querySelector('aside');

    var section = document.createElement('section');
    aside.prepend(section);

    var heading = document.createElement('div');
    heading.classList = 'hd author-heading';
    var h3 = document.createElement('h3');
    h3.textContent = '深圳图书馆可借馆藏';
    heading.appendChild(h3);
    section.appendChild(heading);

    var bd = document.createElement('div');
    bd.classList = 'bd';
    var works = document.createElement('div');
    works.classList = 'author-other-works';
    bd.appendChild(works);
    section.appendChild(bd);

    Object.keys(response).forEach(key => {
        var cnt = response[key];
        var title = document.createElement('div');
        title.classList = 'title';
        var prefix = document.createTextNode(`${key}（`);
        title.appendChild(prefix);
        var a = document.createElement('a');
        a.href = 'javascript:void(0)';
        a.textContent = `${cnt}`;
        title.appendChild(a);
        var suffix = document.createTextNode('）');
        title.appendChild(suffix);
        works.appendChild(title);
    })


});