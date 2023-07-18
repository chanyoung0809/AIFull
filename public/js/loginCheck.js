const idArea = document.querySelector("#userId");
const pwArea = document.querySelector("#userPW");
const errorMsg = document.querySelector("#container .subCont2 .center .subContentsWrap > div .memberWrap .loginWrap > form > div > span");
// 정규식 통과하는지 우선 체크
let idCheck = /^[\w]+@[a-z]+\.[a-z]{2,3}$/;
let pwCheck = /^[\w\d^*!-]{8,13}$/;
let loginForm = document.querySelector(".loginWrap > form");

loginForm.onsubmit=(e)=>{
    let idValid = idCheck.test(idArea.value);
    let pwValid = pwCheck.test(pwArea.value);
    if(idValid && pwValid){
        e.submit();
    }
    else {
        e.preventDefault();
        errorMsg.style.display="inline-block";
        idArea.style.outline="3px solid #c200f3";
        pwArea.style.outline="3px solid #c200f3";
    }
};
// 관리자 계정정보 자동완성
const adminAccountBtn = document.querySelector("#adminAccountBtn");
adminAccountBtn.addEventListener('click', ()=>{
    idArea.value = "admin1234@admin.com";
    pwArea.value = "admin1234";
});