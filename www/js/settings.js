
$(document).on("pageInit","#settings",function(e, pageId, $page) {
    $('#checkUpdate').click(function(){
    	cordova.getAppVersion.getVersionNumber(function (version) {
    		alert(version);
    		AppUpdater.start('http://192.168.1.106:8080/lx.apk');
    	});
    });
    $('#errorCatch').click(function(){
    	ErrorCrash.coolMethod('crash',function(m){
    		alert(m);
    	},function(){
    		alert('error');
    	});
    });
});
