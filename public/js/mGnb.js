const mGnbBg = document.querySelector(".mGnbBg"); 
// 모바일 메뉴 등장하면 같이 등장할 가로세로 100%짜리 배경화면(메인화면 클릭 막아줌)
const mGnbWrap = document.querySelector(".mGnbWrap");
// 등장할 모바일 메뉴 묶음
const mGnbCloseBtn = document.querySelector(".closeBtnWrap .hbgMenu.clicked");
// 등장한 모바일 메뉴의 닫기 버튼
const mGnbOpenBtn = document.querySelector(".userGnb > li .hbgMenu");
//모바일 gnb 등장 시 스크롤 막아줘야 할 바디 태그
const body = document.querySelector('body');


mGnbOpenBtn.onclick = ()=>{
    mGnbOpenBtn.classList.add("clicked");
    mGnbBg.classList.add("on");
    mGnbCloseBtn.classList.add("clicked");
    body.style.overflowY = 'hidden';
}
mGnbCloseBtn.onclick = ()=>{
    mGnbCloseBtn.classList.remove("clicked");
    mGnbBg.classList.remove("on");
    mGnbOpenBtn.classList.remove("clicked");
    body.style.overflowY = 'unset';
}



const depth1Menu = document.querySelectorAll(".mGnb > li > a");
// 1뎁스 메뉴이면서 클릭하면 열리고 닫힐 중메뉴들

const line1 = document.querySelectorAll(".onoff .line.one");
const line2 = document.querySelectorAll(".onoff .line.two");
// 1뎁스 메뉴의 동그라미 안 +- 기호가 될 선 두개

const depth2Menu = document.querySelectorAll(".mGnb > li .sub");
const depth2MenusHeight = [63, 92, 92, 63];

depth1Menu.forEach((menus, i)=>{
    menus.onclick = (e)=>{
        e.preventDefault();
        if(menus.classList.contains("clicked")){
            menus.classList.remove("clicked");
            line1[i].classList.remove("clicked");
            line2[i].classList.remove("clicked");
            depth2Menu[i].style.height = 0;
        }
        else {
            depth1Menu.forEach((menu, j)=>{
                menu.classList.remove("clicked");
                line1[j].classList.remove("clicked");
                line2[j].classList.remove("clicked");
                depth2Menu[j].style.height = 0;
            });
            menus.classList.add("clicked");
            line1[i].classList.add("clicked");
            line2[i].classList.add("clicked");
            depth2Menu[i].style.height = depth2MenusHeight[i]+"px";          
        }
    }
});