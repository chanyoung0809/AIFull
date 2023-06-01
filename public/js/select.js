window.onresize = ()=>{
    document.location.reload();
};

const choices = document.querySelectorAll(".joinWrap > div");
// 컨텐츠 3 기업참가문의 / 사전등록 택일 구간 박스 2개 선택
const exhibitBtn = document.querySelector(".joinWrap > .exhibitWrap > div > button");
const visitBtn = document.querySelector(".joinWrap > .visitWrap > div > button");

exhibitBtn.onclick = ()=>{
    window.location.href="login.html";
};
visitBtn.onclick = ()=>{
    window.location.href="Container6.html";
};

const media = matchMedia("screen and (min-width: 1024px)");

if (media.matches) {
    // 1200px 이상에서 사용할 스크립트
    choices.forEach((el)=>{
        // 각각의 박스에 마우스 올렸을 때
        el.onmouseenter = ()=>{
            choices.forEach((el2)=>{
                el2.style.opacity = 0;
                el2.style.zIndex = 1;
            });
            // 올린 구역 박스만 활성화되게 처리
            el.style.opacity = 1;
            el.style.zIndex = 2;
            el.style.width = 100+"%";
        }
        // 마우스가 빠졌을 때
        el.onmouseleave = ()=>{
            //각각의 박스들 원 상태 복귀
            choices.forEach((el2)=>{
                el2.style.opacity = 1;
                el2.style.zIndex = 1;
                el2.style.width = 50+"%";
            });
        }
    });
} 
else {
    // 1024px 미만에서 사용할 스크립트
    choices.forEach((el)=>{
        // 각각의 박스에 마우스 올렸을 때
        el.onmouseenter = ()=>{
            choices.forEach((el2)=>{
                el2.style.opacity = 0;
                el2.style.zIndex = 1;
            });
            // 올린 구역 박스만 활성화되게 처리
            el.style.opacity = 1;
            el.style.zIndex = 2;
            el.style.height = 100+"%";
        }
        // 마우스가 빠졌을 때
        el.onmouseleave = ()=>{
            //각각의 박스들 원 상태 복귀
            choices.forEach((el2)=>{
                el2.style.opacity = 1;
                el2.style.zIndex = 1;
                el2.style.height = 50+"%";
            });
        }
    });
}
