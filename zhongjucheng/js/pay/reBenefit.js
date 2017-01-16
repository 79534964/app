//全局数据对象
var payObject=require('./dataObj');
//优惠劵点击事件组件
var benefitEffect=require('./benefitEffect');
//最下方的支付按钮
var payPrice=require('./payPrice');

module.exports=function(){
    if(payObject.getNoCouponFlag()){
        $("#benefitCon").html(noBenefit("此商品不能使用优惠劵~"));
    }else{
        payObject.newCoupon();
        benefit(payObject.getNewCouponArr());
    }
}
//benefit
function benefit(arr){
    var benefitNode=$("#benefitCon");
    var html="<div id='scroller'><ul>";
    var index=0;
    if(arr.length>0){
        var benefitName;
        $.each(arr,function(i,e){
            if(e.ruleDesc){
                benefitName=e.ruleDesc;
            }else{
                benefitName=e.title;
            }
            html+="<li>"+
                        "<span data="+(index++)+">"+benefitName+"</span>"+
                        "<input type='checkbox' name='benefit' value=''/>"+
                   "</li>";
        });
        html+="</ul></div>"
        benefitNode.html(html);
        new iScroll('benefitCon');
        benefitEffect();
    }else{
        benefitNode.html(noBenefit("没有可用的优惠劵~"));
        payObject.setCouponId("undefined");
        payObject.setCouponPrice(0);
        payObject.setOrderPrice(payObject.getProductPrice());
        payPrice();
    }
}
function noBenefit(str){
    return "<div id='scroller'>"+
               "<ul>"+
                 "<p class='no-benefit'>"+str+"<p>"+
               "</ul>"+
            "</div>";
}
