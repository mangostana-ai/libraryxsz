# libraryxsz

Libraryxsz stands for browser(Microsoft Edge, Google Chrome) extension for Shenzhen Library.

## How to use

- go to website like douban.com, open any book page, such as  https://book.douban.com/subject/36104107/, you'll see the count of the book that can be borrowed along side with library name, where these all show at the rightside of the page.

- go to website like jd.com, open any book page, and likewise.

- go the website like zhihu.com, select any words, right click and choose 'Search from Shenzhen Library' option, and likewise.

## Behind the scene
- content scripts parse website page contents to find book name, then send message to background script
- background script is listening on context menu options, when 'Search from Shenzhen Library' option is trigger
- when search message or option is received, background script call api from Shenzhen library, then sends back the search results