const express = require("express") 
const app = express(); 
/*
라우터, db... 서버 프로그램 작성에 필요한 수많은 명령어들을 담고 있는 함수 express
(터미널에서 npm install express 해야 사용가능)
*/

// ejs 파일 형식을 node.js에서 사용하기 위한 시작구문
app.set("view engine", "ejs")
// 이미지, .css, .js등 정적 파일들을 ejs 파일 내에서 사용하기 위한 구문 
app.use(express.static('public'));

const port = 5000

app.get("/", (req, res)=>{
    // 메인페이지 경로 요청 시 index.ejs를 랜더링해주세요.
    // 요청시 자동으로 views 폴더 찾아줌(대신 views 폴더 만들어서 그 안에 넣어야 함)
   res.render("index");
})
app.get("/intro/overview", (req, res)=>{
    //서브페이지 1-1 전시회 안내 - 행사개요
   res.render("ai_1_overview");
})
app.get("/intro/booth-maps", (req, res)=>{
    //서브페이지 1-2 전시회 안내 - 행사장 안내
   res.render("ai_2_hallMap");
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

app.listen(5000,()=>{
    console.log("서버가 잘 실행되고 있습니다.");
})
