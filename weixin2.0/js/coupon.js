//loading组件
var loading = require('./coupon/loading');
//双重重力效果的组件
var swiperEffect = require('./coupon/swiper-effect');
//可用和已使用优惠劵的组件
var sucess = require('./coupon/sucess');
//可用和已使用优惠劵的组件
var buying = require('./coupon/buying');
//点击兑换优惠券
var convert = require('./coupon/convert');
$(document).ready(function () {
    sucess(couponVoList);
    buying(couponOffList);
    convert();
    swiperEffect();
    loading(false);
});