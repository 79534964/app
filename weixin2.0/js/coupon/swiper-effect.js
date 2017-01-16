module.exports=function(){
    var windowHeight=$(window).height()*0.92;
    $(".swiper1").css({"height":windowHeight+"px"});
    $(".swiper2").css({"height":windowHeight+"px"});
    var swiperBtn=$(".nav-box div");
    var tabsSwiper = new Swiper('.swiper1',{
        speed:500,
        onSlideChangeStart: function(){
            swiperBtn.eq(tabsSwiper.activeIndex).addClass('cur').siblings().removeClass('cur');
        }
    });
    swiperBtn.on('touchstart mousedown',function(){
        $(this).addClass('cur').siblings().removeClass('cur');
        tabsSwiper.slideTo($(this).index());
    });
    var swiperArr=[{
    "index":1,
    "flag":true
    },{
    "index":1,
    "flag":true
    },{
    "index":1,
    "flag":true
    }];
    var swipers=new Swiper('.swiper2',{
        wrapperClass : 'swiper-wrapper2',
        slideClass : 'swiper-slide2',
        direction : 'vertical',
        slidesPerView :'auto',
        freeMode : true,
        scrollbar:'.swiper-scrollbar',
        onInit: function(swiper) {
            var loadNode=$(swiper.wrapper[0]).find(".load-node");
            removeLoadNode(loadNode);
            for(var i=0;i<swiper.slides.length;i++){
                if(i>4){
                    swiper.slides[i].style.display="none";
                    swiper.onResize();
                }
            }
        },
        onTouchEnd: function(swiper){
            if((swiper.wrapper[0].clientHeight-windowHeight+swiper.translate)<-70){
                for(var i=0;i<swipers.length;i++){
                    if(swipers[i]==swiper){
                        if(swiperArr[i].flag){
                            swiperArr[i].flag=false;
                            var num=swiperArr[i].index*4;
                            var loadNode=$(swiper.wrapper[0]).find(".load-node");
                            if(swiper.slides.length>num){
                                swiperArr[i].index=swiperArr[i].index+1;
                                var index=i;
                                getLoadNode(true,loadNode);
                                swiper.onResize();
                                setTimeout(function(){
                                    for(var j=0;j<num+4;j++){
                                        if(swiper.slides[j]){
                                            swiper.slides[j].style.display="block";
                                            removeLoadNode(loadNode);
                                            swiper.onResize();
                                            swiperArr[index].flag=true;
                                        }
                                     }
                                },1000);
                            }else{
                                if(swiper.slides.length>4){
                                    getLoadNode(false,loadNode);
                                    swiper.onResize();   
                                }
                            }
                        }
                    }
                }
            }
        }
    });
}
 //加载更多的node节点
function getLoadNode(flag,node){
    if(flag){
        node.find("img").addClass("img-ani");
    }else{
        node.find("img").removeClass("img-ani");
        node.find("p").text("没有更多了");
    }
    node.css({"display":"block"});
}
//删除加载更多节点
function removeLoadNode(node){
    node.css({"display":"none"});
}