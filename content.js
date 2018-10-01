
chrome.runtime.onMessage.addListener(

  function(request, sender, sendResponse) {

    if( request.message === "create_mock" ) {

             createFrontEndView(request.src)

    }
  }
);



function createFrontEndView(img) {

        var image = "<img  draggable='true' id='mockimg' src='" + img + "' />";
        $("body").append(image);

        var cssPath = chrome.extension.getURL('/page/css/front-end.css');
        var cssScript = '<link  href="' + cssPath  + '" rel="stylesheet" />';

        $("body").append(cssScript);

}







