
$(document).on("pageInit","#music",function(e, pageId, $page) {
    $('#createMusicDir').click(function(){
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs){
            fs.root.getDirectory('music', {create: true},function(dirEntry){
                
            },errorHandler);
        },errorHandler);
        alert('创建完成createMusicDir');
    });
    $('#downloadMusic').click(function(){
        var fileTransfer = new FileTransfer();
        var uri = encodeURI("http://192.168.1.102:8080/c.mp3");
        var fileURL = 'cdvfile://localhost/persistent/music/m.mp3';
        fileTransfer.download(uri,fileURL,function(){
            alert('下载完成');
        },function(e){
            alert('下载异常' + e.code);
        });
    });
    $('#playMusic').click(function(){
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs){
            fs.root.getFile('music/m.mp3', {}, function(fileEntry) {
                alert(fileEntry.toURL());
                var my_media = new Media(fileEntry.toURL(),function(){
                    alert('播放成功');
                },function(){
                    alert('播放是吧');
                });
                my_media.play();
            },errorHandler);
        },errorHandler);
    });
});
