var POSTURL = 'https://thebillwizard.com/wp-json/wp/v2/posts?post_type=post&_embed&status=publish&per_page=5&page=1';
var DAYLIMIT = 4;
var PENDING = 0;

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });


});

// This block is new!
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    switch(request.message) {

        case "open_new_tab":
               chrome.tabs.create({"url": request.url});

             break;

        case "returned_badge":

             break;

        case "bg_mock":


              chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                  var activeTab = tabs[0];
                  chrome.tabs.sendMessage(activeTab.id, {"message": "create_mock" , "src" : request.src });
              });

             break;


           }

  }

);





