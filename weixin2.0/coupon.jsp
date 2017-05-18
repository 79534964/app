<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
    <title>优惠劵</title>
    <link rel="stylesheet" href="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/css/coupon.css">
    <script src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/build/rem.js"></script>
    <script type="text/javascript">
        var couponVoList= ${couponVoList};
        var couponOffList= ${couponOffList};
        var openId= '${openId}';
    </script>
</head>
<body>
<header>
    <div class="clearfix nav-box">
        <div class="cur">
            <p>抢券中</p>
        </div>
        <div>
            <p>未使用</p>
        </div>
        <div>
            <p>已使用</p>
        </div>
    </div>
</header>
<div class="swiper1">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
            <div class="swiper2">
                <div class="swiper-wrapper2 content-slide" id="grab">
                </div>
                <div class="swiper-scrollbar"></div>
            </div>
        </div>
        <div class="swiper-slide">
            <div class="swiper2">
                <div class="swiper-wrapper2 content-slide" id="notUsed">
                </div>
                <div class="swiper-scrollbar"></div>
            </div>
        </div>
        <div class="swiper-slide">
            <div class="swiper2">
                <div class="swiper-wrapper2 content-slide" id="alreadyUsed">
                </div>
                <div class="swiper-scrollbar"></div>
            </div>
        </div>
      </div>
</div>
<footer>
    <a href="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/webview.html">
        <img src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/nav-img/img1.png"/>
    </a>
    <a href="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/productList.html">
        <img src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/nav-img/img2.png"/>
    </a>
    <a href="http://org.oa.mattburg.cn/jeewxmb/productController.do?scanQRCode">
        <img src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/nav-img/img3.png"/>
    </a>
    <a href="http://org.oa.mattburg.cn/jeewxmb/productController.do?toOrder">
        <img src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/nav-img/img5.png"/>
    </a>
    <a href="http://org.oa.mattburg.cn/jeewxmb/productController.do?toCoupon">
        <img src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/nav-img/img4-cur.png"/>
    </a>
</footer>
<script src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/build/zepto.min.js"></script>
<script src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/build/swiper.min.js"></script>
<script src="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/build/coupon.js"></script>
</body>
</html>