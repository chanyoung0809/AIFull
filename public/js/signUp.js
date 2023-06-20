// 폼태그
const form = document.querySelector(".signInForm");
// 부모 태그
const info_wrap = document.querySelector(".info_wrap");

// 입력창
const checkbox = document.querySelector("#polAgree");
const cNameData =  document.querySelector("#cName");
const userNameData =  document.querySelector("#userName");
const registNumData =  document.querySelector("#registNum");
const userMailData =  document.querySelector("#userMail");
const userNickNameData =  document.querySelector("#userNickName");
const userPWData =  document.querySelector("#userPW");
const PWcheckData =  document.querySelector("#PWcheck");

// 정규식들
const cNameChk = /^(\w|[가-힣]|\-|\,|\·|\.){3,30}$/;
const userNameChk = /^[가-힣]{2,6}$/;
const registNumChk = /^[0-9]{10}$/;
const userMailChk = /^[\w]+\@[a-z]+\.[a-z\.]{2,5}$/;
const userNickNameChk = /^(\w|\-|\_){3,10}$/;
const userPWChk = /^(\w|\-|\_){8,15}$/;



form.addEventListener("submit",(e)=>{

    let submitBoo = 0; // 논리값 true 갯수 체크해줄 변수
    let validArr = []; // 논리값 담아줄 빈배열

    let checkValid = checkbox.checked; //체크박스 확인유무
    (checkValid) ? validArr.push(true) : validArr.push(false); // 빈배열[0]에 체크값 담음 

    let cName = cNameData.value; // 기업명 입력값
    let userName = userNameData.value; // 담당자명 입력값
    let registNum = registNumData.value; // 사업자번호 입력값
    let userMail = userMailData.value; // 이메일 입력값
    let userNickName = userNickNameData.value; // 닉네임 입력값
    let userPW = userPWData.value; // 비밀번호 입력값
    
    // 정규식 체크해서 빈배열에 논리값 넣어주는 함수
    let regexChk = (regex, value) => {
        (regex.test(value)) ? validArr.push(true) : validArr.push(false);
    }
    // 입력값들에 함수 실행
    regexChk(cNameChk, cName); // 빈배열[1]에 체크값 담음 
    regexChk(userNameChk, userName); // 빈배열[2]에 체크값 담음 
    regexChk(registNumChk, registNum); // 빈배열[3]에 체크값 담음 
    regexChk(userMailChk, userMail); // 빈배열[4]에 체크값 담음 
    regexChk(userNickNameChk, userNickName); // 빈배열[5]에 체크값 담음 
    regexChk(userPWChk, userPW); // 빈배열[6]에 체크값 담음 

    // 비밀번호 확인
    let PWcheck = PWcheckData.value; // 비밀번호 확인 입력값
    // 빈배열[7]에 체크값 담음 
    (userPW === PWcheck && (userPWChk.test(PWcheck))) ? validArr.push(true) : validArr.push(false);

    // 제대로 체크했는지, 경고창이나 경고메세지 출력해줄 구간
    (validArr[0]) ? null : alert("필수 이용약관에 동의하셔야 합니다"); // 체크박스 구간 미체크시
    for(let i = 1; i<= 6; i++){ // 나머지 인풋 구간들 체크 잘 됐는지 확인해주는 구간
        (validArr[i]) ? document.querySelector(`.info_wrap > li:nth-child(${i}) > .alert`).classList.remove("on") : document.querySelector(`.info_wrap > li:nth-child(${i}) .alert`).classList.add("on");
    }
    (validArr[7]) ? document.querySelector(`.info_wrap > li:nth-child(7) > .alert`).classList.remove("on") : document.querySelector(`.info_wrap > li:nth-child(7) .alert`).classList.add("on"); 

    validArr.forEach((el)=>{
        (el) ? submitBoo +=1 : null;
    });
    (submitBoo == validArr.length) ? e.submit() : e.preventDefault();
});
