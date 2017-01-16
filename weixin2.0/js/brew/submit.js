//loading组件
var loading=require('./loading');
//全局数据对象
var brewObject=require('./dataObj');

module.exports=function(){
  var flag=true;
  $("#payBtn").on("tap",function(){
    if(flag){
      flag=false;
      loading(true);
      var brewUrl="http://org.oa.mattburg.cn/jeewxmb/productController.do?sendBrewCommad";
      $.ajax({
          type: 'POST',
          url: brewUrl,
          dataType: "json",
          data: {
            machineId:brewObject.getMachineId(),
            ordernumber:brewObject.getOrdernumber(),
            orderPrice:brewObject.getOrderPrice(),
            sugarTaste:brewObject.getSugarTaste(),
            milkTaste:brewObject.getMilkTaste(),
            type:brewObject.getType()
          },
          success: function(data){
            if(data.order_voucher_id[0]==0){
                 loading(false);
                 alert("冲泡失败,请重试!");
            }else{
                var orderId=data.order_voucher_id[0];
                var url="http://org.oa.mattburg.cn/jeewxmb/productController.do?sendToBrewCommad";
                $.ajax({
                  type: 'POST',
                  url: url,
                  dataType: "json",
                  data: {
                    machineId:brewObject.getMachineId(),
                    order_voucher_id:orderId+""
                  },
                  success: function(data){
                    if(data.jSONObject.result_code==0){
                        loading(false);
                        $(".finish").addClass("finish-block");
                    }else{
                        alert(data.jSONObject.result_msg);
                        WeixinJSBridge.call('closeWindow');
                    }
                  }
                });
            }
        }
      });
    }
   });
 }