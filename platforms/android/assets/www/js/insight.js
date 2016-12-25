
$(document).on("pageInit","#insight",function(e, pageId, $page) {
    
    $('#createTemDir').click(function(){
        window.requestFileSystem(window.TEMPORARY, 5*1024*1024, function(fs){
            fs.root.getDirectory('pictures', {create: true},function(dirEntry){
                
            },errorHandler);
        },errorHandler);
        alert('创建完成createTemDir');
    });
    
    $('#downloadImge').click(function(){
        var fileTransfer = new FileTransfer();
        var uri = encodeURI("http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg");
        var fileURL = 'cdvfile://localhost/temporary/pictures/myimage.jpg';
        fileTransfer.download(uri,fileURL,function(){
            alert('下载完成');
        },function(e){
            alert('下载异常' + e.code);
        });
    });
    
    $('#loadShowImage').click(function(){
        window.requestFileSystem(window.TEMPORARY, 5*1024*1024, function(fs){
            fs.root.getFile('pictures/myimage.jpg', {}, function(fileEntry) {
                $('#myImg').prop('src',fileEntry.toURL());
            },errorHandler);
        },errorHandler);
    });
    
});
