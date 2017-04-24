//全局数据对象
var brewObject=require('./dataObj');
//loading组件
var loading=require('./loading');

module.exports=function(){
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
        loading(false);
        if(data.jSONObject.result_code!=0){
          alert(data.jSONObject.result_msg);
        }else{
          $(".finish").addClass("finish-block");
        }
      }
  });
}