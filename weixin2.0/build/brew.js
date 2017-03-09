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
	var brewObject=__webpack_require__(4);
	//全局数据对象
	var sugar=__webpack_require__(10);
	//最后一步冲泡
	var submit=__webpack_require__(11);
	//冲泡请求
	var brewAjax=__webpack_require__(12);

	sucess=function(json,type){
	    var data=json;
	    data.productEntity.sugarTaste=data.productEntity.sugarTaste.split(",");
	    brewObject.init(data);
	    $(document).ready(function(){
	       if(type=="1"){
	          $(".container").css({'opacity':'1'});
	          header(data.productEntity);
	          machine(data,type);
	          sugar(data.productEntity.sugarTaste);
	          submit();
	       }else{
	          brewAjax();
	       }
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
	    this.container.setAttribute("style","position:absolute;width:100%;height:100%;z-index:100;top:0;max-width:750px;display:none;");
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
	            "<img src='http://org.oa.mattburg.cn/jeewxmb/webpage/extend/product-img/"+data.productId+".png'alt=''/>"+
	        "</div>"+
	        "<div class='product-content clearfix'>"+
	            "<p class='name'>"+data.productName+"</p>"+
	            "<p class='ename'>"+data.productEname+"</p>"+
	            "<p class='price'>￥"+data.salesPrice+".00</p>"+
	            "<p class='no-price'>￥"+data.price+".00<span></span></p>"+
	        "</div>"
	    );
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	//全局数据对象
	var brewObject=__webpack_require__(4);
	//弹出选机器的页面组件
	var productPosition=__webpack_require__(5);
	//后端对应的数字字典
	var machineData=__webpack_require__(8);

	module.exports=function(data,type){
	    if(brewObject.getMachineId()!=""){
	        entity(data.machineEntity);
	    }else{
	        noEntity();
	    }
	    if(type=="1"){
	        productPosition(brewObject.getUserId());
	    }else{
	        $(".icon").css({"display":"none"});
	    }
	}
	//entity
	function entity(data){
	    var operatorId=data.operatorId;
	    var img=data.machineIco+".png";
	    var imgPath="http://api.mattburg.cn/static/machineIco/"+operatorId+"/"+img;
	    $("#entity").html(
	        "<p class='title'>"+data.machineNumber+"</p>"+
	        "<p class='entity-img'>"+
	            "<img src='"+imgPath+"' alt=''/>"+
	        "</p>"+
	        "<div class='entity-address'>"+
	            "<p class='entity-name'>"+machineData.getMachineIco(data.machineIco)+"—"+data.machineName+"</p>"+
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

	function brewObject(){
	        this.userId="";
	        this.machineId="";
	        this.ordernumber="";
	        this.orderPrice="";
	        this.sugarTaste="0";
	        this.type="";
	        this.milkTaste="";
	}
	//userId
	brewObject.prototype.getUserId=function(){
	    return this.userId;
	}
	brewObject.prototype.setUserId=function(userId){
	    this.userId=userId+"";
	}
	//machineId
	brewObject.prototype.getMachineId=function(){
	    return this.machineId;
	}
	brewObject.prototype.setMachineId=function(machineId){
	    this.machineId=machineId+"";
	}
	//ordernumber
	brewObject.prototype.getOrdernumber=function(){
	    return this.ordernumber;
	}
	brewObject.prototype.setOrdernumber=function(ordernumber){
	    this.ordernumber=ordernumber+"";
	}
	//orderPrice
	brewObject.prototype.getOrderPrice=function(){
	    return this.orderPrice;
	}
	brewObject.prototype.setOrderPrice=function(orderPrice){
	    this.orderPrice=(orderPrice*1).toFixed(2)+"";
	    if(this.orderPrice*1<0){
	        this.orderPrice="0.00";
	    }
	}
	//sugarTaste
	brewObject.prototype.getSugarTaste=function(){
	    return this.sugarTaste;
	}
	brewObject.prototype.setSugarTaste=function(sugarTaste){
	    this.sugarTaste=sugarTaste+"";
	}
	//type
	brewObject.prototype.getType=function(){
	    return this.type;
	}
	brewObject.prototype.setType=function(type){
	    this.type=type+"";
	}
	//milkTaste
	brewObject.prototype.getMilkTaste=function(){
	    return this.milkTaste;
	}
	brewObject.prototype.setMilkTaste=function(milkTaste){
	    this.milkTaste=milkTaste+"";
	}
	//数据初始化
	brewObject.prototype.init=function(data){
	    this.setMachineId(data.machineEntity.id);
	    this.setMilkTaste(data.productEntity.milkTaste);
	    this.setUserId(data.userId);
	    this.setType(data.type);
	    this.setOrdernumber(data.ordernumber);
	    this.setOrderPrice(data.orderPrice);
	    if(data.productEntity.sugarTaste.length>1){
	        if(data.productEntity.productId==1 || data.productEntity.productId==2){
	            this.setSugarTaste(data.productEntity.sugarTaste[0]);
	        }else{
	            this.setSugarTaste(data.productEntity.sugarTaste[1]);
	        }
	    }else{
	        this.setSugarTaste(data.productEntity.sugarTaste[0]);
	    }
	}
	module.exports=new brewObject();

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
	    var url="http://org.oa.mattburg.cn/jeewxmb/productController.do?getlistMachineJson";
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
	        if(e.machineName.indexOf("CS")==-1){
	            if(e.enabledFlag==1&&e.flag==0){
	                var str="id="+e.id+" title="+e.machineNumber+" name="+machineData.getMachineIco(e.machineIco)+"—"+e.machineName+" num="+e.machineAddressDetail+" adr="+e.machineAddress+" img="+imgPath+e.operatorId+"/"+e.machineIco+".png"+" status="+e.status;
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
	                        "<img src='"+imgPath+e.operatorId+"/"+e.machineIco+".png"+"' alt=''/>"+
	                        "<div class='content'>"+
	                            "<p class='status'>"+machineData.getStatus(e.status)+"</p>"+
	                            "<div class='icon'>"+
	                                "<p><img src='http://test.wx.mattburg.cn/jeewxmb/webpage/extend/images/position-img.png'/></p>"+
	                                "<span>距您"+e.distence+"m</span>"+
	                            "</div>"+
	                            "<span class='name'>"+machineData.getMachineIco(e.machineIco)+"—"+e.machineName+"</span>"+
	                            "<span class='address'>"+e.machineAddressDetail+"</span>"+
	                            "<span>"+e.machineAddress+"</span>"+
	                        "</div>"+
	                    "</div>"+
	                  "</li>";
	            } 
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
	        name="洛杉矶码头";
	        break;
	        case "50":
	        name="悉尼码头";
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
	var brewObject=__webpack_require__(4);
	//地地栏滑出的效果组件
	var showEntity=__webpack_require__(6);
	//后端对应的数字字典
	var machineData=__webpack_require__(8);

	module.exports=function(node){
	    node.on("tap",function(){
	        var obj=$(this);
	        var status=$(this).attr("status");
	        if(status=="00"){
	            loading(true);
	            var url="http://org.oa.mattburg.cn/jeewxmb/productController.do?mymachine";
	            brewObject.setMachineId($(this).attr("id"));
	            $.ajax({
	                type:"POST",
	                url:url,
	                dataType:"json",
	                data:{
	                    userId:brewObject.getUserId(),
	                    machineId:brewObject.getMachineId()
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
	var brewObject=__webpack_require__(4);
	module.exports=function(data){
	    var boxNode=$("#sugar");
	    if(data.length==1){
	        boxNode.html("<li sugarTaste='"+data[0]+"' class='highcur one'>标准</li>");
	    }else{
	        boxNode.html("<li sugarTaste='"+data[0]+"' name='none' class='none'>无糖</li>"+
	                     "<li sugarTaste='"+data[1]+"' name='low' class='lowcur'>低糖</li>"+
	                     "<li sugarTaste='"+data[2]+"' name='high' class='high'>高糖</li>");
	    }   
	    boxNode.children().on("tap",function(){
	        var obj=$(this);
	        var className=obj.attr("class");
	        if(className.indexOf("cur")==-1){
	            brewObject.setSugarTaste(obj.attr("sugarTaste"));
	            obj.attr("class",className+"cur");
	            $.each(obj.siblings(),function(i,e){
	                var classname=e.className;
	                if(classname.indexOf("cur")!=-1){
	                    e.className=e.getAttribute("name");
	                }
	            });
	        }
	    });
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	//loading组件
	var loading=__webpack_require__(1);
	//冲泡请求
	var brewAjax=__webpack_require__(12);

	module.exports=function(){
	  var flag=true;
	  $("#payBtn").on("tap",function(){
	    if(flag){
	      flag=false;
	      loading(true);
	      brewAjax();
	    }
	   });
	 }

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	//全局数据对象
	var brewObject=__webpack_require__(4);
	//loading组件
	var loading=__webpack_require__(1);

	module.exports=function(){
	  var brewUrl="http://org.oa.mattburg.cn/jeewxmb/productController.do?sendBrewCommad";
	  $.ajax({
	      type: 'POST',
	      url: brewUrl,
	      dataType: "json",
	      data: {
	        machineId:brewObject.getMachineId(),
	        ordernumber:brewObject.getOrdernumber(),
	        orderPrice:brewObject.getOrderPrice(),
	        sugarTaste:brewObject.getSugarTaste(),
	        milkTaste:brewObject.getMilkTaste(),
	        type:brewObject.getType()
	      },
	      success: function(data){
	        if(data.order_voucher_id[0]==0){
	             loading(false);
	             alert("冲泡失败,请重试!");
	        }else{
	            var orderId=data.order_voucher_id[0];
	            var url="http://org.oa.mattburg.cn/jeewxmb/productController.do?sendToBrewCommad";
	            $.ajax({
	              type: 'POST',
	              url: url,
	              dataType: "json",
	              data: {
	                machineId:brewObject.getMachineId(),
	                order_voucher_id:orderId+""
	              },
	              success: function(data){
	                loading(false);
	                $(".finish").addClass("finish-block");
	                if(data.jSONObject.result_code!=0){
	                  alert(data.jSONObject.result_msg);
	                }
	              }
	            });
	        }
	    }
	  });
	}

/***/ }
/******/ ]);