const swiper = document.querySelector(".swiper"); //슬라이드 보이는 영역
const slider = document.querySelector(".slider-wrap"); // 슬라이드 6개 감싸는 영역
const slide = document.querySelectorAll(".swiper-slide"); //각 슬라이드
let slideidx = 0; //슬라이드 인덱스
let maxidx = slide.length-1; //슬라이드 최대 갯수값 -1
let autoToggle = true; // 자동재생 기능 위한 논리값
const pagination = document.querySelector(".swiper-pagination"); // 하단 네비게이션 바
const prevBtn = document.querySelector(".swiper-button-prev"); //이전버튼
const nextBtn = document.querySelector(".swiper-button-next"); //이후버튼

/* 자동재생함수 */
let autoslide = setInterval(function(){
    if(autoToggle){ // 자동재생함수 실행 위한 논리값이 참일 때만 실행됨
        nextSliding();
    }
}, 5000);
// 자동재생 멈춤기능(이전이후 버튼 눌렀을 때, 슬라이드영역에 호버했을때)
if(autoToggle === false){
    clearInterval(autoslide); //자동재생함수 기능종료
}
//슬라이드에 마우스 호버됐을 때 3초 후 자동재생 멈춤
swiper.onmouseenter=()=>{
    autoToggle = false; // 자동재생함수 실행 위한 논리값 false로 변경
}
//슬라이드에서 마우스 뗐을 때 자동재생 다시 시작
swiper.onmouseleave=()=>{
    autoToggle = true; // 자동재생함수 실행 위한 논리값 true로 변경
}

/* 다음 버튼 클릭 */
nextBtn.onclick = function(){
    autoToggle = false;
    nextSliding();
}
// 다음 슬라이드 넘어가는 함수
function nextSliding(){
    if(slideidx == maxidx){
        slideidx = 0;
    }
    else {
        slideidx++;
    }
    slider.style.marginLeft = -200+"%";
    rightSliding();
    slider.style.transitionDuration = ".5s";
    pagination.style.width = ((slideidx+1)/(maxidx+1))*100+"%";
    btnBlink();
}
// 다음 슬라이드 넘어갈 때 오른쪽으로 넘어가는 효과를 위한 함수
function rightSliding(){
    setTimeout(() => {
        slider.style.marginLeft = -100+"%";
        slider.style.transitionDuration = "0s";
        slider.append(slider.firstElementChild);
    }, 500);
}

/* 이전 버튼 클릭 */
prevBtn.onclick = function(){
    autoToggle = false;
    prevsliding();
}
// 이전 슬라이드 넘어가는 함수
function prevsliding(){
    if(slideidx == 0){
        slideidx = maxidx;
    }
    else {
        slideidx--; 
    } 
    slider.style.marginLeft = 0+"%";
    leftSliding();
    slider.style.transitionDuration = ".5s";
    pagination.style.width = ((slideidx+1)/(maxidx+1))*100+"%";
    btnBlink();
}
// 이전 슬라이드 넘어갈 때 왼쪽으로 넘어가는 효과를 위한 함수
function leftSliding(){
    setTimeout(() => {
        slider.prepend(slider.lastElementChild);
        slider.style.transitionDuration = "0s";
        slider.style.marginLeft = -100+"%";
    }, 500);
}

/* 이전, 다음 버튼 중복클릭 막는 구간 함수 */
let btnBlink = () => {
    // 이전, 다음 버튼을 비활성화 상태로 전환
    prevBtn.style.opacity = 0;
    nextBtn.style.opacity = 0;
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    // 슬라이드가 넘어가는 0.5초 이후에 다시 버튼 활성화
    setTimeout(() => {
        prevBtn.style.opacity = 1;
        nextBtn.style.opacity = 1;
        prevBtn.disabled = false;
        nextBtn.disabled = false;
    }, 500); 
}


