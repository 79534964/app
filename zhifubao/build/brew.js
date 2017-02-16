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
	var addMachine=__webpack_require__(3);
	//全局数据对象
	var brewObject=__webpack_require__(4);
	//全局数据对象
	var sugar=__webpack_require__(10);
	//最后一步冲泡
	var submit=__webpack_require__(11);
	//最后一步提交的ajax
	var brewAjax=__webpack_require__(12);

	sucess=function(orderform,orderdetaile,product,machine,ordertype){
	    var product=product;
	    product.sugar_taste=product.sugar_taste.split(",");
	    brewObject.init(orderform,orderdetaile,product);
	    loading(false);
	    if(ordertype=="1"){
	      $(".container").css({'opacity':'1'});
	      header(product);
	      addMachine(machine);
	      sugar(product.sugar_taste);
	      submit();
	    }else{
	      brewAjax();
	    }
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

	//header
	module.exports=function(data){
	    $("#productBox").html(
	        "<div class='img-container'>"+
	            "<img src='http://org.oa.mattburg.cn/jeewxmb/webpage/extend/product-img/"+data.product_id+".png'alt=''/>"+
	        "</div>"+
	        "<div class='product-content clearfix'>"+
	            "<p class='name'>"+data.memo+"</p>"+
	            "<p class='ename'>"+data.product_ename+"</p>"+
	            "<p class='price'>￥"+data.sales_price+".00</p>"+
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

	module.exports=function(data){
	    if(brewObject.getMachineId()!=""){
	        entity(data);
	    }else{
	        noEntity();
	    }
	    productPosition(brewObject.getUserId());
	}
	//entity
	function entity(data){
	    var operatorId=data.operator_id;
	    var img=data.machine_ico+".png";
	    var imgPath="http://api.mattburg.cn/static/machineIco/"+operatorId+"/"+img;
	    $("#entity").html(
	        "<p class='title'>"+data.machine_number+"</p>"+
	        "<p class='entity-img'>"+
	            "<img src='"+imgPath+"' alt=''/>"+
	        "</p>"+
	        "<div class='entity-address'>"+
	            "<p class='entity-name'>"+machineData.getMachineIco(data.machine_ico)+"—"+data.machine_name+"</p>"+
	            "<p class='entity-number'>"+data.machine_address_detail+"</p>"+
	            "<p class='entity-adr'>"+data.machine_address+"</p>"+
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
	brewObject.prototype.init=function(orderform,orderdetaile,product){
	    this.setMachineId(orderform.machine_id);
	    this.setUserId(orderform.user_id);
	    this.setType(orderform.user_type);
	    this.setOrderPrice(orderform.order_price);
	    this.setOrdernumber(orderdetaile.order_form_id);
	    this.setMilkTaste(product.milk_taste);
	    if(product.sugar_taste.length>1){
	        this.setSugarTaste(product.sugar_taste[1]);
	    }else{
	        this.setSugarTaste(product.sugar_taste[0]);
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
	            if(navigator.userAgent.indexOf("AlipayClient")===-1){
	                machineAjax(latitude,longitude,userId,false);
	                $("#guide").addClass("guide-ani");
	            }else{
	                if((Ali.alipayVersion).slice(0,3)>=8.1){
	                    Ali.geolocation.getCurrentPosition({
	                        timeout: 5000 //超时时间
	                    }, function(result) {
	                        if(result.errorCode){
	                            machineAjax(latitude,longitude,userId,false);
	                            $("#guide").addClass("guide-ani");
	                        }else{
	                            //成功定位的情况
	                            latitude=result.coords.latitude;
	                            longitude=result.coords.longitude;
	                            machineAjax(latitude,longitude,userId,true);
	                        }
	                    });
	                }else{
	                    Ali.alert({
	                        title: '亲',
	                        message: '请升级您的钱包到最新版',
	                        button: '确定'
	                    });
	                }
	            }
	        }else{
	            showEntity(true);
	        }
	    });
	}
	function machineAjax(latitude,longitude,userId,flag){
	    $.ajax({
	        type:"GET",
	        url:"http://"+window.location.host+"/coffeealipay/Machine/machinelist?userid="+userId+"&longitude="+longitude+"&latitude="+latitude,
	        dataType:"text",
	        success:function(data){
	            eval("var data="+data);
	            $("#positionEntity").height($(window).height());
	            setshowEntity($("#myEntity"),data.mymaclist);
	            new iScroll('wrapper1');
	            if(data.mymaclist.length<=0){
	                $("#myEntity").append("<div class='guide-text'>您还未使用过机器～</div>");
	            }
	            setshowEntity($("#nearEntity"),data.mynearmaclist);
	            new iScroll('wrapper2');
	            if(data.mynearmaclist.length<=0&&flag){
	                $("#nearEntity").append("<div class='guide-text'>您距离我们的机器过远～</div>");     
	            }
	            if(data.mymaclist.length<=0){
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
	        if(e.machine_name.indexOf("CS")==-1){
	            if(e.enabled_flag==1&&e.flag==0){
	                var str="id="+e.id+" title="+e.machine_number+" name="+machineData.getMachineIco(e.machine_ico)+"—"+e.machine_name+" num="+e.machine_address_detail+" adr="+e.machine_address+" img="+imgPath+e.operator_id+"/"+e.machine_ico+".png"+" status="+e.status;
	                if(e.status=="00"){
	                    html+="<li class='entity-box'"+str+">";
	                }else{
	                    html+="<li class='entity-box background'"+str+">"; 
	                }
	                if(e.distence*1>30000){
	                    e.distence="未知";
	                }
	                html+="<p class='entity-title'>"+e.machine_number+"</p>"+
	                    "<div class='entity-con'>"+
	                        "<img src='"+imgPath+e.operator_id+"/"+e.machine_ico+".png"+"' alt=''/>"+
	                        "<div class='content'>"+
	                            "<p class='status'>"+machineData.getStatus(e.status)+"</p>"+
	                            "<div class='icon'>"+
	                                "<p><img src='http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/position-img.png'/></p>"+
	                                "<span>距您"+e.distence+"m</span>"+
	                            "</div>"+
	                            "<span class='name'>"+machineData.getMachineIco(e.machine_ico)+"—"+e.machine_name+"</span>"+
	                            "<span class='address'>"+e.machine_address_detail+"</span>"+
	                            "<span>"+e.machine_address+"</span>"+
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
	            brewObject.setMachineId($(this).attr("id"));
	            $.ajax({
	                type:"POST",
	                url:"http://"+window.location.host+"/coffeealipay/Machine/addmymachine",
	                dataType:"json",
	                data:{
	                    userid:brewObject.getUserId(),
	                    machineid:brewObject.getMachineId()
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
	//全局数据对象
	var brewObject=__webpack_require__(4);
	//最后一步提交的ajax
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
	  $.ajax({
	      type: 'POST',
	      url: "http://"+window.location.host+"/coffeealipay/brew",
	      dataType: "json",
	      data: {
	        machineid:brewObject.getMachineId(),
	        orderfromid:brewObject.getOrdernumber(),
	        sugartaste:brewObject.getSugarTaste(),
	        milktaste:brewObject.getMilkTaste(),
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

/***/ }
/******/ ]);