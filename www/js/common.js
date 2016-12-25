
var defaultContextPath = 'http://192.168.55.246/';

$.ajaxSettings.type = 'POST';
$.ajaxSettings.data = {ts:Date.now()};
$(document).off('ajaxBeforeSend').on('ajaxBeforeSend', function(e,xhr, o){
    if(o.url.indexOf('/app/') > -1){
        var userId = window.localStorage.userId;
        var clientId = window.localStorage.clientId;
        o.data = 'userId='+userId+'&clientId='+clientId+"&"+o.data;
        if(o.dataType == 'jsonp'){
            o.url = defaultContextPath+o.url+'&'+o.data;
        }
        //$.showPreloader();
    }
}).off('ajaxError').on('ajaxError', function(e,xhr,o){
    var resData;
    try{
        resData = $.parseJSON(xhr.responseText);
    }catch(e){
        console.warn(xhr);
    }
    if(!resData||!resData.t){
        return ;
    }
    switch(resData.t){
        case 20:
            $.confirm(resData.m + '，跳转登录？',function(){
                 window.location.href = "login.html";
            });
            break;
        default:
            $.alert(resData.m);    
    }
}).off('ajaxComplete').on('ajaxComplete', function(e,xhr, o){
    //$.hidePreloader();
    console.log(xhr);
});

document.addEventListener("deviceready", function(){
    
}, false);

$(function(){
    
});

window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

function errorHandler(e){
    navigator.notification.alert('操作异常：' + Object.keys(e));
}
