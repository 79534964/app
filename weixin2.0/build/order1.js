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
	//双重重力效果和5个假分页效果的组件
	var swiperEffect=__webpack_require__(2);
	//数据处理的组件
	var sucess=__webpack_require__(3);
	//没有图片时替补图片
	var takePlace=__webpack_require__(5);
	$(document).ready(function(){
	    sucess(orderVoListNotPay,notBrewAndBrewList);
	    takePlace();
	    swiperEffect();
	    loading(false);
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
	    this.container.setAttribute("style","position:absolute;width:100%;height:100%;z-index:100;top:0;max-width:750px");
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

	module.exports=function(){
	    var windowHeight=$(window).height()*0.92;
	    $(".swiper1").css({"height":windowHeight+"px"});
	    $(".swiper2").css({"height":windowHeight+"px"});
	    var swiperBtn=$(".nav-box div");
	    var tabsSwiper = new Swiper('.swiper1',{
	        speed:500,
	        onSlideChangeStart: function(){
	            swiperBtn.eq(tabsSwiper.activeIndex).addClass('cur').siblings().removeClass('cur');
	        }
	    });
	    swiperBtn.on('touchstart mousedown',function(){
	        $(this).addClass('cur').siblings().removeClass('cur');
	        tabsSwiper.slideTo($(this).index());
	    });
	    var swiperArr=[{
	        "index":1,
	        "flag":true
	    },{
	        "index":1,
	        "flag":true
	    },{
	        "index":1,
	        "flag":true
	    }];
	    var swipers=new Swiper('.swiper2',{
	        wrapperClass : 'swiper-wrapper2',
	        slideClass : 'swiper-slide2',
	        direction : 'vertical',
	        slidesPerView :'auto',
	        freeMode : true,
	        scrollbar:'.swiper-scrollbar',
	        onInit: function(swiper) {
	            var loadNode=$(swiper.wrapper[0]).find(".load-node");
	            removeLoadNode(loadNode);
	            for(var i=0;i<swiper.slides.length;i++){
	                if(i>4){
	                    swiper.slides[i].style.display="none";
	                    swiper.onResize();
	                }
	            }
	        },
	        onTouchEnd: function(swiper){
	            if((swiper.wrapper[0].clientHeight-windowHeight+swiper.translate)<-70){
	                for(var i=0;i<swipers.length;i++){
	                    if(swipers[i]==swiper){
	                        if(swiperArr[i].flag){
	                            swiperArr[i].flag=false;
	                            var num=swiperArr[i].index*4;
	                            var loadNode=$(swiper.wrapper[0]).find(".load-node");
	                            if(swiper.slides.length>num){
	                                swiperArr[i].index=swiperArr[i].index+1;
	                                var index=i;
	                                getLoadNode(true,loadNode);
	                                swiper.onResize();
	                                setTimeout(function(){
	                                    for(var j=0;j<num+4;j++){
	                                        if(swiper.slides[j]){
	                                            swiper.slides[j].style.display="block";
	                                            removeLoadNode(loadNode);
	                                            swiper.onResize();
	                                            swiperArr[index].flag=true;
	                                        }
	                                     }
	                                },1000);
	                            }else{
	                                if(swiper.slides.length>4){
	                                    getLoadNode(false,loadNode);
	                                    swiper.onResize();   
	                                }
	                            }
	                        }
	                    }
	                }
	            }
	        }
	     });
	}
	//加载更多的node节点
	function getLoadNode(flag,node){
	    if(flag){
	        node.find("img").addClass("img-ani");
	    }else{
	        node.find("img").removeClass("img-ani");
	        node.find("p").text("没有更多了");
	    }
	    node.css({"display":"block"});
	}
	//删除加载更多节点
	function removeLoadNode(node){
	    node.css({"display":"none"});
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	//如果为空添加默认动画组件
	var getPoints=__webpack_require__(4);
	module.exports=function(data1,data2){
	    wait(data1);
	    brew(data2);
	}
	function wait(data){
	    var appid="wxe020a9991e4fe96f";
	    var orderNumber;
	    var orderPrice;
	    var redirect_uri;
	    var url;
	    var html="";
	    var imgUrl;
	    $.each(data,function(i,e){
	        if(i<30){
	            orderNumber=(e.createTime+"")+(e.id+"");
	            orderPrice=(e.productPayPrice.toFixed(2))+"";
	            imgUrl="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/product-img/order-img/"+e.productId+".png";
	            redirect_uri = encodeURIComponent('http://' + window.location.host + '/jeewxmb/wXPayController.do?pay&userId=' + e.userId +"&orderNumber=" + orderNumber + "&orderPrice=" + orderPrice + "&machineId=" + e.machineId + "&productId=" +e.productId+"&orderType=normalOrder");
	            url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid +'&redirect_uri=' + redirect_uri +'&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
	            html+="<div class='product-container swiper-slide2'>"+
	                "<div class='header'>"+"订单编号:"+orderNumber+"</div>"+
	                "<div class='content clearfix'>"+
	                    "<a href='"+url+"'class='btn'>支 付</a>"+
	                    "<div class='img-box'>"+
	                        "<img src='"+imgUrl+"' alt=''/>"+
	                        "<p>"+e.productName+"</p>"+
	                    "</div>"+
	                    "<div class='introduce'>"+
	                        "<p class='time'>下单时间: "+e.orderDate+"</p>"+
	                        "<p class='one-price'>商品单价: "+e.productPrice.toFixed(2)+"元(1份,未支付)</p>"+
	                        "<p class='price'>实付:￥"+e.productPayPrice.toFixed(2)+"</p>"+
	                    "</div>"+
	                "</div>"+
	            "</div>";
	        }
	    });
	    if(html!=""){
	        html+=getLoadNodeHtml();
	        $("#wait").html(html);
	    }else{
	        $("#wait").html(getPoints("您还没有相关订单","快来下一单吧"));
	    }
	}
	function brew(data){
	    var imgUrl;
	    var url;
	    var orderNumber;
	    var orderPrice;
	    var brewHtml="";
	    var alreadyBrewHtml="";
	    var brewIndex=0;
	    var alreadyBrewIndex=0;
	    $.each(data,function(i,e){
	        orderNumber=(e.createTime+"")+(e.id+"");
	        orderPrice=(e.productPayPrice.toFixed(2))+"";
	        imgUrl="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/product-img/order-img/"+e.productId+".png";
	        url='http://'+window.location.host+'/jeewxmb/productController.do?paySucess&' + 'userId='+e.userId+'&orderNumber='+orderNumber+'&orderPrice='+orderPrice+'&machineId='+e.machineId+'&productId='+e.productId+'&type=1' + '&orderType=normalOrder';
	        if(e.status=="20"||e.status=="30"){
	            if(++brewIndex<30){
	                brewHtml+="<div class='product-container swiper-slide2'>"+
	                    "<div class='header'>"+"订单编号:"+orderNumber+"</div>"+
	                    "<div class='content clearfix'>"+
	                        "<a href='"+url+"'class='btn'>冲 泡</a>"+
	                        "<div class='img-box'>"+
	                            "<img src='"+imgUrl+"' alt=''/>"+
	                            "<p>"+e.productName+"</p>"+
	                        "</div>"+
	                        "<div class='introduce'>"+
	                            "<p class='time'>下单时间: "+e.orderDate+"</p>"+
	                            "<p class='one-price'>商品单价: "+e.productPrice.toFixed(2)+"元(1份,未冲泡)</p>"+
	                            "<p class='price'>实付:￥"+e.productPayPrice.toFixed(2)+"</p>"+
	                        "</div>"+
	                    "</div>"+
	                "</div>";
	            }
	        }else if(e.status=="50"){
	            if(++alreadyBrewIndex<30){
	                alreadyBrewHtml+="<div class='product-container swiper-slide2'>"+
	                "<div class='header'>"+"订单编号:"+orderNumber+"</div>"+
	                "<div class='content clearfix'>"+
	                    "<div class='img-box'>"+
	                        "<img src='"+imgUrl+"' alt=''/>"+
	                        "<p>"+e.productName+"</p>"+
	                    "</div>"+
	                    "<div class='introduce'>"+
	                        "<p class='time'>下单时间: "+e.orderDate+"</p>"+
	                        "<p class='one-price'>商品单价: "+e.productPrice.toFixed(2)+"元(1份,已冲泡)</p>"+
	                        "<p class='price'>实付:￥"+e.productPayPrice.toFixed(2)+"</p>"+
	                    "</div>"+
	                "</div>"+
	            "</div>"
	            }
	        }
	    });
	    if(brewHtml!=""){
	        brewHtml+=getLoadNodeHtml();
	        $("#brew").html(brewHtml);         
	    }else{
	        $("#brew").html(getPoints("您还没有相关订单","快来下一单吧"));
	    }
	    if(alreadyBrewHtml!=""){
	        alreadyBrewHtml+=getLoadNodeHtml();
	        $("#alreadyBrew").html(alreadyBrewHtml);
	    }else{
	        $("#alreadyBrew").html(getPoints("您还没有相关订单","快来下一单吧"));
	    }
	}
	//加载更多的图片
	function getLoadNodeHtml(){
	    return "<i class='swiper-slide2 load-node'><img src='http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/load-node.png'/><p>正在加载</p></i>";
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	//如果为空添加默认动画
	module.exports=function(str1,str2){
	    return "<img class='points-ani' src='http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/icon-ani.png'>"+
	           "<img class='points-img' src='http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/icon.png'>"+
	           "<span class='points'>"+str1+"</span>"+
	           "<a href='http://org.oa.mattburg.cn/jeewxmb/webpage/extend/productList.html' class='points-a'>"+str2+"</a>";
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports=function(){
	    $("img").error(function(){
	        $(this).attr("src","http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/takePlace.png");
	    });
	}

/***/ }
/******/ ]);