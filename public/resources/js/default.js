$(function() {
    var registry = new naver.maps.MapTypeRegistry();
    var mapOptions = {
        Y: 36.0207091,
        X: 127.9204629,
        level: 3
    };

    var map = new naver.maps.Map($('#map').get(0), {
        center: new naver.maps.LatLng(mapOptions.Y, mapOptions.X), //지도의 초기 중심 좌표(36.0207091, 127.9204629)
        zoom: mapOptions.level, //지도의 초기 줌 레벨
        mapTypes: registry,
        mapTypeControl: true,
        mapTypeControlOptions: {
            //style: _vender.MapTypeControlStyle.DROPDOWN
            style: naver.maps.MapTypeControlStyle.BUTTON,
            position: naver.maps.Position.TOP_RIGHT
        },
        minZoom: mapOptions.minZoom || 3,
        //maxZoom: mapOptions.maxZoom || 13
    });
    
    //_venderMap.mapTypes.set(naver.maps.MapTypeId.NORMAL, naver.maps.NaverMapTypeOption.getNormalMap());
    //_venderMap.mapTypes.set(naver.maps.MapTypeId.TERRAIN, naver.maps.NaverMapTypeOption. getTerrainMap());
    //_venderMap.mapTypes.set(naver.maps.MapTypeId.HYBRID, naver.maps.NaverMapTypeOption.getHybridMap());
    
    map.mapTypes.set(naver.maps.MapTypeId.NORMAL, naver.maps.NaverMapTypeOption.getNormalMap());
    map.mapTypes.set(naver.maps.MapTypeId.HYBRID, naver.maps.NaverMapTypeOption.getHybridMap());
    
    window.test = function(args) {
        alert('success');
    }

    windows.init = function(args) {
        map.morph(new naver.maps.LatLng(args.lat, args.lng), args.level);
    }
});