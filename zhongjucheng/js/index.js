//loading组件
var loading=require('./index/loading');
//输出数据的组件
var indexData=require('./index/index-data');
//双重重力效果的组件
var swiperEffect=require('./index/swiper-effect');
$(document).ready(function(){
    var coffeHost="http://zjc.mattburg.cn/jeewxmb/productController.do?coffe";
        $.ajax({
            type:"GET",
            url:coffeHost,
            dataType:"json",
            success:function(data){
             indexData(data);
             swiperEffect($(".nav-box div"),"cur","swiper1","swiper2");
             loading(false);
            },
            error:function(data){
                console.log("系统异常");
            }
        });
});