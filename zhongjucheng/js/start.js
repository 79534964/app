$(document).ready(function(){
    var nodes=$(".swiper-wrapper").children();

function fixPagesHeight() {
    $('.swiper-slide,.swiper-container').css({
        height: $(window).height(),
    })
}
fixPagesHeight();
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        mousewheelControl: true,
        watchSlidesProgress: true,
        onInit: function(swiper) {
            swiper.myactive = 0; 
        },
        onProgress: function(swiper) {
            for (var i = 0; i < swiper.slides.length; i++) {
                var slide = swiper.slides[i];
                var progress = slide.progress;
                var translate, boxShadow;
                translate = progress * swiper.height * 0.8;
                scale = 1 - Math.min(Math.abs(progress * 0.2), 1);
                boxShadowOpacity = 0;
                slide.style.boxShadow = '0px 0px 10px rgba(0,0,0,' + boxShadowOpacity + ')';
                if (i == swiper.myactive) {
                    es = slide.style;
                    es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d(0,' + (translate) + 'px,0) scale(' + scale + ')';
                    es.zIndex=0;
                }else{
                    es = slide.style;
                    es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform ='';
                    es.zIndex=1;
                }
            }
        },
        onTouchStart: function(swiper, speed) {
            for (var i = 0; i < swiper.slides.length; i++) {
            }
            swiper.myactive = swiper.activeIndex;
        },
        onTransitionEnd: function(swiper, speed) {
            if(mySwiper.activeIndex>0){
                nodes.eq(mySwiper.activeIndex-1).removeClass("back"+(mySwiper.activeIndex-1));
            }
            nodes.eq(mySwiper.activeIndex+1).removeClass("back"+(mySwiper.activeIndex+1));
            nodes.eq(mySwiper.activeIndex).addClass("back"+mySwiper.activeIndex);
        },
        onSetTransition: function(swiper, speed) {
            for (var i = 0; i < swiper.slides.length; i++) {
                    es = swiper.slides[i].style;
                    es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = speed + 'ms';
            }

        }
    });
});
window.onload=function(){
    $("#load").css({"display":"none"});
    $(".swiper-wrapper").children().eq(0).addClass('back0');
};