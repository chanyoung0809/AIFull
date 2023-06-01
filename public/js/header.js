// 마우스 올릴 gnb 메뉴 묶음 선택
const gnbMenu = document.querySelector(".gnbWrap");
// depth1 메뉴
const depth2 = document.querySelectorAll(".depth2");
// depth2 메뉴(ul) 5개 선택
const gnbBg = document.querySelector(".gnbBg");
// depth2 100% 배경

gnbMenu.onmouseenter = function(){
    //5개의 2댑스가 동시에 등장
    depth2.forEach(function(el){
        el.classList.add("on");
    });
    //gnbBg 화면에 나오게 처리
    gnbBg.classList.add("on");
}
//마우스 내렸을 때 이벤트
gnbMenu.onmouseleave = function(){
    //5개의 2댑스 사라지게
    depth2.forEach(function(el, idx){
        el.classList.remove("on");
    });
    //gnbBg 화면에 나오게 처리
    gnbBg.classList.remove("on");
}