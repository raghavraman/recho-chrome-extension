document.addEventListener('DOMContentLoaded', function() {

  chrome.cookies.get({ url: 'http://recho.com/', name: '_ot' },
  function (cookie) {
    if (cookie) {
      console.log(cookie.value);
    }
    else {
      console.log('Can\'t get cookie! Check the name!');
    }
  });


  var checkPageButton = document.getElementById('saveToAPI');
  checkPageButton.addEventListener('click', function() {
    chrome.tabs.getSelected(null,function(tab) {
    var tablink = tab.url;
    console.log(tablink)
    });
  }, false);
}, false);