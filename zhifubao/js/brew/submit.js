//loading组件
var loading=require('./loading');
//全局数据对象
var brewObject=require('./dataObj');

module.exports=function(){
  var flag=true;
  $("#payBtn").on("tap",function(){
    console.log(brewObject);
    if(flag){
      flag=false;
      loading(true);
      $.ajax({
          type: 'POST',
          url: "http://"+window.location.host+"/coffeealipay/brew",
          dataType: "json",
          data: {
            machineid:brewObject.getMachineId(),
            orderfromid:brewObject.getOrdernumber(),
            sugartaste:brewObject.getSugarTaste(),
            milktaste:brewObject.getMilkTaste(),
          },
          success: function(data){
            console.log(data);
            if(data.jSONObject.result_code==0){
                loading(false);
                $(".finish").addClass("finish-block");
            }else{
                alert(data.jSONObject.result_msg);
                AlipayJSBridge.call('closeWebview');
            }
          }
      });
    }
   });
 }