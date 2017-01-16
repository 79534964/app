//双重重力效果
module.exports=function(swiperBtn,swiperBtnCurClass,swiperBoxClass,swiperSonClass){
    var windowHeight=$(window).height()*0.92;
    var swiperBoxClass="."+swiperBoxClass;
    var swiperSonClass="."+swiperSonClass;
    $(swiperBoxClass).css({"height":windowHeight+"px"});
    $(swiperSonClass).css({"height":windowHeight+"px"});
    var tabsSwiper = new Swiper(swiperBoxClass,{
        wrapperClass : 'swiper-wrapper',
        slideClass : 'swiper-slide',
        speed:500,
        onSlideChangeStart: function(){
            swiperBtn.eq(tabsSwiper.activeIndex).addClass(swiperBtnCurClass).siblings().removeClass(swiperBtnCurClass);
        }
    });
    swiperBtn.on('touchstart mousedown',function(){
        $(this).addClass(swiperBtnCurClass).siblings().removeClass(swiperBtnCurClass);
        tabsSwiper.slideTo($(this).index());
    });
    new Swiper(swiperSonClass,{
        wrapperClass : 'swiper-wrapper2',
        slideClass : 'swiper-slide2',
        direction : 'vertical',
        slidesPerView :'auto',
        freeMode : true
    });
    
}