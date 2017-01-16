//loading组件
var loading=require('./loading');
//地地栏滑出的效果组件
var showEntity=require('./showEntity');
//遍历循环输出机器组件
var setshowEntity=require('./setshowEntity');

module.exports=function(userId){
    var flag=true;
    var latitude="0";
    var longitude="0";
    $("#entityBox").on("tap",function(){
        if(flag){
            flag=false;
            loading(true);
            if(navigator.userAgent.indexOf("AlipayClient")===-1){
                machineAjax(latitude,longitude,userId,false);
                $("#guide").addClass("guide-ani");
            }else{
                if((Ali.alipayVersion).slice(0,3)>=8.1){
                    Ali.geolocation.getCurrentPosition({
                        timeout: 5000 //超时时间
                    }, function(result) {
                        if(result.errorCode){
                            machineAjax(latitude,longitude,userId,false);
                            $("#guide").addClass("guide-ani");
                        }else{
                            //成功定位的情况
                            latitude=result.coords.latitude;
                            longitude=result.coords.longitude;
                            machineAjax(latitude,longitude,userId,true);
                        }
                    });
                }else{
                    Ali.alert({
                        title: '亲',
                        message: '请升级您的钱包到最新版',
                        button: '确定'
                    });
                }
            }
        }else{
            showEntity(true);
        }
    });
}
function machineAjax(latitude,longitude,userId,flag){
    $.ajax({
        type:"GET",
        url:"http://"+window.location.host+"/coffeealipay/Machine/machinelist?userid="+userId+"&longitude="+longitude+"&latitude="+latitude,
        dataType:"text",
        success:function(data){
            eval("var data="+data);
            $("#positionEntity").height($(window).height());
            setshowEntity($("#myEntity"),data.mymaclist);
            new iScroll('wrapper1');
            if(data.mymaclist.length<=0){
                $("#myEntity").append("<div class='guide-text'>您还未使用过机器～</div>");
            }
            setshowEntity($("#nearEntity"),data.mynearmaclist);
            new iScroll('wrapper2');
            if(data.mynearmaclist.length<=0&&flag){
                $("#nearEntity").append("<div class='guide-text'>您距离我们的机器过远～</div>");     
            }
            if(data.mymaclist.length<=0){
                $(".nav-box").children().eq(1).trigger("tap");
            }else{
                $(".nav-box").children().eq(0).trigger("tap");
            }
            tapIcon();
            loading(false);
            showEntity(true);
        },
        error:function(){
            alert("抱歉服务器异常");
            window.location.reloading();
        }
    });
}
//回退按钮
function tapIcon(){
    $("#back").on("tap",function(){
        showEntity(false);
    });
}