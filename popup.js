document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('saveToAPI');
  checkPageButton.addEventListener('click', function() {
    chrome.tabs.getSelected(null,function(tab) {
    var tablink = tab.url;
    console.log(tablink)
    });
  }, false);
}, false);