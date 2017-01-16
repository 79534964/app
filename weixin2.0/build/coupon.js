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
	//双重重力效果的组件
	var swiperEffect=__webpack_require__(2);
	//可用和已使用优惠劵的组件
	var sucess=__webpack_require__(3);
	//可用和已使用优惠劵的组件
	var buying=__webpack_require__(5);
	$(document).ready(function(){
	     sucess(couponVoList);
	     buying(couponOffList);
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

	//公共方法组件
	var common=__webpack_require__(4);
	module.exports=function(data){
	    var notUsedHtml="";
	    var alreadyUsedHtml="";
	    var notUsedIndex=0;
	    var alreadyUsedIndex=0;
	    $.each(data,function(i,e){
	        if(e.couponStatus==0){
	            if(++notUsedIndex<30){
	                notUsedHtml+=common.setData(e,true);
	            }
	        }else if(e.couponStatus==1){
	            if(++alreadyUsedIndex<30){
	                alreadyUsedHtml+=common.setData(e,false);
	            } 
	        }
	    });
	    if(notUsedHtml!=""){
	        notUsedHtml+=common.getLoadNodeHtml();
	        $("#notUsed").html(notUsedHtml);   
	    }else{
	        $("#notUsed").html(common.getPoints("没有可用的优惠券","(请关注抢卷活动)"));
	    }
	    if(alreadyUsedHtml!=""){
	        alreadyUsedHtml+=common.getLoadNodeHtml();
	        $("#alreadyUsed").html(alreadyUsedHtml);
	    }else{
	        $("#alreadyUsed").html(common.getPoints("没有已使用的优惠券","(请关注抢卷活动)"));
	    }
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	//如果为空添加默认动画
	exports.getPoints=function(str1,str2){
	    return "<img class='points-ani' src='http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/icon-ani.png'>"+
	           "<img class='points-img' src='http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/icon.png'>"+
	           "<span class='points'>"+str1+"</span>"+
	           "<span class='points' style='font-size:0.3rem;'>"+str2+"</span>";
	}
	//再最后添加动画
	exports.getLoadNodeHtml=function(){
	    return "<i class='swiper-slide2 load-node'><img src='http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/load-node.png'/><p>正在加载</p></i>";
	}
	//遍历输出
	exports.setData=function(e,flag){
	    if(flag){
	        var imgSrc="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/";    
	    }else{
	        var imgSrc="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/n";
	    }
	    var imgName;
	    var name;
	    var html;
	    if(e.priceType==1){
	        name=e.ruleName;
	        if(e.couponPrice*1>5||e.couponPrice*1==1){
	            imgName=99;
	        }else{
	            imgName=e.couponPrice;
	        }
	    }else if(e.priceType==2){
	        if(e.couponPrice!=50&&e.couponPrice!=100){
	            imgName=99;
	            name=e.couponPrice+"%OFF";
	        }else{
	            imgName=e.couponPrice;
	            name=e.ruleName;
	        }
	    }
	    html="<div class='swiper-slide2 product-container'>"+
	            "<div class='img-container'>"+
	                "<img src='"+imgSrc+imgName+".png"+"'alt=''/>"+
	                "<p>"+name+"</p>"+
	             "</div>"+
	          "</div>";
	     return html;
	}
	exports.getPoints

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	//公共方法组件
	var common=__webpack_require__(4);
	//loading组件
	var loading=__webpack_require__(1);
	//优惠卷最后提交得接口
	var couponAjax=__webpack_require__(6);
	module.exports=function(data){
	    data=removeData(data);
	    var html="";
	    var arr=[];
	    var newArr=[];
	    var num;
	    $.each(data,function(i,e){
	        html+=common.setData(e,true);
	        arr.push(getData(e.provideBeginTimeDate));
	    })
	    if(html!=""){
	        html+=common.getLoadNodeHtml();
	        $("#grab").html(html);
	    }else{
	        $("#grab").html(common.getPoints("暂无抢卷活动","(敬请期待)"));
	    }
	    var nodes=$("#grab").children().children();
	    $.each(arr,function(i,e){
	        num=e-new Date().getTime();
	        if(num<=0){
	            nodes.eq(i).append("<img class='rob y no-break' index='"+i+"' src='http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/coupon-y.png' alt=''/>");
	        }else if(num<=(1000*60*60*24)){
	            nodes.eq(i).append("<img class='rob n break' index='"+i+"' src='http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/coupon-n.png' alt=''/><span></span>");
	            newArr.push(num);
	        }else{
	            nodes.eq(i).parent().remove();
	        }
	    });
	    var inter=setInterval(function(){
	        countdown(newArr);
	    },1000);
	    arr=null;
	    couponAjax(nodes,data);
	    function countdown(arr){
	        var nodes=$(".n");
	        for(var i=0;i<arr.length;i++){
	            if(arr[i]<1000){
	                nodes.eq(i).attr({"src":"http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/coupon-y.png","class":"rob y no-break"}).next().html("");
	                arr.splice(i,1);
	            }else{
	                arr[i]=arr[i]-1000;
	                nodes.eq(i).next().text("抢卷剩余时间:"+getTime(arr[i]));
	            }
	        }
	        function getTime(time){
	            var hours=add(parseInt(time/60/60/1000));
	            var min=add(parseInt(time/60/1000)%60);
	            var second=add(parseInt(time/1000)%60);
	            function add(str){
	                var newStr=str+"";
	                if(newStr.length==1){
	                newStr="0"+newStr;
	                }
	                return newStr;
	            }
	        return hours+":"+min+":"+second;
	        }
	    }
	}
	//将时间转换为时间戳
	function getData(str){
	   return Date.parse(new Date(str.substr(0,19).replace(/-/g,'/')));
	}
	//先把不能抢的去掉
	function removeData(arr){
	    var spliceCouponOffList=[];
	     $.each(arr,function(i,e){
	        if(getData(e.provideEndTimeDate)-new Date().getTime()>=0){
	            spliceCouponOffList.push(e);
	        }
	     });
	     return spliceCouponOffList;
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	//loading组件
	var loading=__webpack_require__(1);
	module.exports=function(nodes,couponOffList){
	    nodes.on('click',function(){
	        var node=$(this).find(".rob");
	        if(node.attr("class").indexOf("y")!=-1){
	            loading(true);
	            var coupon_rule_id=couponOffList[node.attr("index")].id;
	            var url="http://org.oa.mattburg.cn/jeewxmb/productController.do?getCouponOff&"+'openId='+openId+'&coupon_rule_id='+coupon_rule_id;
	            $.ajax({
	                  type: 'GET',
	                  url: url,
	                  dataType: "json",
	                  success: function(data){
	                    loading(false);
	                    alert(data[0].msg);
	                    if(data[0].msg.indexOf("成功")!=-1){
	                        window.location.href="http://org.oa.mattburg.cn/jeewxmb/productController.do?toCoupon";
	                    }
	                  }
	            });
	        }else{
	            alert("抢券时间未到,请您稍后!");
	        }
	    });
	}

/***/ }
/******/ ]);