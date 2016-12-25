
$(document).on("pageInit","#msgadd",function(e, pageId, $page) {
    $('#selectImages1').click(function(){
        window.imagePicker.getPictures(
            function(results) {
                for (var i = 0; i < results.length; i++) {
                    alert('Image URI: ' + results[i]);
                }
            }, function (error) {
                console.log('Error: ' + error);
            }, {
                quality: 20,
                maximumImagesCount: 10,
                width: 800
            }
        );
        alert('end');
    });
    
    $('#selectImages2').click(function(){
        imageselector.getImages('',function(r1){
            alert('r1='+r1);
        },function(r2){
            alert('r2='+r2);
        });
        alert('end');
    });
    
});
