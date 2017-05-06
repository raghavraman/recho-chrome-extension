  document.addEventListener('DOMContentLoaded', function() {
    var cookval,
        checkPageButton = document.getElementById('saveToAPI'),
        favPageButton = document.getElementById('saveToFAV'),
        signInButton =    
        responseText= document.getElementById('successSave');
        checkPageButton.style.display = 'block';
        document.getElementById("focusout").focus();
      chrome.cookies.get({ url: 'https://www.rekho.com/', name: '_ot' },
          function(cookie) {
              if (cookie) {
                  console.log(cookie.value);
                  cookval=cookie.value;
              } else {
                  // chrome.tabs.getSelected(null, function(tab) {
                  //     chrome.tabs.update(tab.id, { url: "http://rekho.com/test.html" });
                  // });
                  signInButton.style.display = 'block';
                  document.getElementById("focusout").focus();
                  checkPageButton.style.display = 'none';
                  favPageButton.style.display = 'none';
                  responseText.innerHTML="sign in to continue";
              }
          });


      
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

      signInButton.addEventListener('click', function() {
           chrome.tabs.create({ url: 'https://www.rekho.com/' });
      }, false);



      favPageButton.addEventListener('click', function() {
        checkPageButton.style.display = 'none';
        favPageButton.style.display = 'none';
        debugger
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
                      "url": tablink,
                      "is_favorite":"True"
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

