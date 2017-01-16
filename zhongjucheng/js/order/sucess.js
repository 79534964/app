//如果为空添加默认动画组件
var getPoints=require('./getPoints');
module.exports=function(data1,data2){
    wait(data1);
    brew(data2);
}
function wait(data){
    var appid="wx63a8157a0e186ec5";
    var orderPrice;
    var orderNumber;
    var redirect_uri;
    var url;
    var html="";
    var imgUrl;
    var payNum;
    $.each(data,function(i,e){
        if(i<30){
            orderNumber=(e.createTime+"")+(e.id+"");
            payNum=(e.createTime+e.id)+"";
            orderPrice=(e.productPayPrice.toFixed(2))+"";
            imgUrl="http://zjc.mattburg.cn/jeewxmb/webpage/extend/product-img/order-img/"+e.productId+".png";
            redirect_uri = encodeURIComponent('http://zjc.mattburg.cn/jeewxmb/wXPayController.do?pay&userId=' + e.userId +"&orderNumber=" + payNum + "&orderPrice=" + orderPrice + "&machineId=" + e.machineId + "&productId=" +e.productId+"&orderType=normalOrder");
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
    var brewHtml="";
    var orderPrice;
    var alreadyBrewHtml="";
    var brewIndex=0;
    var alreadyBrewIndex=0;
    $.each(data,function(i,e){
        orderNumber=(e.createTime+"")+(e.id+"");
        payNum=(e.createTime+e.id)+"";
        orderPrice=(e.productPayPrice.toFixed(2))+"";
        imgUrl="http://zjc.mattburg.cn/jeewxmb/webpage/extend/product-img/order-img/"+e.productId+".png";
        url='http://zjc.mattburg.cn/jeewxmb/productController.do?paySucess&' + 'userId='+e.userId+'&orderNumber='+payNum+'&orderPrice='+orderPrice+'&machineId='+e.machineId+'&productId='+e.productId+'&type=1' + '&orderType=normalOrder';
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
    return "<i class='swiper-slide2 load-node'><img src='http://zjc.mattburg.cn/jeewxmb/webpage/extend/images/load-node.png'/><p>正在加载</p></i>";
}