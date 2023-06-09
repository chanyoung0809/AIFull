const booths = document.querySelectorAll(".mapWrap > .theme"); //위쪽 이미지에 겹쳐져있는 태그들

const selects = document.querySelectorAll(".themeMenu > li"); //input 태그 감싸는 li

const exhibits = document.querySelectorAll(".exhibitorsWrap > .theme"); //아래쪽 이미지에 겹쳐져있는 태그들


selects.forEach((select, idx)=>{
    select.onclick=()=>{
        booths.forEach((booth)=>{
            booth.classList.remove("on");
        });
        exhibits.forEach((exhibit)=>{
            exhibit.classList.remove("on");
        });
        booths[idx].classList.add("on");
        exhibits[idx].classList.add("on");
    }
});
