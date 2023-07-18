// 행사장 위치 카카오맵 생성
    var container = document.getElementById('map');  
    var options = {
        center: new kakao.maps.LatLng(37.5116828,127.059151),
        level: 3
    };

    var map = new kakao.maps.Map(container, options);

    // 지도 컨트롤
    var mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 지도에 로드뷰 정보가 있는 도로를 표시하도록 지도타입을 추가합니다
    map.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);    

    // 지도에 교통정보를 표시하도록 지도타입을 추가합니다
    map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);    

    var markerPosition = new kakao.maps.LatLng(37.5116828,127.059151);
    var marker = new kakao.maps.Marker({
        position: markerPosition
    });
    marker.setMap(map);
