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
            wx.ready(function(){
                wx.getLocation({
                    type: 'gcj02',
                    success: function (res) {
                        latitude = res.latitude;
                        longitude = res.longitude;
                        machineAjax(latitude,longitude,userId,true);
                    },
                    fail:function (res){
                        machineAjax(latitude,longitude,userId,false);
                        $("#guide").addClass("guide-ani");
                    }
                });
            });
        }else{
            showEntity(true);
        }
    });
}
function machineAjax(latitude,longitude,userId,flag){
    var url="http://test.wx.mattburg.cn/jeewxmb/productController.do?getlistMachineJson";
    var path=url+"&userId="+userId+"&longitude="+longitude+"&latitude="+latitude;
    $.ajax({
        type:"GET",
        url:path,
        dataType:"json",
        success:function(data){
            $("#positionEntity").height($(window).height());
            setshowEntity($("#myEntity"),data.jsonMachineEntityListforMe);
            new iScroll('wrapper1');
            if(data.jsonMachineEntityListforMe.length<=0){
                $("#myEntity").append("<div class='guide-text'>您还未使用过机器～</div>");
            }
            setshowEntity($("#nearEntity"),data.jsonNearBymachineEntityList);
            new iScroll('wrapper2');
            if(data.jsonNearBymachineEntityList.length<=0&&flag){
                $("#nearEntity").append("<div class='guide-text'>您距离我们的机器过远～</div>");     
            }
            if(data.jsonMachineEntityListforMe.length<=0){
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