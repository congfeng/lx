
$(document).on("pageInit","#templemap",function(e, pageId, $page) {
    var map = new BMap.Map("map");
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
        if(this.getStatus() != BMAP_STATUS_SUCCESS){
            alert('定位失败：' + this.getStatus());
            return ;
        }
        var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});
        driving.search(r.point,new BMap.Point(116.301934,39.977552));
    },{enableHighAccuracy: true});
    
    navigator.geolocation.getCurrentPosition(function(position){
        //可能需要坐标转换：http://lbsyun.baidu.com/jsdemo.htm#a5_2
        navigator.notification.alert('定位：' + position.coords.latitude + '\n' + position.coords.longitude);      
        var map = new BMap.Map("map", {});
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
        var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});
        var p1 = new BMap.Point(116.301934,39.977552);
        var p2 = new BMap.Point(position.coords.longitude,position.coords.latitude);
        driving.search(p1, p2);
    },errorHandler);
    
});
