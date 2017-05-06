document.addEventListener('DOMContentLoaded', function() {
  var cookval;
    chrome.cookies.get({ url: 'https://www.rekho.com/', name: '_ot' },
        function(cookie) {
            if (cookie) {
                console.log(cookie.value);
                cookval=cookie.value;
            } else {
                chrome.tabs.getSelected(null, function(tab) {
                    chrome.tabs.update(tab.id, { url: "http://rekho.com/test.html" });
                });
            }
        });


    var checkPageButton = document.getElementById('saveToAPI');
    checkPageButton.style.display = 'block';
    var responseText=document.getElementById('successSave');
    checkPageButton.addEventListener('click', function() {
      checkPageButton.style.display = 'none';
      $('#loadinGif').show();
        chrome.tabs.getSelected(null, function(tab) {
            var tablink = tab.url;
                //send request tot api
            $.ajax({
                url: "https://api.rekho.com/v1/articles/",
                type: "POST",
                dataType: "json",
                headers: {
                    "Authorization": "token " + cookval
                },
                data: {
                    "url": tablink
                },
                success: function(data) {
                    responseText.innerHTML="Added to your listening list";
                    $('#loadinGif').hide();
                },
                error: function(e) {
                  responseText.innerHTML="Sorry:     " +e.responseJSON.url.join(", ");
                    console.log(e);
                    $('#loadinGif').hide();
                }
            });
        });
    }, false);
}, false);

