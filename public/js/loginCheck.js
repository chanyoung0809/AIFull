const idArea = document.querySelector("#userId");
const pwArea = document.querySelector("#userPw");
const errorMsg = document.querySelector("#container .subCont2 .center .subContentsWrap > div .memberWrap .loginWrap > form > div > span");
console.log(errorMsg);

let idCheck = /^[\w]+@[a-z]+\.[a-z]{2,3}$/;
let pwCheck = /^[\w\d^*!-]{8,13}$/;
let loginForm = document.querySelector(".loginWrap > form")

loginForm.onsubmit=(e)=>{
    let idValid = idCheck.test(idArea.value);
    let pwValid = pwCheck.test(pwArea.value);
    if(idValid && pwValid){
        loginForm.submit();
    }
    else {
        e.preventDefault();
        errorMsg.style.display="inline-block";
        idArea.style.outline="3px solid #c200f3";
        pwArea.style.outline="3px solid #c200f3";
    }
};