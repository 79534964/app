/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	//loading组件
	var loading=__webpack_require__(1);
	//输出数据的组件
	var indexData=__webpack_require__(2);
	//双重重力效果的组件
	var swiperEffect=__webpack_require__(3);
	$(document).ready(function(){
	    var coffeHost="http://org.oa.mattburg.cn/jeewxmb/productController.do?coffe";
	        $.ajax({
	            type:"GET",
	            url:coffeHost,
	            dataType:"json",
	            success:function(data){
	             indexData(data);
	             swiperEffect($(".nav-box div"),"cur","swiper1","swiper2");
	             loading(false);
	            },
	            error:function(data){
	                console.log("系统异常");
	            }
	        });
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	function load(){
	    this.container=document.createElement("div");
	    this.canvBox=document.createElement("div");
	    this.canv=document.createElement("canvas");
	    this.init();
	}
	load.prototype.init=function(){
	    this.container.setAttribute("style","position:fixed;width:100%;height:100%;z-index:100;top:0;max-width:750px");
	    this.canvBox.setAttribute("style","position:absolute;top:3.75rem;left:50%;width:1.4rem;height:1.4rem;margin-left:-0.7rem;background-color:rgba(0,0,0,.7);border-radius: 10%;");
	    this.canv.setAttribute("style","position:absolute;top:2.95rem;left:50%;width:5rem;margin-left:-1.49rem;z-index:10;");
	    this.canv.setAttribute("id","loading");
	    this.container.appendChild(this.canv);
	    this.container.appendChild(this.canvBox);
	    document.body.appendChild(this.container);
	}

	function isEmpty(obj){
	    var name;
	    for(name in obj){
	        return false;
	    }
	    return true;
	}
	function loading(arg){
	    this.init(arg);
	}
	loading.prototype = {
	    constructor:loading,
	    init: function (arg) {
	        var isConsist = !isEmpty(arg);
	        this.block = isConsist ? arg.block ? arg.block : 12 : 12;
	        this.height = isConsist ? arg.height ? arg.height : 15 : 15;
	        this.width = isConsist ? arg.width ? arg.width : 3.5 : 3.5;
	        this.time = isConsist ? arg.time ? arg.time : 50 : 50;
	        
	        this.cvs = document.getElementById(arg.id),
	        this.ctx = this.cvs.getContext("2d");
	        this.ctx.width = this.height*6;
	        this.ctx.height = this.height*6;
	        
	        this.ctx.translate(this.ctx.width, this.ctx.height);
	        var radius = 2;
	        this.view(radius);
	    },
	    loop: function(alpha){
	        this.ctx.rotate(Math.PI*2/this.block);
	        this.ctx.beginPath();
	        this.ctx.fillStyle = "rgba(255,255,255,"+alpha+")";
	        this.ctx.arc(0, this.ctx.width/2-this.height*2,this.width/2, 0 ,Math.PI, true);
	        this.ctx.arc(0, this.ctx.width/2-this.height, this.width/2, Math.PI, 0, true);
	        this.ctx.closePath();
	        this.ctx.fill();
	    },
	    view: function(radius){
	        var that = this;
	        this.ctx.rotate(Math.PI*2/this.block);
	        for(var i = 1; i <= this.block; i ++){
	            this.loop(i/this.block);
	        }
	        setTimeout(function(){
	            that.ctx.clearRect(-that.ctx.width/2, -that.ctx.height/2, that.ctx.width, that.ctx.height);
	            radius >= that.block? radius = 1:radius += 1;
	            that.view(radius);
	        }, that.time);
	    }
	}
	new load();
	new loading({"id":"loading"});
	module.exports=function(flag){
	    var node=document.getElementById('loading').parentNode;
	    if(flag){
	        node.style.display="block";
	    }else{
	        node.style.display="none";
	    }
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	function getProuctHtml(data,host){
	    return "<div class='product-container swiper-slide2'>"+
	            "<a href='"+host+data.productId+"' class='img-container'>"+
	                "<img src='http://org.oa.mattburg.cn/jeewxmb/webpage/extend/product-img/"+data.productId+".png'alt=''/><span>点击<br/>购买</span>"+
	             "</a>"+
	             "<div class='product-content clearfix'>"+
	                 "<p class='name'>"+data.productName+"</p>"+
	                 "<p class='ename'>"+data.productEname+"</p>"+
	                 "<p class='price'>¥"+data.salesPrice+".00</p>"+
	                 "<p class='no-price'>¥"+data.price+".00<span></span></p>"+
	             "</div>"+
	           "</div>";
	}
	module.exports=function(data){
	    var host="http://org.oa.mattburg.cn/jeewxmb/productController.do?goCoffebyIdController&id=";
	    var html1="";
	    var html2="";
	    $.each(data, function(i,e){
	        if(e.hotOrIce==0){
	            html1+=getProuctHtml(e,host);
	        }else{
	            html2+=getProuctHtml(e,host);
	        }
	    });
	    $("#hotProduct").append(html1);
	    $("#coldProduct").append(html2);
	}


/***/ },
/* 3 */
/***/ function(module, exports) {

	//双重重力效果
	module.exports=function(swiperBtn,swiperBtnCurClass,swiperBoxClass,swiperSonClass){
	    var windowHeight=$(window).height();
	    var swiperBoxClass="."+swiperBoxClass;
	    var swiperSonClass="."+swiperSonClass;
	    $(swiperBoxClass).css({"height":windowHeight*0.92+"px"});
	    $(swiperSonClass).css({"height":windowHeight*0.92+"px"});
	    var tabsSwiper = new Swiper(swiperBoxClass,{
	        wrapperClass : 'swiper-wrapper',
	        slideClass : 'swiper-slide',
	        speed:500,
	        onSlideChangeStart: function(){
	            swiperBtn.eq(tabsSwiper.activeIndex).addClass(swiperBtnCurClass).siblings().removeClass(swiperBtnCurClass);
	        }
	    });
	    swiperBtn.on('touchstart mousedown',function(){
	        $(this).addClass(swiperBtnCurClass).siblings().removeClass(swiperBtnCurClass);
	        tabsSwiper.slideTo($(this).index());
	    });
	    new Swiper(swiperSonClass,{
	        wrapperClass : 'swiper-wrapper2',
	        slideClass : 'swiper-slide2',
	        direction : 'vertical',
	        slidesPerView :'auto',
	        freeMode : true
	    });
	}

/***/ }
/******/ ]);