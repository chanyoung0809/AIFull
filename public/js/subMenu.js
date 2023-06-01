const subMenus = document.querySelectorAll(".subMenu > li");

subMenus.forEach((item, idx)=>{
    item.onclick = ()=>{
        subMenus.forEach((items, idx)=>{
            items.classList.remove("on");
        });
        item.classList.add("on");
    };
});
