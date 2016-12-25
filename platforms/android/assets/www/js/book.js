
$(document).on("pageInit","#book",function(e, pageId, $page) {
    $('#createBookDir').click(function(){
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs){
            fs.root.getDirectory('books', {create: true},function(dirEntry){
                
            },errorHandler);
        },errorHandler);
        alert('创建完成createBookDir');
    });
    $('#readBookDir').click(function(){
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs){
            var dirReader = fs.root.createReader();
            var entries = [];
            var readEntries = function() {
                dirReader.readEntries(function(results) {
                    alert('results.length='+results.length);
                    if (results.length) {
                        entries = entries.concat(results);
                        readEntries();  
                    }
                });
            };
            readEntries(); 
        },errorHandler);
    });
    $('#downloadBook').click(function(){
        
    });
    $('#deleteBook').click(function(){
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs){
            fs.root.getFile('log.txt', {create: false}, function(fileEntry) {
                fileEntry.remove(function() {
                    alert('File removed.');
                },errorHandler);
            },errorHandler);
        },errorHandler);
    });
    $('#readBook').click(function(){
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs){
            fs.root.getFile('log.txt', {}, function(fileEntry) {
                fileEntry.file(function(file) {
                    var reader = new FileReader();
                    reader.onloadend = function(e) {
                        alert('文件内容：' + this.result);
                    };
                    reader.readAsText(file);
                },errorHandler);
            },errorHandler);
        },errorHandler);
    });
});
