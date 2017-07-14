//loading组件
var loading=require('./order/loading');
//双重重力效果和5个假分页效果的组件
var swiperEffect=require('./order/swiper-effect');
//数据处理的组件
var sucess=require('./order/sucess');
//没有图片时替补图片
var takePlace=require('./order/takePlace');
$(document).ready(function(){
    sucess(orderVoListNotPay,notBrewAndBrewList,brewAndBrewList);
    takePlace();
    swiperEffect();
    loading(false);
});