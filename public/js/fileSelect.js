const upload = document.querySelector("#upload"); //데이터 전송역할
const inputFile = document.querySelector("#file"); // 첨부파일 input태그
const submitBtn = document.querySelector("#submit"); // 전송버튼
let extCheck = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"]; // 체크할 확장자명

submitBtn.addEventListener("click", (e)=>{
    if(inputFile.files){
        // input type="file"에는 value 가 아닌 files(단수, 복수 관계없이)
        // console.log(inputFile.files);
        // FileList 라는 배열 형식으로 출력됨. 배열 안에는 파일의 정보가 객체 형식으로 저장되어있음. 단수일때는 0번째.
        let fileName = inputFile.files[0].name; 
        //첨부한 파일명

        let fileLength = fileName.length; 
        // 파일명 길이값(나중에 확장자명 식별할 때 사용)

        let fileDots = fileName.lastIndexOf(".");
        // .기호가 시작하는 순번

        let fileExt = fileName.substring(fileDots, fileLength);
        // 추출한 확장자

        let fileCheck = extCheck.includes(fileExt);
        // 체크할 확장자명 안에 추출한 확장자가 있는지 찾아줌

        // console.log(`파일명은 ${fileName}, 길이는 ${fileLength}, .기호가 시작하는 순번 ${fileDots}, 최종적으로 추출되는 확장자 ${fileExt}, 확장자 있나요? ${fileCheck}`);

        if(fileCheck){ 
            upload.submit(); 
        } 
        else{
            alert("이미지 파일만 첨부 가능합니다");
            e.preventDefault();
        }
    }
})