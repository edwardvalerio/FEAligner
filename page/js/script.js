$(document).ready(function(){



    $("#fe-file").change(function(){

        var imageFile = $(this).get(0).files[0];



      sendToContent(imageFile);






    });


});



function sendToContent(file) {




        var reader  = new FileReader();

        reader.addEventListener("load", function () {

            chrome.runtime.sendMessage({"message": "bg_mock", "src": reader.result});

            window.close();

        }, false);

        if (file) {
        reader.readAsDataURL(file);
        }



}
