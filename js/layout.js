$(function(){
    /* tab 切换 */
   tabMenu(".topTab","active");
   tabMenu(".menu-section-list","active");
   tabMenu(".topNav","active");
    tabMenu02(".topTab02","active");
    tabMenu02(".handTab","active");
    tabFooter(".footerBtn","active");
    toggleBox(".toggleBtn","open");
    toggleTable(".toggleBTable","active");
    collToggle(".collItem","active",".collBox","onSelect");
    toggleBtn(".btnItem","activeTwo");
    toggleLinks(".listGroup ul li a","active");
})

//新添加 滑动菜单插件
function addHammer(speed) {

    //判断浏览器内核
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        var hammertime =$("body");
        var targetMenu =$("#menu");
        //Swipe
        touch.on(hammertime, 'swipeleft', function(ev){
            var display = $("#menu").css("display");
            if(display=="none" && ev.distanceX< -speed){
                getBack();
            }
            else {
                targetMenu.hide(20);
            }
        });
        touch.on(hammertime, 'swiperight', function(ev){
            if( ev.distanceX > speed){
                targetMenu.show(20);

            }
        });
        touch.on(targetMenu, 'tap', function(ev){
            targetMenu.hide(20);
        });
    } else {
        var targetMenu =$("#menu");
        var mc = new Hammer(document.querySelector('body'));
        //mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
        mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
        //mc.get('pinch').set({ enable: true });
        //mc.get('rotate').set({ enable: true });
        function getMc(){
            return mc;
        }
        mc.on("swiperight", function (ev) {
            ev.preventDefault();
            var display = $("#menu").css("display");
            if(ev.deltaX>speed&&display=="none"){
                targetMenu.show(20);
            }
        });
        mc.on("swiperight", function (ev) {
            ev.preventDefault();
            var display = $("#menu").css("display");
            if(ev.deltaX>speed&&display=="none"){
                targetMenu.show(20);
            }
        });
        mc.on("tap", function (ev) {
            targetMenu.hide(20);
        });
        mc.on("swipeleft", function (ev) {
            ev.preventDefault();
            var display = $("#menu").css("display");
            if( ev.deltaX<-speed&&display=="block"){
                targetMenu.hide(20);
            }
            else if(ev.deltaX<-speed){
                getBack();
            }
        });
    };
}

//悬浮图标

function moveHand(){
    var $moveH =$("#handMove");
    var $moveLink =$("#handMove a");
    var moveText= $moveH.find("span");
    var targetMove=new Hammer(document.querySelector('#handMove'));
    targetMove.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    targetMove.get('pan').set({ direction: Hammer.DIRECTION_ALL });

    var dx,dy;
    targetMove.on("pan", function (ev) {
        ev.preventDefault();
    })
    targetMove.on("onpanstart", function (ev) {
        ev.preventDefault();
        $moveH.addClass("hover");

    });
    targetMove.on("panmove", function (ev) {
        ev.preventDefault();
        dx = dx || 0;
        dy = dy || 0;
        var offx = dx + ev.deltaX + "px";
        var offy = dy + ev.deltaY + "px";
        $moveH.addClass("hover");
        $moveH.css({
            'transform': 'translate(' + offx + ',' + offy + ')',
        });

    });
    targetMove.on("panend", function (ev) {
        ev.preventDefault();
        dx += ev.deltaX;
        dy += ev.deltaY;
        $moveH.removeClass("hover");

    });
    targetMove.on("swipe", function(ev) {
        ev.preventDefault();
        ev.srcEvent.stopPropagation();
        //console.log(ev);
    });
    targetMove.on("tap", function (ev) {
        ev.preventDefault();
        $moveH.toggleClass("tap");
    });
    $moveLink.on("tap", function (ev) {
        ev.preventDefault();
        moveText.text($(this).text());
    });
}


/* 简易表单验证 */
$(function(){
    $(".listGroup input, .listGroup select").click(function(){
        $("a.btnItem").addClass("activeOne")
    });
})

/* tabFooter 切换效果 */
function tabFooter(className,activeName){
    var target = $(className).find("li");
        touch.on(target, 'hold tap doubletap', function(ev){
            $(this).parents("li").addClass(activeName).siblings("li").removeClass(activeName);
        });

}

/* list 切换列表 */
function toggleLinks(className,activeName){
    var target = $(className);
    touch.on(target, 'hold tap doubletap', function(ev){
        $(this).toggleClass(activeName).parents("li").siblings("li").find("a").removeClass(activeName);
    });
}
/* btn 切换效果 */
function toggleBtn(className,activeName){
    var target = $(className);
    touch.on(target, 'hold tap doubletap', function(ev){
        $(this).toggleClass(activeName);
    });
}

/* 收藏切换 */
function collToggle(className,activeName,collListName,onSelect){
    var target = $(className).find("li a");
    var target02 = $(collListName).find("li");
    touch.on(target, 'hold tap doubletap', function(ev){
        $(this).addClass(activeName).parents("li").siblings("li").find("a").removeClass(activeName);
        var liIndex =$(this).parents("li").index();
        if(liIndex ==0){
            $(".collBox").removeClass("lineColl").addClass("lineColl");
        }
        else{
            $(".collBox").removeClass("lineColl");
        }
    });
    touch.on(target02, 'hold tap doubletap', function(ev){
        $(this).addClass(onSelect).siblings("li").removeClass(onSelect);
    });
}

/* menu 切换效果 */
function tabMenu(className,activeName){
    var target = $(className).find("li a");
    touch.on(target, 'hold tap doubletap', function(ev){
        $(this).addClass(activeName).parents("li").siblings("li").find("a").removeClass(activeName);
    });
}

/* menu 切换效果 */
function tabMenu02(className,activeName){
    var target = $(className).find("a");
    touch.on(target, 'hold tap doubletap', function(ev){
        $(this).addClass(activeName).siblings().removeClass(activeName);
    });
}

/* 收缩展开 */
function toggleTable(btnName,activeName){
    $(btnName).click(function(){
             $(this).toggleClass(activeName);
           $(this).parents(".tableBox").find("tbody").toggle();
    })

}
function toggleBox (btnName,activeName){
    $(btnName).click(function(){
        var panelBodyH = $(".panel-body").height();
        var dateH = $(".dateHeader").height();
        if(dateH > 130){
           $(this).addClass(activeName);
            $(".panel-body").height(panelBodyH+278);
            $(".dateHeader").height(130);
        }
        else
        {
            $(this).removeClass(activeName);
            $(".panel-body").height(panelBodyH-278);
            $(".dateHeader").height(408);
        }

    })
}

/* 倒计时跳转 */
function countDown(secs,surl){
    var jumpTo = document.getElementById('jumpTo');
    $(jumpTo).html(secs);
    if(--secs>0){
        setTimeout("countDown("+secs+",'"+surl+"')",1000);
    }
    else{
        location.href=surl;
        -ma
    }
}
