//loading组件
var loading=require('./loading');
//全局数据对象
var payObject=require('./dataObj');
//地地栏滑出的效果组件
var showEntity=require('./showEntity');
//重置优惠劵区域
var reBenefit=require('./reBenefit');
//后端对应的数字字典
var machineData=require('./machineData');

module.exports=function(node){
    node.on("tap",function(){
        var obj=$(this);
        var status=$(this).attr("status");
        if(status=="00"){
            loading(true);
            var url="http://org.oa.mattburg.cn/jeewxmb/productController.do?mymachine";
            payObject.setMachineId($(this).attr("id"));
            $.ajax({
                type:"POST",
                url:url,
                dataType:"json",
                data:{
                    userId:payObject.getUserId(),
                    machineId:payObject.getMachineId()
                },
                success: function(data){
                    showEntity(false);
                    loading(false);
                    $("#entity").html(
                        "<p class='title'>"+obj.attr("title")+"</p>"+
                        "<p class='entity-img'>"+
                            "<img src='"+obj.attr("img")+"' alt=''/>"+
                        "</p>"+
                        "<div class='entity-address'>"+
                            "<p class='entity-name'>"+obj.attr("name")+"</p>"+
                            "<p class='entity-number'>"+obj.attr("num")+"</p>"+
                            "<p class='entity-adr'>"+obj.attr("adr")+"</p>"+
                       "</div>"
                    );
                    if(data.machineFavourable.length>0){
                        var arr=payObject.getCouponArr();
                        var flag=true;
                        $.each(arr,function(i,e){
                            if(e.id&&e.id==data.machineFavourable[0].id){
                                flag=false;
                                return false;
                            }
                        });
                        if(flag){
                            arr.unshift(data.machineFavourable[0]);
                            payObject.setCouponArr(arr);    
                        }
                    }
                    reBenefit();
                }
            });
        }else{
            alert("机器"+machineData.getStatus(status)+"求稍后再试");
        }
    });
}