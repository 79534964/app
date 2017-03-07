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
	//头部产品组件
	var header=__webpack_require__(2);
	//选机器部分组件
	var machine=__webpack_require__(3);
	//全局数据对象
	var payObject=__webpack_require__(4);
	//将数据中的优惠券按规则重新排序的组件
	var sortBenefit=__webpack_require__(13);
	//优惠劵区域
	var reBenefit=__webpack_require__(10);
	//最下方的支付按钮
	var payPrice=__webpack_require__(12);
	//最后一步支付
	var submit=__webpack_require__(14);
	sucess=function(json){
	    var data=json;
	    payObject.init(data);
	    sortBenefit(data);
	    $(document).ready(function(){
	       header(data[2].productEntity);
	       machine(data);
	       reBenefit();
	       payPrice();
	       submit();
	       loading(false);
	    });
	}


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

	//header
	module.exports=function(data){
	    $("#productBox").html(
	        "<div class='img-container'>"+
	            "<img src='http://zjc.mattburg.cn/jeewxmb/webpage/extend/product-img/"+data.productId+".png'alt=''/>"+
	        "</div>"+
	        "<div class='product-content clearfix'>"+
	            "<p class='name'>"+data.productName+"</p>"+
	            "<p class='ename'>"+data.productEname+"</p>"+
	            "<p class='price'>￥"+data.salesPrice+".00</p>"+
	            // "<p class='no-price'>￥"+data.price+".00<span></span></p>"+
	        "</div>"
	    );
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	//全局数据对象
	var payObject=__webpack_require__(4);
	//弹出选机器的页面组件
	var productPosition=__webpack_require__(5);
	//后端对应的数字字典
	var machineData=__webpack_require__(8);

	module.exports=function(data){
	    if(payObject.getMachineId()!=""){
	        entity(data[1].machineEntity);
	    }else{
	        noEntity();
	    }
	    productPosition(payObject.getUserId());
	}
	//entity
	function entity(data){
	    var operatorId=data.operatorId;
	    var img=data.machineIco+".png";
	    var imgPath="http://api.mattburg.cn/static/machineIco/"+operatorId+"/"+img;
	    $("#entity").html(
	            "<p class='title'>"+data.machineNumber+"</p>"+
	            "<p class='entity-img'>"+
	                // "<img src='"+imgPath+"' alt=''/>"+
	                "<img src='http://zjc.mattburg.cn/jeewxmb/webpage/extend/images/pay-logo.png' alt=''/>"+
	            "</p>"+
	            "<div class='entity-address'>"+
	                // "<p class='entity-name'>"+getMachineIco(data.machineIco)+"—"+data.machineName+"</p>"+
	                "<p class='entity-name'>北京辛蒂("+data.machineName+")</p>"+
	                "<p class='entity-number'>"+data.machineAddressDetail+"</p>"+
	                "<p class='entity-adr'>"+data.machineAddress+"</p>"+
	            "</div>"
	    );
	}
	//noEntity
	function noEntity(){
	    $("#entity").html(
	        "<p class='no-entity'>请选择冲泡地址~</p>"
	    );
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	function payObject(){
	        this.userId="";
	        this.productId="";
	        this.machineId="";
	        this.orderPrice="";
	        this.couponPrice="0";
	        this.quantity="1";
	        this.productPrice="";
	        this.couponId="undefined";
	        this.couponArr=[];
	        this.newcouponArr=[];
	        this.noCouponFlag=true;
	}
	//userId
	payObject.prototype.getUserId=function(){
	    return this.userId;
	}
	payObject.prototype.setUserId=function(userId){
	    this.userId=userId+"";
	}
	//productId
	payObject.prototype.getProductId=function(){
	    return this.productId;
	}
	payObject.prototype.setProductId=function(productId){
	    this.productId=productId+"";
	}
	//machineId
	payObject.prototype.getMachineId=function(){
	    return this.machineId;
	}
	payObject.prototype.setMachineId=function(machineId){
	    this.machineId=machineId+"";
	}
	//orderPrice
	payObject.prototype.getOrderPrice=function(){
	    return this.orderPrice;
	}
	payObject.prototype.setOrderPrice=function(orderPrice){
	    this.orderPrice=(orderPrice*1).toFixed(2)+"";
	    if(this.orderPrice*1<0){
	        this.orderPrice="0.00";
	    }
	}
	//couponPrice
	payObject.prototype.getCouponPrice=function(){
	    return this.couponPrice;
	}
	payObject.prototype.setCouponPrice=function(couponPrice){
	    this.couponPrice=(couponPrice*1).toFixed(2)+"";
	    if(this.couponPrice*1>this.productPrice*1){
	        this.couponPrice=this.productPrice;
	    }
	}
	//quantity
	payObject.prototype.getQuantity=function(){
	    return this.quantity;
	}
	payObject.prototype.setQuantity=function(quantity){
	    this.quantity=quantity+"";
	}
	//productPrice
	payObject.prototype.getProductPrice=function(){
	    return this.productPrice;
	}
	payObject.prototype.setProductPrice=function(productPrice){
	    this.productPrice=(productPrice*1).toFixed(2)+"";
	}
	//couponId
	payObject.prototype.getCouponId=function(){
	    return this.couponId;
	}
	payObject.prototype.setCouponId=function(couponId){
	    this.couponId=couponId+"";
	}
	//couponArr
	payObject.prototype.getCouponArr=function(){
	    return this.couponArr;
	}
	payObject.prototype.setCouponArr=function(couponArr){
	    this.couponArr=couponArr;
	}
	//couponArr
	payObject.prototype.getNewCouponArr=function(){
	    return this.newcouponArr;
	}
	payObject.prototype.setNewCouponArr=function(newcouponArr){
	    this.newcouponArr=newcouponArr;
	}
	//noCouponFlag
	payObject.prototype.getNoCouponFlag=function(){
	    return this.noCouponFlag;
	}
	payObject.prototype.setNoCouponFlag=function(noCouponFlag){
	    this.noCouponFlag=noCouponFlag;
	}
	//数据初始化
	payObject.prototype.init=function(data){
	        this.setUserId(data[0].user.id);
	        this.setProductId(data[2].productEntity.productId);
	        this.setProductPrice(data[2].productEntity.salesPrice);
	        this.setOrderPrice(data[2].productEntity.salesPrice);
	        if(data[1].machineEntity){
	            this.setMachineId(data[1].machineEntity.id);
	        }
	        if(data[2].productEntity.noCouponFlag==0){
	            this.setNoCouponFlag(false);
	        }
	}
	//筛选优惠劵
	payObject.prototype.newCoupon=function(){
	    var object=this;
	    var arr=this.getCouponArr();
	    var newArr=[];
	    if(arr.length>0){
	        $.each(arr,function(i,e){
	             if(e.machineId&&e.productId){
	                if((e.machineId+"").indexOf(object.getMachineId())!=-1&&(e.productId+"").indexOf(object.getProductId())!=-1){
	                    newArr.push(e);  
	                }
	             }else if(e.machineId){
	                if((e.machineId+"").indexOf(object.getMachineId())!=-1){
	                    newArr.push(e);  
	                }
	             }else if(e.productId){
	                if((e.productId+"").indexOf(object.getProductId())!=-1){
	                    newArr.push(e);
	                }
	             }else{
	                newArr.push(e);
	             }
	        });
	    }
	    this.setNewCouponArr(newArr);
	}
	module.exports=new payObject();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	//loading组件
	var loading=__webpack_require__(1);
	//地地栏滑出的效果组件
	var showEntity=__webpack_require__(6);
	//遍历循环输出机器组件
	var setshowEntity=__webpack_require__(7);
	module.exports=function(userId){
	    var flag=true;
	    var latitude="0";
	    var longitude="0";
	    $("#entityBox").on("tap",function(){
	        if(flag){
	            flag=false;
	            loading(true);
	            wx.ready(function(){
	                wx.getLocation({
	                    type: 'gcj02',
	                    success: function (res) {
	                        latitude = res.latitude;
	                        longitude = res.longitude;
	                        machineAjax(latitude,longitude,userId,true);
	                    },
	                    fail:function (res){
	                        machineAjax(latitude,longitude,userId,false);
	                        $("#guide").addClass("guide-ani");
	                    }
	                });
	            });
	        }else{
	            showEntity(true);
	        }
	    });
	}
	function machineAjax(latitude,longitude,userId,flag){
	    var url="http://zjc.mattburg.cn/jeewxmb/productController.do?getlistMachineJson";
	    var path=url+"&userId="+userId+"&longitude="+longitude+"&latitude="+latitude;
	    $.ajax({
	        type:"GET",
	        url:path,
	        dataType:"json",
	        success:function(data){
	            $("#positionEntity").height($(window).height());
	            setshowEntity($("#myEntity"),data.jsonMachineEntityListforMe);
	            new iScroll('wrapper1');
	            if(data.jsonMachineEntityListforMe.length<=0){
	                $("#myEntity").append("<div class='guide-text'>您还未使用过机器～</div>");
	            }
	            setshowEntity($("#nearEntity"),data.jsonNearBymachineEntityList);
	            new iScroll('wrapper2');
	            if(data.jsonNearBymachineEntityList.length<=0&&flag){
	                $("#nearEntity").append("<div class='guide-text'>您距离我们的机器过远～</div>");     
	            }
	            if(data.jsonMachineEntityListforMe.length<=0){
	                $(".nav-box").children().eq(1).trigger("tap");
	            }else{
	                $(".nav-box").children().eq(0).trigger("tap");
	            }
	            tapIcon();
	            loading(false);
	            showEntity(true);
	        },
	        error:function(){
	            alert("抱歉服务器异常");
	            window.location.reloading();
	        }
	    });
	}
	//回退按钮
	function tapIcon(){
	    $("#back").on("tap",function(){
	        showEntity(false);
	    });
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports=function(flag){
	    var positionNode=$("#positionEntity");
	    var backIcon=$("#back");
	    if(flag){
	        positionNode.removeClass("position-ani-remove").addClass("position-ani-add");
	        backIcon.addClass("go").removeClass("back");
	    }else{
	        positionNode.removeClass("position-ani-add").addClass("position-ani-remove");
	        backIcon.addClass("back").removeClass("go");
	    }
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	//loading组件
	var loading=__webpack_require__(1);
	//后端对应的数字字典
	var machineData=__webpack_require__(8);
	//点击每一个地址像后端传值的组件
	var machineAjax=__webpack_require__(9);

	module.exports=function(node,datas){
	    var imgPath="http://api.mattburg.cn/static/machineIco/";
	    var html="<ul>";
	    $.each(datas,function(i,e){
	        if(e.enabledFlag==1&&e.flag==0){
	            // var str="id="+e.id+" title="+e.machineNumber+" name="+getMachineIco(e.machineIco)+"—"+e.machineName+" num="+e.machineAddressDetail+" adr="+e.machineAddress+" img="+imgPath+e.operatorId+"/"+e.machineIco+".png"+" status="+e.status;
	            var str="id="+e.id+" title="+e.machineNumber+" name=北京辛蒂("+e.machineName+") num="+e.machineAddressDetail+" adr="+e.machineAddress+" img=http://zjc.mattburg.cn/jeewxmb/webpage/extend/images/pay-logo.png"+" status="+e.status;
	            if(e.status=="00"){
	                html+="<li class='entity-box'"+str+">";
	            }else{
	                html+="<li class='entity-box background'"+str+">"; 
	            }
	            if(e.distence*1>30000){
	                e.distence="未知";
	            }
	            html+="<p class='entity-title'>"+e.machineNumber+"</p>"+
	                "<div class='entity-con'>"+
	                    // "<img src='"+imgPath+e.operatorId+"/"+e.machineIco+".png"+"' alt=''/>"+
	                    "<img src='http://zjc.mattburg.cn/jeewxmb/webpage/extend/images/pay-logo.png' alt=''/>"+
	                    "<div class='content'>"+
	                        "<p class='status'>"+machineData.getStatus(e.status)+"</p>"+
	                        "<div class='icon'>"+
	                            "<p><img src='http://zjc.mattburg.cn/jeewxmb/webpage/extend/images/position-img.png'/></p>"+
	                            "<span>距您"+e.distence+"m</span>"+
	                        "</div>"+
	                        // "<span class='name'>"+getMachineIco(e.machineIco)+"—"+e.machineName+"</span>"+
	                        "<p class='name'>北京辛蒂("+e.machineName+")</p>"+
	                        "<span class='address'>"+e.machineAddressDetail+"</span>"+
	                        "<span>"+e.machineAddress+"</span>"+
	                    "</div>"+
	                "</div>"+
	              "</li>";
	        }
	    });
	    html+="</ul>";
	    node.append(html);
	    var showNode=$(".tab-box").children();
	    $(".nav-box").children().on("tap",function(){
	        $(this).addClass('cur').siblings().removeClass('cur');
	        showNode.eq($(this).index()).addClass("position-left-go").siblings().removeClass("position-left-go").addClass("position-left-back");
	    });
	    machineAjax(node.find("li"));
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	 exports.getStatus=function(num){
	    var str;
	    switch(num){
	       case "91":
	        str="不在线";
	        break;
	       case "00":
	        str="在线";
	        break;
	       case "02":
	        str="缺水";
	        break;
	       case "03":
	        str="断水";
	        break;
	       case "05":
	        str="机器故障";
	        break;
	       case "08":
	        str="正在制冰";
	        break;
	        case "13":
	        str="缺奶";
	        break;
	       case "14":
	        str="缺糖";
	        break;
	       case "15":
	        str="缺香柚";
	        break;
	       case "16":
	        str="缺奶茶";
	        break;
	       case "17":
	        str="缺可可";
	        break;
	        case "18":
	        str="缺香柚";
	        break;
	       case "19":
	        str="缺料";
	        break;
	       case "20":
	        str="缺咖啡豆";
	        break;
	    }
	    return str;
	}
	//machineIco
	exports.getMachineIco=function(num){
	    var name;
	    switch(num){
	        case "10":
	        name="上海码头";
	        break;
	        case "20":
	        name="汉堡码头";
	        break;
	        case "30":
	        name="伦敦码头";
	        break;
	        case "40":
	        name="悉尼码头";
	        break;
	        case "50":
	        name="洛杉矶码头";
	        break;
	    }
	    return name;
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	//loading组件
	var loading=__webpack_require__(1);
	//全局数据对象
	var payObject=__webpack_require__(4);
	//地地栏滑出的效果组件
	var showEntity=__webpack_require__(6);
	//重置优惠劵区域
	var reBenefit=__webpack_require__(10);
	//后端对应的数字字典
	var machineData=__webpack_require__(8);

	module.exports=function(node){
	    node.on("tap",function(){
	        var obj=$(this);
	        var status=$(this).attr("status");
	        if(status=="00"){
	            loading(true);
	            var url="http://zjc.mattburg.cn/jeewxmb/productController.do?mymachine";
	            payObject.setMachineId($(this).attr("id"));
	            $.ajax({
	                type:"POST",
	                url:url,
	                dataType:"json",
	                data:{
	                    userId:payObject.getUserId(),
	                    machineId:payObject.getMachineId()
	                },
	                success: function(data){
	                    showEntity(false);
	                    loading(false);
	                    $("#entity").html(
	                        "<p class='title'>"+obj.attr("title")+"</p>"+
	                        "<p class='entity-img'>"+
	                            "<img src='"+obj.attr("img")+"' alt=''/>"+
	                        "</p>"+
	                        "<div class='entity-address'>"+
	                            "<p class='entity-name'>"+obj.attr("name")+"</p>"+
	                            "<p class='entity-number'>"+obj.attr("num")+"</p>"+
	                            "<p class='entity-adr'>"+obj.attr("adr")+"</p>"+
	                       "</div>"
	                    );
	                    if(data.machineFavourable.length>0){
	                        var arr=payObject.getCouponArr();
	                        var flag=true;
	                        $.each(arr,function(i,e){
	                            if(e.id&&e.id==data.machineFavourable[0].id){
	                                flag=false;
	                                return false;
	                            }
	                        });
	                        if(flag){
	                            arr.unshift(data.machineFavourable[0]);
	                            payObject.setCouponArr(arr);    
	                        }
	                    }
	                    reBenefit();
	                }
	            });
	        }else{
	            alert("机器"+machineData.getStatus(status)+"求稍后再试");
	        }
	    });
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	//全局数据对象
	var payObject=__webpack_require__(4);
	//优惠劵点击事件组件
	var benefitEffect=__webpack_require__(11);
	//最下方的支付按钮
	var payPrice=__webpack_require__(12);

	module.exports=function(){
	    if(payObject.getNoCouponFlag()){
	        $("#benefitCon").html(noBenefit("此商品不能使用优惠劵~"));
	    }else{
	        payObject.newCoupon();
	        benefit(payObject.getNewCouponArr());
	    }
	}
	//benefit
	function benefit(arr){
	    var benefitNode=$("#benefitCon");
	    var html="<div id='scroller'><ul>";
	    var index=0;
	    if(arr.length>0){
	        var benefitName;
	        $.each(arr,function(i,e){
	            if(e.ruleDesc){
	                benefitName=e.ruleDesc;
	            }else{
	                benefitName=e.title;
	            }
	            html+="<li>"+
	                        "<span data="+(index++)+">"+benefitName+"</span>"+
	                        "<input type='checkbox' name='benefit' value=''/>"+
	                   "</li>";
	        });
	        html+="</ul></div>"
	        benefitNode.html(html);
	        new iScroll('benefitCon');
	        benefitEffect();
	    }else{
	        benefitNode.html(noBenefit("没有可用的优惠劵~"));
	        payObject.setCouponId("undefined");
	        payObject.setCouponPrice(0);
	        payObject.setOrderPrice(payObject.getProductPrice());
	        payPrice();
	    }
	}
	function noBenefit(str){
	    return "<div id='scroller'>"+
	               "<ul>"+
	                 "<p class='no-benefit'>"+str+"<p>"+
	               "</ul>"+
	            "</div>";
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	//全局数据对象
	var payObject=__webpack_require__(4);
	//最下方的支付按钮
	var payPrice=__webpack_require__(12);

	module.exports=function(){
	    var index=0;
	    //为常量
	    _benIndex=0;
	    var curStyle="color";
	    var inputBox=$("#scroller li span");
	    inputBox.unbind("tap");
	    inputBox.on("tap",function(){
	        if(index==$(this).attr("data")){
	            if(_benIndex%2){
	                removeCur(index);
	            }else{
	                addCur(index);
	            }
	            _benIndex++;
	        }else{
	            removeCur(index);
	            index=$(this).attr("data");
	            addCur(index);
	        }
	    });
	    inputBox.eq(0).trigger("tap");
	    function addCur(index){
	        var arr=payObject.getNewCouponArr();
	        inputBox.eq(index).addClass(curStyle).siblings().attr("checked",true);
	        payObject.setCouponId(arr[index].couponId||arr[index].id);
	        if(arr[index].priceType=="1"){
	            payObject.setCouponPrice(arr[index].couponPrice);
	            payObject.setOrderPrice(payObject.getProductPrice()-payObject.getCouponPrice());
	        }else if(arr[index].priceType=="2"){
	            payObject.setCouponPrice(payObject.getProductPrice()*arr[index].couponPrice/100);
	            payObject.setOrderPrice(payObject.getProductPrice()-payObject.getCouponPrice());
	        }
	        payPrice();
	    }
	    function removeCur(index){
	        inputBox.eq(index).removeClass(curStyle).siblings().removeAttr("checked");
	        payObject.setCouponId("undefined");
	        payObject.setCouponPrice(0);
	        payObject.setOrderPrice(payObject.getProductPrice());
	        payPrice();
	    }
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	//全局数据对象
	var payObject=__webpack_require__(4);
	var priceS=$("#priceS");
	var priceP=$("#priceP");
	module.exports=function(){
	    priceS.text("优惠金额:￥"+payObject.getCouponPrice());
	    priceP.text("合计:￥"+payObject.getOrderPrice());
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	//全局数据对象
	var payObject=__webpack_require__(4);

	function sortArr(list){
	        var arr=list;
	        for(var i=0,len=arr.length;i<len;i++){
	            for(var j=0;j<len-i-1;j++){
	                if(arr[j].couponPrice<arr[j+1].couponPrice){
	                    var obj=arr[j];
	                    arr[j]=arr[j+1];
	                    arr[j+1]=obj;
	                }
	            }
	        }
	        return arr;
	}
	module.exports=function(data){
	    if(data[2].productEntity.noCouponFlag==0){
	        var arr=sortArr(data[4].couponVoList);
	        if(data[3].machineFavourable.length>0){
	            arr=(data[3].machineFavourable).concat(arr);
	        }
	        payObject.setCouponArr(arr);
	    }
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	//loading组件
	var loading=__webpack_require__(1);
	//全局数据对象
	var payObject=__webpack_require__(4);

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
	                  var userId=payObject.getUserId();
	                  var orderNumber=data.ordermumber;
	                  var orderPrice=payObject.getOrderPrice();
	                  var machineId=payObject.getMachineId();
	                  var productId=payObject.getProductId();
	                  var orderType=data.orderType;
	                  if(orderPrice=="0.00"){
	                      window.location.href= 'http://zjc.mattburg.cn/jeewxmb/productController.do?paySucess&' + 'userId='+userId+'&orderNumber='+orderNumber+'&orderPrice='+orderPrice+'&machineId='+machineId+'&productId='+productId+'&type=2'+'&orderType=' + orderType;
	                  }else{
	                      var appid="wx63a8157a0e186ec5";
	                      var redirect_uri = encodeURIComponent('http://zjc.mattburg.cn/jeewxmb/wXPayController.do?pay&userId=' + userId +"&orderNumber=" + orderNumber + "&orderPrice=" + orderPrice + "&machineId=" + machineId + "&productId=" +productId+'&orderType=' + orderType);
	                      var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid +'&redirect_uri=' + redirect_uri +'&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
	                      window.location.href = url; 
	                  }
	              }
	            }
	        });
	    }
	  });
	 }

/***/ }
/******/ ]);