//loading组件
var loading=require('./loading');
//全局数据对象
var payObject=require('./dataObj');

module.exports=function(){
  $("#payBtn").on("tap",function(){
    if(payObject.getMachineId()==""){
       alert("您还没有选机器!");
       $("#entityBox").trigger("tap");
    }else{
        loading(true);
        var orderUrl="productController.do?commitOrder";
        $.ajax({
            type: 'POST',
            url: orderUrl,
            dataType: "json",
            data: {
              userId:payObject.getUserId(),
              productId:payObject.getProductId(),
              machineId:payObject.getMachineId(),
              orderPrice:payObject.getOrderPrice(),
              couponPrice:payObject.getCouponPrice(),
              quantity:payObject.getQuantity(),
              productPrice:payObject.getProductPrice(),
              couponId:payObject.getCouponId()
            },
            success:function(data){
              if(data.errormessage){
                  loading(false);
                  alert(data.errormessage+"请重试!");
              }else{
                  var host = window.location.host;
                  var userId=payObject.getUserId();
                  var orderNumber=data.ordermumber;
                  var orderPrice=payObject.getOrderPrice();
                  var machineId=payObject.getMachineId();
                  var productId=payObject.getProductId();
                  var orderType=data.orderType;
                  if(orderPrice=="0.00"){
                      window.location.href= 'http://'+host+'/jeewxmb/productController.do?paySucess&' + 'userId='+userId+'&orderNumber='+orderNumber+'&orderPrice='+orderPrice+'&machineId='+machineId+'&productId='+productId+'&type=2'+'&orderType=' + orderType;
                  }else{
                      var appid="wxeac3a500f95bf866";
                      var redirect_uri = encodeURIComponent('http://' + host + '/jeewxmb/wXPayController.do?pay&userId=' + userId +"&orderNumber=" + orderNumber + "&orderPrice=" + orderPrice + "&machineId=" + machineId + "&productId=" +productId+'&orderType=' + orderType);
                      var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid +'&redirect_uri=' + redirect_uri +'&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
                      window.location.href = url; 
                  }
              }
            }
        });
    }
  });
}