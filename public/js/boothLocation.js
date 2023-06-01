const booths = document.querySelectorAll(".mapWrap > .theme");
const selects = document.querySelectorAll(".themeMenu > li");
const exhibits = document.querySelectorAll(".exhibitorsWrap > .theme");
selects.forEach((select, idx)=>{
    select.onclick=()=>{
        booths.forEach((booth)=>{
            booth.style.opacity = 0;
        });
        exhibits.forEach((exhibit)=>{
            exhibit.style.opacity = 0;
        });
        booths[idx].style.opacity = 1;
        exhibits[idx].style.opacity = 1;
    }
});
