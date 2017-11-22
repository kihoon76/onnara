$(function() {
    var markers = [];
    var infos = [];
    var markerLog = {};

    var container = $('#map'); //지도를 담을 영역의 DOM 레퍼런스
    var options = { //지도를 생성할 때 필요한 기본 옵션
        center: new daum.maps.LatLng(container.data('lng'), container.data('lat')), //지도의 중심좌표.
        level: container.data('level') //지도의 레벨(확대, 축소 정도)
    };
    
    var map = new daum.maps.Map(container.get(0), options); //지도 생성 및 객체 리턴
    map.addOverlayMapTypeId(daum.maps.MapTypeId.USE_DISTRICT);
    
    var imageSrc = 'http://hotplace.ddns.net:10001/resources/img/markerimg1.png', // 마커이미지의 주소입니다    
        imageSize = new daum.maps.Size(30, 36), // 마커이미지의 크기입니다
        imageOption = {offset: new daum.maps.Point(15, 36)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption);

    function _info(num) {
        return '<div class="customoverlay">' + num + '</div>';
    }

    window.createMarker = function(num, lng, lat) {
        try {

            if(markerLog[num]) return;
            var marker =  new daum.maps.Marker({
                position: new daum.maps.LatLng(lng, lat),
                image: markerImage
            });

            marker.setMap(map);
            /*var infoWin = new daum.maps.InfoWindow({
                position : new daum.maps.LatLng(lng, lat), 
                content : _info(num) 
            });*/

            var customOverlay = new daum.maps.CustomOverlay({
                map: map,
                position: new daum.maps.LatLng(lng, lat),
                content: _info(num),
                yAnchor: 1 
            });
           
           
            markers.push(marker);
            markerLog[num] = {lng: lng, lat: lat};
            infos.push(customOverlay);
            //infoWin.open(map, marker); 
        }
        catch(e) {
            alert(e.message);
        }
    }

    window.ctrlJi = function(s) {
        if(s == '1') {
            map.addOverlayMapTypeId(daum.maps.MapTypeId.USE_DISTRICT);
        }
        else {
            map.removeOverlayMapTypeId(daum.maps.MapTypeId.USE_DISTRICT);
        }
    }
});