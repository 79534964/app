//双重重力效果
module.exports=function(swiperBtn,swiperBtnCurClass,swiperBoxClass,swiperSonClass){
    var windowHeight=$(window).height();
    var swiperBoxClass="."+swiperBoxClass;
    var swiperSonClass="."+swiperSonClass;
    $(swiperBoxClass).css({"height":windowHeight*0.92+"px"});
    $(swiperSonClass).css({"height":windowHeight*0.92+"px"});
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