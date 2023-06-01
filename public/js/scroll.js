//cont1~cont4 -> 중간구역의 시작 위치값을 받기 위해 필요
const contains = document.querySelectorAll("#container > div");
//contains[0] [1] [2] [3] => 반복문 사용될 것
const header = document.querySelector("#header");
//2depth 메뉴 뒤의 배경화면
const right_fix = document.querySelectorAll(".right_fix .menu > li > a");
//좌측에 클릭할 동그라미 버튼들. CSS에서 a에 속성을 부여했기 때문에 a들을 선택해야 함
const cont1Logo = document.querySelector(".c1LogoWrap");
// 컨테이너 1 로고
let countOnce = true;
// 컨테이너 2 x카운팅이벤트 한번만 실행되게 할 논리값 

let c1Text = "5.10(수) ~ 5.12(금), Hall D COEX, Seoul"; // 타이핑할 텍스트
let serveText = ""; // 타이핑할 텍스트 전달해줄 변수
let i = 0; // 타이핑 글자 갯수 변수
const c1Typing = document.querySelector("#container .cont1 .center > h2"); // 타이핑 효과 위치

// 화면 로드되자마자 로고와 글씨 타이핑 효과(1회만 실행)
cont1Logo.classList.add("on");
let autoTyping = setInterval(function(){
    //실제로 코드가 돌아갈 함수 호출
    startTyping();
},105);

//타이핑하는 실제 코드 구간 함수
function startTyping(){
    serveText = c1Text[i]; //한 글자를 변수에 옮겨놓고
    i += 1; //순번 값을 1 증가

    c1Typing.innerText += serveText;  //스판태그에 텍스트 추가(innerText로 쓰면 코드 꼬임)

    if (i > c1Text.length-1){ //조건문으로 모든 글자 출력이 다 끝난 경우
        clearInterval(autoTyping); //자동실행 멈춤
    }
}

// 왼쪽 메뉴 클릭 시 스크롤바 움직이는 기능
for (let i=0; i<right_fix.length; i++){
    right_fix[i].onclick = function(event){
    // a의 링크기능을 중단
    event.preventDefault();
    //클릭한 메뉴 순번과 매칭되는 중간구역 시작위치값을 받아와야 함
    let movePosition = contains[i].offsetTop;
    // 스크롤 이동 기능
    window.scrollTo({
      top:movePosition,
      behavior:"smooth" 
    });
    //스크롤바 부드럽게 이동
  }
}    

// 스크롤바를 움직였을 때 기능 실행
window.onscroll = function(){
    //스크롤바 위치값 받아오기
    let scTop = window.scrollY;
    
    //스크롤바의 위치값이 해당 중간구역에 있는가 -> 해당 메뉴 활성화
    for(let j=0; j<contains.length; j++){
        //리팩토링 refactoring
        if(scTop >= contains[j].offsetTop){
            for(let i=0; i<right_fix.length; i++){
                //모든 right_fix 초기화
                right_fix[i].classList.remove("on");
            }
            // 해당하는 right_fix 활성화
            right_fix[j].classList.add("on");
        }
        
    }
    // 스크롤바의 위치가 0보다 크다면 헤더의 클래스on 부여해서 스타일 변경
    if(scTop > 0){
        header.classList.add("on");
        gnbBg.style.backgroundColor="#FFF";
    }
    else{
        header.classList.remove("on");
        gnbBg.style.backgroundColor="#FFF0";
    }

    // 스크롤바의 값이 두번째 컨테이너에 도달했을 때
    if(scTop>= contains[1].offsetTop-600){
        // 컨텐츠 (섹션 제목과 슬라이더) 등장 효과
        contains[1].querySelector(".topText").classList.add("on");
        setTimeout(() => {
            contains[1].querySelector(".swiper").classList.add("on");
        }, 250);
        setTimeout(() => {
            contains[1].querySelectorAll(".countings").forEach((boxes, idx)=>{
                boxes.classList.add("on");
                boxes.style.transitionDelay = (0.2 * idx)+"s";
            });
        }, 500);
        // 카운팅 효과 구간
        const count = document.querySelectorAll(".number"); //카운팅될 박스 4개 선택
        const arrive = [41392, 27, 220, 800]; //카운팅될 숫자 지정
        setTimeout(()=>{
            if(countOnce){
                count.forEach(function(el,idx){
                    countUp(el,arrive[idx]); // 카운트 함수 실행(countUp.js)
                });
            }
            countOnce = false;  //카운팅 효과는 최초 1회만 발생하도록 논리값 변경
        },1000);
    }
    // 스크롤바의 값이 세번째 컨테이너에 도달했을 때
    if(scTop>= contains[2].offsetTop -650){
        // 컨텐츠(헤드라인, 기업 로고, 참가신청) 등장 효과
        contains[2].querySelector("h3").classList.add("on");
        contains[2].querySelectorAll(".sponserWrap").forEach((el, idx)=>{
            el.classList.add("on");
            el.style.transitionDelay = (0.2 * idx)+"s";
        })
        setTimeout(() => {
            contains[2].querySelector(".joinWrap").style.opacity = 1;
        }, 500);
    }
    // 스크롤바의 값이 네번째 컨테이너에 도달했을 때
    if(scTop>= contains[3].offsetTop -700){
        // 컨텐츠, 사진첩 등장 효과
        contains[3].querySelector(".center > h3").classList.add("on");
        setTimeout(() => {
            contains[3].querySelector(".PhotoMenus").classList.add("on");
        },250);
        setTimeout(() => {
            contains[3].querySelector(".PhotoWrap").classList.add("on");
        },500);
    }
}
