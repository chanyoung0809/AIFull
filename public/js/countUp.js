function countUp(counterBox, arriveNum){
    let num = 0; // 증가 시작할 숫자
    //목적지 숫자 arriveNum
    let autoCount = setInterval(function(){
        if(arriveNum < 30){
            num += Math.floor(arriveNum / 27); 
        }
        else if(arriveNum < 300){
            num += Math.floor(arriveNum / 150); 
        }
        else{
            num += Math.floor(arriveNum / 300);
        }
        //나누는 숫자로 스피드 조절 가능(나누는 숫자가 클수록 느려짐)

        /* 여러 개 작업할 때 한번에 도달되게 해야 하므로 */
        if(num < arriveNum){
            counterBox.innerText = num.toLocaleString();
            //숫자 증가되는 것을 , 표시 붙여서 표현
        }
        else{
            clearInterval(autoCount);
            counterBox.innerText = arriveNum.toLocaleString();
            //document.querySelector(".count").innerText = num;으로 써버리면 목적지 숫자를 넘어갈 수도 있으므로 도달 숫자를 써넣어야 함
        }
    },1);
}
