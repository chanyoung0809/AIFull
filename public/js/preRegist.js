const wrap = document.querySelector(".wrap");
const nameData = document.querySelector("#name");
const birthData = document.querySelector("#birth");
let nameCheck = /^[가-힣]{2,6}$/;
let birthCheck = /^(192[3-9]|19[3-9][0-9]|200[0-7])-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
//1923 -2004
wrap.onsubmit = (e)=>{
   
    let name = nameData.value;
    let birth = birthData.value;
    
    let nameValid = nameCheck.test(name);
    let birthValid = birthCheck.test(birth);
    if (nameValid && birthValid){
        wrap.submit();
        let RegistCodePopup = window.open('./preRegistCode.html','about:blank', 'resizeable=no');
        preRegistPopup.resizeTo(500, 600);
        preRegistPopup.onresize = (()=>{
	        popupWindow.resizeTo(500 ,600);
	    });
    }
    else{
        e.preventDefault();
        alert("생년월일과 성함을 제대로 확인해주세요");
    }
   
}