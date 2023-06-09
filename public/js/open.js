const preRegistBtn = document.querySelector(".preRegistWrap .preRegistBtn");
preRegistBtn.onclick = ()=>{
    let preRegistPopup = window.open("/visitors/pre-regist/add",'about:blank', 'width=350', 'height=500', 'resizeable=no');
    preRegistPopup.resizeTo(500, 600);
    preRegistPopup.onresize = ()=>{
	    preRegistPopup.resizeTo(500 ,600);
	};
};