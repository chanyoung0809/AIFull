const preRegistBtn = document.querySelector(".preRegistWrap .preRegistBtn");
const prCodeFindBtn = document.querySelector(".preRegistWrap .prCodeFindBtn");
preRegistBtn.onclick = ()=>{
    let preRegistPopup = window.open("/visitors/pre-regist/add",'about:blank', 'width=500', 'height=600', 'resizeable=no');
    preRegistPopup.resizeTo(500, 600);
    preRegistPopup.onresize = ()=>{
	    preRegistPopup.resizeTo(500 ,600);
	}
}
prCodeFindBtn.onclick = ()=>{
    let prCodeFindPopup = window.open("/visitors/pre-regist/find",'about:blank', 'width=500', 'height=600', 'resizeable=no');
    prCodeFindPopup.resizeTo(500, 600);
    prCodeFindPopup.onresize = ()=>{
	    prCodeFindPopup.resizeTo(500 ,600);
	}
}