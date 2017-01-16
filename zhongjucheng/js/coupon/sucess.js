//公共方法组件
var common=require('./common');
module.exports=function(data){
    var notUsedHtml="";
    var alreadyUsedHtml="";
    var notUsedIndex=0;
    var alreadyUsedIndex=0;
    $.each(data,function(i,e){
        if(e.couponStatus==0){
            if(++notUsedIndex<30){
                notUsedHtml+=common.setData(e,true);   
            }
        }else if(e.couponStatus==1){
            if(++alreadyUsedIndex<30){ 
                alreadyUsedHtml+=common.setData(e,false);
            }
        }
    });
    if(notUsedHtml!=""){
        notUsedHtml+=common.getLoadNodeHtml();
        $("#notUsed").html(notUsedHtml);   
    }else{
        $("#notUsed").html(common.getPoints("没有可用的优惠券","(请关注抢卷活动)"));
    }
    if(alreadyUsedHtml!=""){
        alreadyUsedHtml+=common.getLoadNodeHtml();
        $("#alreadyUsed").html(alreadyUsedHtml);
    }else{
        $("#alreadyUsed").html(common.getPoints("没有已使用的优惠券","(请关注抢卷活动)"));
    }
}