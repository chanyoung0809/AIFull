const express = require("express") 
const app = express(); 
const port = 5000
/*
라우터, db... 서버 프로그램 작성에 필요한 수많은 명령어들을 담고 있는 함수 express
(터미널에서 npm install express 해야 사용가능)
*/
// 데이터베이스 명령어 함수들 사용하기 위해 불러들이는 작업
const MongoClient = require('mongodb').MongoClient;

// ejs 파일 형식을 node.js에서 사용하기 위한 시작구문
app.set("view engine", "ejs")

// 이미지, .css, .js등 정적 파일들을 ejs 파일 내에서 사용하기 위한 구문 
app.use(express.static('public'));

// 입력한 데이터값 객체 형식으로 전달받음(javascriptovject), 주소창의 key=value 를 key:value로 변환시켜줌
app.use(express.json()) 
// 입력값을 한번 더 검증하는 유효성 검사 진행
app.use(express.urlencoded({ extended: true })) 
//데이터베이스 연결을 위한 변수세팅(변수의 이름은 자유롭게 지어도 됨)
let db; 

// MongoClient.connect("본인의 데이터베이스 연결 주소",function(){})
MongoClient.connect("mongodb+srv://cisalive:cisaliveS2@cluster0.cjlsn98.mongodb.net/?retryWrites=true&w=majority",function(err,result){
    //에러가 발생했을경우 메세지 출력(선택사항)
    if(err) { return console.log(err); }
    //err <- DB에서 제공해주는 에러 메세지. 빨간색으로 틀린 부분 알려줌

    //위에서 만든 db변수에 최종연결 ()안에는 mongodb atlas 사이트에서 생성한 데이터베이스 이름
    // db = result.db("만들어준DB이름");
    db = result.db("AI_portfolio");

    //db연결이 제대로 됬다면 서버실행
    app.listen(port,function(){
        console.log("서버연결 성공");
    });

});


app.get("/", (req, res)=>{
    // 메인페이지 경로 요청 시 index.ejs를 랜더링해주세요.
    // 요청시 자동으로 views 폴더 찾아줌(대신 views 폴더 만들어서 그 안에 넣어야 함)
   res.render("index");
})
app.get("/intro/overview", (req, res)=>{
    //서브페이지 1-1 전시회 안내 - 행사개요
   res.render("ai_1_overview");
})
app.get("/intro/booth-maps/:theme", (req, res)=>{
    //서브페이지 1-2 전시회 안내 - 행사장 안내
   res.render("ai_2_hallMap",{data:req.params.theme});
})
app.get("/exhibitors/intro", (req, res)=>{
    //서브페이지 2-1 참가기업 - 참가 안내
   res.render("ai_3_exhibit_intro");
})
app.get("/exhibitors/sponserships", (req, res)=>{
    //서브페이지 2-2 참가기업 - 스폰서쉽 프로그램
   res.render("ai_4_sponserships.ejs");
})
app.get("/login", (req, res)=>{
    //로그인 페이지
   res.render("ai_login.ejs");
})
app.get("/visitors/info", (req, res)=>{
    //서브페이지 3-1 참관객 - 참관안내
   res.render("ai_5_visit_intro.ejs");
})
app.get("/visitors/pre-regist", (req, res)=>{
    //서브페이지 3-2 참관객 - 온라인 사전등록
   res.render("ai_6_pre_regist.ejs");
})

app.get("/visitors/pre-regist/add", (req ,res)=>{
    // 서브페이지 3-2 참관객 - 온라인 사전등록 - 신청
    res.render("preRegist");
})

// 사전등록 DB처리
app.post("/visitors/pre-regist/dbinsert",(req, res)=>{
    //사전등록자 인원수 체크하는 DB에 접근
    db.collection("pre-regist-num").findOne({id:"barcodeNumber"},(err,countResult)=>{
        db.collection("pre-registers").insertOne({
            num:countResult.barcodeNum,
            prName:req.body.prName,
            prBirth:req.body.prBirth
        },(err,result)=>{
            //입장객 순번값 업데이트
            db.collection("pre-regist-num").updateOne({id:"barcodeNumber"},{$inc:{barcodeNum:1}},(err,result)=>{
                res.redirect(`/visitors/pre-regist/detail/${countResult.barcodeNum}`);
            })
        })
    })
})
// 사전등록 완료 상세페이지로 이동
app.get("/visitors/pre-regist/detail/:num",(req,res)=>{
    db.collection("pre-registers").findOne({num:Number(req.params.num)},(err,result)=>{
        res.render("preRegistCode", {data:result});
    })
})

app.get("/visitors/location", (req, res)=>{
    //서브페이지 3-3 참관객 - 오시는길
   res.render("ai_7_location.ejs");
})
app.get("/media/news", (req, res)=>{
    //서브페이지 4-1 미디어 - 뉴스
   res.render("ai_8_news.ejs");
})
app.get("/media/gallery", (req, res)=>{
    //서브페이지 4-2 미디어 - 갤러리
   res.render("ai_9_gallery.ejs");
})
app.get("/media/posting", (req, res)=>{
    // 글쓰기 페이지
   res.render("ai_posting.ejs");
})