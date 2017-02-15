//如果为空添加默认动画组件
var getPoints=require('./getPoints');
module.exports=function(data1,data2){
    wait(data1);
    brew(data2);
}
function wait(data){
    var url;
    var html="";
    var imgUrl;
    $.each(data,function(i,e){
        imgUrl="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/product-img/order-img/"+e.product_id+".png";
        url = "http://"+window.location.host+"/coffeealipay/pay?machineId="+e.machine_id+"&productId="+e.product_id+"&ordernumber="+e.ordernumber;
        html+="<div class='product-container swiper-slide2'>"+
            "<div class='header'>"+"订单编号:"+e.ordernumber+"</div>"+
            "<div class='content clearfix'>"+
                "<a href='"+url+"'class='btn'>支 付</a>"+
                "<div class='img-box'>"+
                    "<img src='"+imgUrl+"' alt=''/>"+
                    "<p>"+e.product_name+"</p>"+
                "</div>"+
                "<div class='introduce'>"+
                    "<p class='time'>下单时间: "+e.create_time+"</p>"+
                    "<p class='one-price'>商品单价: "+e.product_price.toFixed(2)+"元(1份,未支付)</p>"+
                    "<p class='price'>实付:￥"+e.product_pay_price.toFixed(2)+"</p>"+
                "</div>"+
            "</div>"+
        "</div>";
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
    var brewHtml="";
    var alreadyBrewHtml="";
    $.each(data,function(i,e){
        imgUrl="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/product-img/order-img/"+e.product_id+".png";
        url="http://"+window.location.host+"/coffeealipay/brew/getbrewinfo?ordernumber="+e.ordernumber+"&ordertype=1&uid="+e.user_id;
        if(e.status=="20"||e.status=="30"){
            brewHtml+="<div class='product-container swiper-slide2'>"+
                "<div class='header'>"+"订单编号:"+e.ordernumber+"</div>"+
                "<div class='content clearfix'>"+
                    "<a href='"+url+"'class='btn'>冲 泡</a>"+
                    "<div class='img-box'>"+
                        "<img src='"+imgUrl+"' alt=''/>"+
                        "<p>"+e.product_name+"</p>"+
                    "</div>"+
                    "<div class='introduce'>"+
                        "<p class='time'>下单时间: "+e.create_time+"</p>"+
                        "<p class='one-price'>商品单价: "+e.product_price.toFixed(2)+"元(1份,未冲泡)</p>"+
                        "<p class='price'>实付:￥"+e.product_pay_price.toFixed(2)+"</p>"+
                    "</div>"+
                "</div>"+
            "</div>";
        }else if(e.status=="50"){
            alreadyBrewHtml+="<div class='product-container swiper-slide2'>"+
            "<div class='header'>"+"订单编号:"+e.ordernumber+"</div>"+
            "<div class='content clearfix'>"+
                "<div class='img-box'>"+
                    "<img src='"+imgUrl+"' alt=''/>"+
                    "<p>"+e.product_name+"</p>"+
                "</div>"+
                "<div class='introduce'>"+
                    "<p class='time'>下单时间: "+e.create_time+"</p>"+
                    "<p class='one-price'>商品单价: "+e.product_price.toFixed(2)+"元(1份,已冲泡)</p>"+
                    "<p class='price'>实付:￥"+e.product_pay_price.toFixed(2)+"</p>"+
                "</div>"+
            "</div>"+
            "</div>";
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