<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
    <title>订单详情</title>
    <link rel="stylesheet" href="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/css/brew.css">
    <script type='text/javascript'>
      var _vds = _vds || [];
      window._vds = _vds;
      (function(){
        _vds.push(['setAccountId', 'b601fadaedebbd6a']);
        (function() {
          var vds = document.createElement('script');
          vds.type='text/javascript';
          vds.async = true;
          vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js';
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(vds, s);
        })();
      })();
    </script>
    <script src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/build/rem.js"></script>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script type="text/javascript">
    eval('var orderType="${orderType}"');
    eval('var json=${dataStr}');
    if(orderType=="normalOrder"){
        wx.config({
            debug: false,
            appId: '${result.appId}',
            timestamp: '${result.timestamp}',
            nonceStr: '${result.nonceStr}',
            signature: '${result.signature}',
            jsApiList: [
              'openLocation',
              'getLocation'
            ]
        });
        window.onload=function(){sucess(json,"1")};
    }else{
        window.onload=function(){sucess(json,"2")};
    }
    </script>
</head>
<body>
<div class="finish">
    <p>感谢您品尝咖啡码头饮品</p>
    <img class="finish-ani" src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/finish-img1.png"/>
    <img src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/finish-img2.png"/>
    <span class="text1">冲泡遇到问题</span>
    <a class="server" href="tel:4008210356"><img src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/finish-img3.png"/></a>
    <div class="finish-bottom">
        <a  href="javascript:WeixinJSBridge.call('closeWindow');" class="btn">
            <span>关闭</span>
        </a>
    </div>
</div>
<div class="container">
    <div class="points">
        <img src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/pay-points1.png"/>
        <img src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/pay-points2.png"/>
    </div>
    <div class='product-container' id="productBox">
        <div class='img-container'>
         <img src=''alt=''/>
        </div>
        <div class='product-content clearfix'>
            <p class='name'></p>
            <p class='price'>￥00.00</p>
            <p class='no-price'>￥00.00<span></span></p>
        </div>
    </div>
    <div class="roduct-entity" id="entityBox">
        <a class="icon">
            <span></span>
            <span></span>
        </a>
        <div class="entity-content clearfix" id="entity">
        </div>
    </div>
    <div class="temperature">
        <ul class="clearfix" id="sugar">
        </ul>
    </div>
    <p class="logo-box">
        <img src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/logo.png"/>
    </p>
    <div class="pay-box clearfix">
        <div class="pay-btn" id="payBtn">
            <p>一键冲泡</p>
        </div>
    </div>
</div>
<div class="position-entity" id="positionEntity">
    <i class="back-icon" id="back">
        <img src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/back.png"/>
    </i>
    <header>
    <div class="clearfix nav-box">
        <div class="cur">
            <p>我的机器</p>
        </div>
        <div>
            <p>附近的机器</p>
        </div>
    </div>
    </header>
    <div class="tab-box clearfix">
        <div id="wrapper1" class="tab position-left-go">
            <div id="myEntity">
            </div>
        </div>
        <div id="wrapper2" class="tab">
            <div id="nearEntity">
                <div class="guide" id="guide">
                    <img src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/guide-img1.png"/>
                    <img src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/guide-img2.png"/>
                    <img src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/guide-img3.png"/>
                    <img src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/guide-img4.png"/>
                    <p>点击扫一扫(无需定位)</p>
                    <a href="http://org.oa.mattburg.cn/jeewxmb/productController.do?scanQRCode">
                        <img src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/nav-img/img3.png"/>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/build/zepto.min.js"></script>
<script src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/build/iscroll.min.js"></script>
<script src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/build/touch.min.js"></script>
<script src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/build/brew.js"></script>
</body>
</html>
