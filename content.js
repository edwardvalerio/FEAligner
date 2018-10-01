
chrome.runtime.onMessage.addListener(

  function(request, sender, sendResponse) {

    if( request.message === "create_mock" ) {

          var viewer = new FEViewer();
          viewer.createFrontEndView(request.src);

    }
  }
);


var FEViewer = function() {

    this.assets = [];
    this.image = "";
    this.cssPath = "";

    this.createFrontEndView = function(src) {

        this.image = "<img id='mockimg' class='fe-viewer-asset' src='" + src + "' />";

        var cssScript = '<link class="fe-viewer-asset" href="' + this.getPath('/page/css/front-end.css') + '" rel="stylesheet" />';

        this.assets.push([this.image, cssScript]);



        this.loadToolBar();
        this.loadToDom();
        this.setUpEventListeners(this);



    };



    this.getPath = function(dir) {

         return chrome.extension.getURL(dir);


    };




    this.loadToolBar = function() {


        $('<div/>',{
            id: 'fe-tool-container',
            class: 'fe-viewer-asset'
        }).appendTo('body');

        $("#fe-tool-container").load(this.getPath('/page/modules/toolbar.html'));

    };

    this.loadToDom = function() {

    for(var i = 0; i < this.assets.length; i++) {

         $("body").append(this.assets[i]);

    }


    }

    this.setUpEventListeners = function(viewer) {

            $(document).on('click', '#fe-x', function(e){

                   viewer.removeViewer();

            });


    };



    this.removeViewer = function() {


            $(".fe-viewer-asset").each(function(){

                $(this).remove();

            });


    }


    this.hideViewer = function() {

         $(".fe-viewer-asset").each(function(){

                $(this).hide();

            })

    }


}


















