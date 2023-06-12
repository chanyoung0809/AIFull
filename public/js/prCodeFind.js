const wrap = document.querySelector(".wrap"); // form 태그
const nameData = document.querySelector("#name"); // 이름 입력값
const birthData = document.querySelector("#birth"); //생년월일 입력값
let nameCheck = /^[가-힣]{2,6}$/;
// 한국식 이름은 2~6자 한글만 가능
let birthCheck = /^(192[3-9]|19[3-9][0-9]|200[0-7])-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
//1923 - 2004년 01/01-12/31생 (고등학생 이하 참관 불가능)

// 사전등록 접수 기능
wrap.onsubmit = (e)=>{
   
    let name = nameData.value; // 사전등록자 이름
    let birth = birthData.value; // 사전등록자 비밀번호
    
    let nameValid = nameCheck.test(name); // 이름이 정규식에 맞는지 체크
    let birthValid = birthCheck.test(birth); // 생년월일이 정규식에 맞는지 체크
    if (nameValid && birthValid){ //둘다 맞으면
        wrap.submit(); //제출됨
    }
    else if(nameValid && !birthValid){ // 생년월일이 맞지 않으면
        e.preventDefault(); // 제출기능 막고
        alert("입력하신 생년월일을 확인해주세요. 본 전시회는 고등학생 이하 출입을 제한하고 있습니다.");
    }
    else{ //둘다 맞지 않으면
        e.preventDefault(); // 제출기능 막고
        alert("입력하신 생년월일과 성함을 제대로 확인해주세요");
    }
}