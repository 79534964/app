<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
    <title>订单支付</title>
    <link rel="stylesheet" href="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/css/pay.css">
    <script src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/build/rem.js"></script>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script type="text/javascript">
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
        var json=${datestr};
        window.onload=function(){sucess(json)};
    </script>
</head>
<body>
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
    <div class="benefit">
        <div class="header">
            <p>可用优惠劵</p>
        </div>
        <div class="benefit-content" id="benefitCon">
            <div id="scroller">
                <ul>
                  <p class="no-benefit">没有可用的优惠劵~<p>
                </ul>
            </div>
        </div>
    </div>
    <p class="logo-box">
        <img src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/logo.png">
    </p>
    <div class="pay-box clearfix">
        <div class="pay-left">
            <p class="benefit-price" id="priceS">优惠金额:￥00.00</p>
            <p class="pay-price" id="priceP">合计:￥00.00</p>
        </div>
        <div class="pay-btn" id="payBtn">
            <p>立即支付</p>
        </div>
    </div>
</div>
<script src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/build/zepto.min.js"></script>
<script src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/build/iscroll.min.js"></script>
<script src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/build/touch.min.js"></script>
<script src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/build/pay.js"></script>
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
</body>
</html>
