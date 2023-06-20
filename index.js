const express = require("express");
const multer = require('multer'); 
const app = express(); 
const port = 5000;

// 데이터베이스 명령어 함수들 사용하기 위해 불러들이는 작업
const MongoClient = require('mongodb').MongoClient;

// ejs 파일 형식을 node.js에서 사용하기 위한 시작구문
app.set("view engine", "ejs")
//사용자가 입력한 데이터값을 주소로 통해서 전달되는 것을 변환(parsing)
app.use(express.urlencoded({ extended: true })); 
app.use(express.json())
// 이미지, .css, .js등 정적 파일들을 ejs 파일 내에서 사용하기 위한 구문
app.use(express.static('public'));
/*
    passport  passport-local  express-session 설치후 불러오기
    로그인 검정 및 세션 생성에 필요한 기능 사용
*/
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({secret :'secret', resave : false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session()); 

let db; // 데이터베이스 연결을 위한 변수세팅

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
        console.log(`서버연결 성공, http://localhost:${port} 로 접속하세요.`);
    });

});

// 로그인시 검증 처리
passport.use(new LocalStrategy({
    usernameField:"userMail",
    passwordField:"userPW",
    session:true,
    },      //해당 name값은 아래 매개변수에 저장
    function(userMail, userPW, done) {
                    //회원정보 콜렉션에 저장된 아이디랑 입력한 아이디랑 같은지 체크                                 
      db.collection("cUsers").findOne({ userMail:userMail }, function (err, user) {
        if (err) { return done(err); } //아이디 체크 시 코드(작업 X)
        if (!user) { return done(null, false); }  //아이디 체크 시 코드(작업 X)
        //비밀번호 체크 여기서 user는 db에 저장된 아이디의 비번값
        if (userPW == user.userPW) { // 비밀번호 체크 시 코드
            // 저장된 비밀번호가, 유저가 입력한 비밀번호와 같으면 if
            return done(null, user);
          } else {
            // 다르면 else
            return done(null, false);
          }
      });
    }
));

app.get("/", (req, res)=>{
    //메인페이지
   res.render("index", {login:req.user});
})
app.get("/intro/overview", (req, res)=>{
    //서브페이지 1-1 전시회 안내 - 행사개요
   res.render("ai_1_overview", {login:req.user});
})
app.get("/intro/booth-maps/:theme", (req, res)=>{
    //서브페이지 1-2 전시회 안내 - 행사장 안내
   res.render("ai_2_hallMap",{data:req.params.theme, login:req.user});
})
app.get("/exhibitors/intro", (req, res)=>{
    //서브페이지 2-1 참가기업 - 참가 안내
   res.render("ai_3_exhibit_intro", {login:req.user});
})
app.get("/exhibitors/sponserships", (req, res)=>{
    //서브페이지 2-2 참가기업 - 스폰서쉽 프로그램
   res.render("ai_4_sponserships.ejs", {login:req.user});
})

app.get("/visitors/info", (req, res)=>{
    //서브페이지 3-1 참관객 - 참관안내
   res.render("ai_5_visit_intro.ejs", {login:req.user});
})
app.get("/visitors/pre-regist", (req, res)=>{
    //서브페이지 3-2 참관객 - 온라인 사전등록
   res.render("ai_6_pre_regist.ejs", {login:req.user});
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

// 사전등록 코드확인
app.get("/visitors/pre-regist/find", (req ,res)=>{
    res.render("prCodeFind");
})

// 사전등록 코드확인 DB처리
app.post("/visitors/pre-regist/dbfind", (req, res)=>{
    db.collection("pre-registers").findOne({prName:req.body.prName, prBirth:req.body.prBirth},(err,prResult)=>{

        res.render("preRegistCode", {data:prResult});
    })
})

app.get("/visitors/location", (req, res)=>{
    //서브페이지 3-3 참관객 - 오시는길
   res.render("ai_7_location.ejs", {login:req.user});
})

const storage = multer.diskStorage({
    // storage 상수
    destination: function (req, file, cb) {
        // 어디에 저장할 것인가?
      cb(null, 'public/upload') //업로드 폴더 지정
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8'))
      // 영어가 아닌 다른 파일명 안깨지고 나오게 처리(궰쇊어 안나오게 해줌)
    }
  })
  
const upload = multer({ storage: storage })
//upload는 위의 설정사항을 담은 변수(상수) 

app.post("/dbupload",upload.single("thumbnail"),(req,res)=>{
    db.collection("boardCount").findOne({id:"게시물갯수"},(err,countResult)=>{
        db.collection("board").insertOne({
            num:countResult.idx,
            title:req.body.title,
            userNickName:req.body.userNickName,
            context:req.body.context,
            attachfile:req.file.filename,
        },(err,result)=>{
            db.collection("boardCount").updateOne({id:"게시물갯수"},{$inc:{idx:1}},(err,result)=>{
                res.redirect(`/media/news/${countResult.idx}`);
            });
        });
    });
});

app.get("/media/news", (req, res)=>{
    db.collection("board").find().sort({num:-1}).toArray((err,result)=>{
        //서브페이지 4-1 미디어 - 뉴스
        res.render("ai_8_news.ejs", {login:req.user, data:result});
    })
})
app.get("/media/gallery", (req, res)=>{
    //서브페이지 4-2 미디어 - 갤러리
   res.render("ai_9_gallery.ejs", {login:req.user});
})


app.get("/media/posting", (req, res)=>{
    // 뉴스 - 글쓰기
    res.render("ai_posting.ejs", {login:req.user});
})

app.get("/media/news/:num", (req, res)=>{
    // 뉴스 상세페이지
    db.collection("board").findOne({num:Number(req.params.num)},(err,result)=>{
        //find로 찾아온 데이터값은 result에 담긴다
        //상세페이지 보여주기위해서 찾은 데이터값을 함께 전달한다.
        res.render("newsDetail", {login:req.user, data:result});
    })
})
app.get("/media/update/:num",(req,res)=>{
    // 뉴스 - 수정하기
    db.collection("board").findOne({num:Number(req.params.num)},(err,result)=>{
        res.render("ai_postEdit.ejs",{data:result, login:req.user});
    })
    
})

app.post("/dbupdate",upload.single("thumbnail"),(req,res)=>{
    // DB 수정 요청
    let changeFile;
    let changeDatas;
    if(req.file){
        // 첨부파일 변경한 경우
        changeFile = req.file.filename;
        changeDatas = {
            title:req.body.title,
            context:req.body.context,
            attachfile:changeFile,
        }
    }
    else{
        // 첨부파일 변경하지 않은 경우
        changeDatas = {
            title:req.body.title,
            context:req.body.context,
            //첨부파일 수정 막음
        } 
    }
    db.collection("board").updateOne({num:Number(req.body.num)},{$set:changeDatas},(err,result)=>{
        console.log(req.body.num);
        res.redirect(`/media/news/${req.body.num}`); 
    })
})

//게시글 상세화면 페이지에서 삭제를 눌렀을 때 요청
app.get("/dbdelete/:num", (req,res)=>{
    // 보드에서 파라미터에 해당하는 게시글 삭제하고
    db.collection("board").deleteOne({num:Number(req.params.num)},(err,result)=>{
        //게시물 목록으로 이동
        res.redirect("/media/news");
    })
})

app.get("/sign-up", (req, res)=>{
    //회원가입 페이지
   res.render("signUp.ejs", {login:req.user});
})

//회원가입 DB 처리
app.post("/joindb",(req,res)=>{
    db.collection("cUsers").findOne({userMail:req.body.userMail},(err,member)=>{
        if(member){ 
            // 중복 아이디 있는 경우
            res.send(`<script> alert("이미 가입된 아이디가 존재합니다."); location.href="/login"; </script>`)
            // 로그인 페이지로 이동
        }
        else{
            db.collection("cUsersNum").findOne({name:"기업사용자"},(err,result)=>{
                db.collection("cUsers").insertOne({
                    cNo:result.cNum, // 회원번호
                    cName:req.body.cName, // 회사이름
                    userName:req.body.userName, // 담당자이름
                    registNum:req.body.registNum, // 사업자번호
                    userMail:req.body.userMail, // 이메일
                    userNickName:req.body.userNickName, // 닉네임
                    userPW:req.body.userPW //비밀번호
                },(err)=>{
                    db.collection("cUsersNum").updateOne({name:"기업사용자"},{$inc:{cNum:1}},(err)=>{
                        res.send(`<script> alert("회원가입이 완료되었습니다."); location.href="/login";  </script>`);
                    });
                })
            })
        }
    })
})
//처음 로그인 했을 시 세션 생성 memberid는 데이터에 베이스에 로그인된 아이디
//세션 만들어줌
passport.serializeUser(function (user, done) {
    done(null, user.userMail)
});
  
//다른 페이지(서브페이지,게시판 페이지 등 로그인 상태를 계속 표기하기 위한 작업)
//로그인이 되있는 상태인지 체크
passport.deserializeUser(function (userMail, done) {
// memberid<- 찾고자 하는 id : memberid<- 로그인했을 때 id
db.collection('cUsers').findOne({userMail:userMail }, function (err,result) {
    done(null, result);
    })
}); 

app.get("/login", (req, res)=>{
    //로그인 페이지
    res.render("ai_login.ejs", {login:req.user});
})
// 로그인 처리 요청 경로 (failureRedirect: 로그인 실패했을 때 경로 )
app.post("/logincheck", passport.authenticate('local', {failureRedirect : '/login'}), (req,res)=>{
    res.redirect("/") // 성공하면 메인페이지로 이동시킴
})
// 로그아웃처리 요청 경로
app.get("/logout",(req,res)=>{
    // 로그아웃 함수 적용 후 메인페이지로 이동
    // 로그아웃 함수는 서버의 세션을 제거해주는 역할
    req.logout(()=>{
        res.redirect("/")
    })
    
})
app.get("/mypage", (req, res)=>{
    // 마이페이지
    res.render("mypage.ejs", {login:req.user});
})