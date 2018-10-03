
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
    this.step = 2;

    this.createFrontEndView = function(src) {

        this.image = "<div id='mockimg' class='fe-viewer-asset' style='background-image:url("+ src + ")'></div>";

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

            $(document).on('click', '#fe-hide-btn', function(e){
                   viewer.toggleToolbar();
            });

            $(document).on('change input', '#fe-opacity', function(e){

                   var val = $(this).val();

                   viewer.changeOpacity(val);
            });

            $(document).on('click', '#fe-directional-controllers .fe-arrow', function(e){


                   var direction = $(this).data('direction');
                   viewer.moveAsset(direction, viewer.step);



            });

            $(document).on('click', '#toggleView', function(e){
                   viewer.toggleAssetView();
            });

            $(document).on('mousedown', '#mockimg', function(e){
                  viewer.dragAsset(e, $(this));
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


    this.toggleToolbar = function() {

         $("#fe-tool-container").toggleClass('hidden');

    }


     this.toggleAssetView = function() {

         $("#mockimg, #toggleView").toggleClass('active');

    }

    this.changeOpacity = function(opacity) {
         var max = $("#fe-opacity").prop('max');
         var percent = opacity/parseInt(max);

         $("#mockimg").css('opacity', percent);
         $(".fe-percent").html("(" + Math.round(percent*max) + "%)");


    }

    this.moveAsset = function(direction, step) {

         var obj = $("#mockimg");


         switch(direction) {

             case "up":

                 obj.css('top', "-=" + step );

                 break;

             case "down":

                 obj.css('top', "+=" + step );

                 break;

             case "left":

                 obj.css('left', "-=" + step );

                 break;

             case "right":

                 obj.css('left', "+=" + step );

                 break;

             case "center":

                 obj.css( { 'top' : '0px', 'left' : '0px' });

                 break;

             default:

                  obj.css( { 'top' : '0px', 'left' : '0px' });
                 break;





         }





    }


    this.dragAsset = function(event, asset) {

        var cw = parseInt(asset.width()/2);
        var ch = parseInt(asset.height()/2);
        var cx = event.clientX - asset[0].getBoundingClientRect().left;
        var cy = event.clientY - asset[0].getBoundingClientRect().top;


        console.log(event.clientY  +  " - " + event.pageY + " - " + event.screenY);

        function moveAt(pageX, pageY) {

            asset.css({ 'left' : pageX - cx + 'px', 'top' : pageY - cy + 'px' , 'cursor' : 'move' });

        }


        function onMouseMove(event) {
            moveAt(event.clientX, event.clientY);
        }


        $(document).on('mousemove', function(e){

            onMouseMove(e);

        });

        $(document).on('mouseup', asset, function(e){

             $(document).off('mousemove');

        });


        asset.on('dragstart', function(e){

            return false;


        });


};



}


















