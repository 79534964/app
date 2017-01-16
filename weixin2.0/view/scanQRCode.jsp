<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>扫一扫</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
      <script type="text/javascript">	
    	wx.config({
    	    debug: false,
    	    appId: '${result.appId}',
    	    timestamp: '${result.timestamp}',
    	    nonceStr: '${result.nonceStr}',
    	    signature: '${result.signature}',
    	    jsApiList: [
    	      'scanQRCode'
    	    ]
    	});
    	wx.ready(function () {
    	  	wx.scanQRCode({
    	  	    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
    	  	    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
    	  	    success: function (res) {
    	  	    	var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
    	  		}
    	  	});
    	  	
    	});
      </script>
  </head>
  <body>        
  </body>
</html>
