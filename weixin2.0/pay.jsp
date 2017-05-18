<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>微信支付</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
  </head>
  <body onload="onBridgeReady()">
  </body>
  <script type="text/javascript">
  	var userId = '${userId}';
  	var orderNumber = '${orderNumber}';
  	var orderPrice = '${orderPrice}';
  	var machineId = '${machineId}';
  	var productId = '${productId}';
  	var orderType = '${orderType}';
  	var host = window.location.host;
  	
  	function onBridgeReady(){
 	   WeixinJSBridge.invoke(
  			 'getBrandWCPayRequest', {
  	    	 "appId" : '${appid}',
  	  		 "timeStamp": '${timeStamp}',
  	  		 "nonceStr": '${nonceStr}', 
  	  		 "package" : 'prepay_id='+'${packageValue}',
  	  		 "signType": "MD5",
  	  		 "paySign" : '${sign}' 
  	       },
  	       function(res){     
               if(res.err_msg == "get_brand_wcpay_request:ok" ){
                 //alert("支付成功！");
                 window.location.href= 'http://'+host+'/jeewxmb/productController.do?paySucess&' + 'userId='+userId+'&orderNumber='+orderNumber+'&orderPrice='+orderPrice+'&machineId='+machineId+'&productId='+productId+'&type=2'+'&orderType=' + orderType;
                 //WeixinJSBridge.call('closeWindow');
               } 
              if(res.err_msg == "get_brand_wcpay_request:cancel" ){
              alert("你取消了支付！");
              window.location.href='http://'+host+'/jeewxmb/productController.do?payCancelOrPayError&ordernumber='+orderNumber;
             }
              if(res.err_msg == "get_brand_wcpay_request:fail" ){
               alert("支付失败！");
              window.location.href='http://'+host+'/jeewxmb/productController.do?payCancelOrPayError&ordernumber='+orderNumber;
             }
           }
  	   ); 
  	}
  	if (typeof WeixinJSBridge == "undefined"){
  	   if( document.addEventListener ){
  	       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
  	   }else if (document.attachEvent){
  	       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
  	       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
  	   }
  	}else{
  	   onBridgeReady();
  	}
  </script>
</html>
