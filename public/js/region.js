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

//교통정보를 가장 앞 레이어에 표시
var mapTypes = {  
    roadview :  kakao.maps.MapTypeId.ROADVIEW,
    traffic :  kakao.maps.MapTypeId.TRAFFIC,    
};

// 체크 박스를 선택하면 호출되는 함수입니다
function setOverlayMapTypeId() {
    // 로드뷰 보기/숨김 처리할 체크박스와 텍스트
    const roadviewToggle = document.querySelector("#roadviewToggle");
    const trafficToggle = document.querySelector("#trafficToggle");
    const roadviewText = document.querySelector("#roadviewText");
    const trafficText = document.querySelector("#trafficText");
    // 지도 타입을 제거합니다
    for (var type in mapTypes) {
        map.removeOverlayMapTypeId(mapTypes[type]);    
    }
    // 로드뷰 체크박스가 체크되어있으면 지도에 로드뷰 지도타입을 추가합니다
    if (roadviewToggle.checked) {
        map.addOverlayMapTypeId(mapTypes.roadview);   
        roadviewText.innerText="로드뷰 숨기기"; 
    }
    else{
        roadviewText.innerText="로드뷰 보기"; 
    }

    // 교통정보 체크박스가 체크되어있으면 지도에 교통정보 지도타입을 추가합니다
    if (trafficToggle.checked) {
        map.addOverlayMapTypeId(mapTypes.traffic);    
        trafficText.innerText="교통정보 숨기기"; 
    }
    else{
        trafficText.innerText="교통정보 보기"; 
    }

}
// 지도에 로드뷰 정보가 있는 도로를 표시하도록 지도타입을 추가합니다
map.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);    

// 지도에 교통정보를 표시하도록 지도타입을 추가합니다
map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);    

// 마커 생성
var markerPosition = new kakao.maps.LatLng(37.5116828,127.059151);
var marker = new kakao.maps.Marker({
    position: markerPosition
});

marker.setMap(map);

// 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    var iwContent = `<div class="infowindow">
						<p>AI EXPO 2023</p>
                	 </div>`, 
    iwPosition = new kakao.maps.LatLng(37.5116828,127.059151); //인포윈도우 표시 위치입니다

// 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({
    position : iwPosition, 
    content : iwContent 
});
  
// 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
infowindow.open(map, marker); 