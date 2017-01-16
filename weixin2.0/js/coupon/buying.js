//公共方法组件
var common=require('./common');
//loading组件
var loading=require('./loading');
//优惠卷最后提交得接口
var couponAjax=require('./couponAjax');
module.exports=function(data){
    data=removeData(data);
    var html="";
    var arr=[];
    var newArr=[];
    var num;
    $.each(data,function(i,e){
        html+=common.setData(e,true);
        arr.push(getData(e.provideBeginTimeDate));
    })
    if(html!=""){
        html+=common.getLoadNodeHtml();
        $("#grab").html(html);
    }else{
        $("#grab").html(common.getPoints("暂无抢卷活动","(敬请期待)"));
    }
    var nodes=$("#grab").children().children();
    $.each(arr,function(i,e){
        num=e-new Date().getTime();
        if(num<=0){
            nodes.eq(i).append("<img class='rob y no-break' index='"+i+"' src='http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/coupon-y.png' alt=''/>");
        }else if(num<=(1000*60*60*24)){
            nodes.eq(i).append("<img class='rob n break' index='"+i+"' src='http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/coupon-n.png' alt=''/><span></span>");
            newArr.push(num);
        }else{
            nodes.eq(i).parent().remove();
        }
    });
    var inter=setInterval(function(){
        countdown(newArr);
    },1000);
    arr=null;
    couponAjax(nodes,data);
    function countdown(arr){
        var nodes=$(".n");
        for(var i=0;i<arr.length;i++){
            if(arr[i]<1000){
                nodes.eq(i).attr({"src":"http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/coupon-y.png","class":"rob y no-break"}).next().html("");
                arr.splice(i,1);
            }else{
                arr[i]=arr[i]-1000;
                nodes.eq(i).next().text("抢卷剩余时间:"+getTime(arr[i]));
            }
        }
        function getTime(time){
            var hours=add(parseInt(time/60/60/1000));
            var min=add(parseInt(time/60/1000)%60);
            var second=add(parseInt(time/1000)%60);
            function add(str){
                var newStr=str+"";
                if(newStr.length==1){
                newStr="0"+newStr;
                }
                return newStr;
            }
        return hours+":"+min+":"+second;
        }
    }
}
//将时间转换为时间戳
function getData(str){
   return Date.parse(new Date(str.substr(0,19).replace(/-/g,'/')));
}
//先把不能抢的去掉
function removeData(arr){
    var spliceCouponOffList=[];
     $.each(arr,function(i,e){
        if(getData(e.provideEndTimeDate)-new Date().getTime()>=0){
            spliceCouponOffList.push(e);
        }
     });
     return spliceCouponOffList;
}