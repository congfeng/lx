
      
$(document).on("pageInit","#register",function(e, pageId, $page) {
    //alert('d1'+require);
    //var co = require('co');
    //var OSS = require('ali-oss').Wrapper;
    var ossClient = new OSS.Wrapper({
        region: 'oss-cn-shanghai',
        accessKeyId: '************',
        accessKeySecret: '****************',
        bucket: 'test'
    });
    document.querySelector('#myfile').onchange = function(ee) {
        var file = ee.target.files[0];
        return ;
        if(!this.files){
            alert('未选择');
            return ;
        }
        var file = this.files[0];
        var freader = new FileReader();  
        freader.onload = function(fe){
            alert(fe.target.result);
            $('#myImg').prop('src',fe.target.result);
        }
        freader.readAsDataURL(file); 
    };
    $('#h5file').click(function(){
        ossfiler.show('dddd',function(m){
            alert(m);
        });
        return;
        ossfiler.test(['A','B'],'c',function(r1){
            alert('r1='+r1);
        },function(r2){
            alert('r2='+r2);
        });
        //$('#myfile').trigger('click');
    });
    $('#getpicture').click(function(){
        //ossfiler.show('输入show66666ddddd');
        //return;
        cordovaHTTP.post("http://192.168.55.246/app/user/register", {
            phone:'我的电话',
            password:'我的密码'
        },{},function(response){
            //alert('response.data:'+response.data);
        },function(response){
            //alert('response.status:'+response.status);
            //alert('response.error:'+response.error);
        });
        navigator.camera.getPicture(function(imgUri){
            $('#myImg').prop('src',imgUri);
            //alert('imgUri：' + imgUri);
            ossfiler.upload(imgUri,function(m){
                alert(m);
            });
            return ;
            var fileTransfer = new FileTransfer();
            fileTransfer.upload(imgUri,encodeURI("http://192.168.55.246/demo/upload"),function(){
                alert('上传完成');
            },function(eee){
                alert('上传异常' + eee.code);
            },{
                fileKey:'image'
            });
        },errorHandler,{
            quality: 10,
            //destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            //encodingType: Camera.EncodingType.JPEG,
            allowEdit:true, //出现裁剪框
            targetWidth:100,//图片裁剪高度
            targetHeight:100,//图片裁剪高度
            //mediaType: Camera.MediaType.PICTURE
            saveToPhotoAlbum: true
        });
    });
    
    $('#getPictures').click(function(){
        window.imagePicker.getPictures(
            function(results) {
                for (var i = 0; i < results.length; i++) {
                    //alert('Image URI: ' + results[i]);
                }
                window.resolveLocalFileSystemURL(results[0],function(fileEntry){
                    alert('fileEntry.name='+fileEntry.name);
                    fileEntry.file(function(file){
                        ossClient.multipartUpload('dddddddddddd', file).then(function (r1) {
                            alert('multipartUpload success: %j' + r1);
                        }).catch(function (err) {
                            alert('multipartUploaderror:' + err);
                        });
                    });
                },function(err){
                    alert('file-err:' + err.code);
                });
                return ;
                window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs){
                        fs.root.getFile(results[0], {create: false}, function(fileEntry) {
                            alert(''+fileEntry.toURL());
                        },errorHandler);
                    }, errorHandler);
                    ossClient.put('image.jpg', results[0]).then(function (r1) {
                        alert('put success: %j' + r1);
                    }).then(function (r2) {
                        alert('get success: %j' + r2);
                    }).catch(function (err) {
                        alert('error:' + err);
                    });
                    var fileTransfer = new FileTransfer();
                    fileTransfer.upload(results[0],encodeURI("http://192.168.55.246/demo/upload"),function(){
                        alert('上传完成');
                    },function(eee){
                        alert('上传异常' + eee.code);
                    },{
                        fileKey:'image'
                    });
                    window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs){
                    alert('fs.root.name：' + fs.root.name);
                    alert('fileEntry.fullPath：' + fs.root.fullPath);
                }, errorHandler);
                ossClient.put('image.jpg', results[0]).then(function (r1) {
                    alert('put success: %j' + r1);
                }).then(function (r2) {
                    alert('get success: %j' + r2);
                }).catch(function (err) {
                    alert('error:' + err);
                });
                return ;
                ossClient.multipartUpload('image.jpg', imgUri).then(function (r1) {
                    alert('put success: %j' + r1);
                }).then(function (r2) {
                    alert('get success: %j' + r2);
                }).catch(function (err) {
                    alert('error:' + err);
                });
                return ;
                var fileTransfer = new FileTransfer();
                fileTransfer.upload(imgUri,encodeURI("http://192.168.55.246/demo/upload"),function(){
                    alert('上传完成');
                },function(eee){
                    alert('上传异常' + eee.code);
                },{
                    fileKey:'image'
                });
                return ;
                //imgUri = imgUri.substring(7,imgUri.indexOf('?'));
                OSS.co(function* () {
                    yield ossClient.list().then(function(results){
                        alert('长度：' + results.objects.length);
                    });
                }).catch(function(err){
                    alert('----err-----'+err);
                });
                //ossClient.put('my-obj', new OSS.Buffer('hello world'));
                window.resolveLocalFileSystemURL(imgUri,function(fileEntry){
                    alert('fileEntry.name='+fileEntry.name);
                    alert('fileEntry.fullpath='+fileEntry.fullPath);
                    var extName = '';
                    if(fileEntry.name.indexOf('.') == -1){
                        extName = '.jpg';
                    }
                    ossClient.multipartUpload(fileEntry.name+extName, fileEntry.fullPath+extName).then(function (r1) {
                        alert('put success: %j' + r1);
                        return ossClient.get('test.jpg');
                    }).then(function (r2) {
                        alert('get success: %j' + r2);
                    }).catch(function (err) {
                        alert('error:' + err);
                    });
                },function(err){
                    alert('file-err:' + err.code);
                })
            }, function (error) {
                console.log('Error: ' + error);
            }, {
                quality: 10,
                maximumImagesCount: 10,
                width: 800
            }
        );
    });
    
    $('#takepicture').click(function(){
        navigator.camera.getPicture(function(imgUri){
            alert(imgUri);
            $('#myImg').prop('src',imgUri);
            window.resolveLocalFileSystemURL(imgUri, function(fileEntry) {
                alert(fileEntry.fullPath);
            });
        },errorHandler,{
            quality: 10,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE
        });
    });
});

var cameraOptions = {
    //quality: 100,                                            //相片质量0-100
    //destinationType: Camera.DestinationType.FILE_URI,        //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
    //sourceType: Camera.PictureSourceType.CAMERA,             //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
    //allowEdit: false,                                        //在选择之前允许修改截图
    //encodingType: Camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1
    //targetWidth: 200,                                        //照片宽度
    //targetHeight: 200,                                       //照片高度
    //mediaType: 0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
    //cameraDirection: 0,                                       //枪后摄像头类型：Back= 0,Front-facing = 1
   //popoverOptions: CameraPopoverOptions,
    //saveToPhotoAlbum: true
};

