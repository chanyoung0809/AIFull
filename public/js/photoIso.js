// 사진 분류할 클릭 메뉴들 3개
const PhotoMenus = document.querySelectorAll(".PhotoMenus li");

PhotoMenus.forEach(function(menus, idx){
    menus.onclick = function(event){
        event.preventDefault();
        //메뉴 클릭시 속성값 가지고오기
        let data = menus.getAttribute("data-photos");
        //클릭시 가지고온 속성값에 해당하는 태그들만 재배치
        iso.arrange({
            filter:data,
            transitionDuration:"0.5s"
        });
        
        PhotoMenus.forEach(function(buttons){            
            //모든 버튼들의 클래스 제거
            buttons.classList.remove("on");
        });
        // 선택한 버튼의 클래스 추가
        menus.classList.add("on");
    }
});

// 정렬할 자식 감싸는 부모태그 선택
let elem = document.querySelector('.PhotoWrap');
// 포지션 값이 적용될 수 있도록 사전 세팅
let iso = new Isotope(elem, {
    // options
    itemSelector:'.all',
    layoutMode: 'fitRows'
});