function getProuctHtml(data,host){
    return "<div class='product-container swiper-slide2'>"+
            "<a href='"+host+data.productId+"' class='img-container'>"+
                "<img src='http://zjc.mattburg.cn/jeewxmb/webpage/extend/product-img/"+data.productId+".png'alt=''/><span>点击<br/>购买</span>"+
             "</a>"+
             "<div class='product-content clearfix'>"+
                 "<p class='name'>"+data.productName+"</p>"+
                 "<p class='ename'>"+data.productEname+"</p>"+
                 "<p class='price'>¥"+data.salesPrice+".00</p>"+
                 // "<p class='no-price'>¥"+data.price+".00<span></span></p>"+
             "</div>"+
           "</div>";
}
module.exports=function(data){
    var host="http://zjc.mattburg.cn/jeewxmb/productController.do?goCoffebyIdController&id=";
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
