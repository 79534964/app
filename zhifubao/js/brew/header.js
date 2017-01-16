//header
module.exports=function(data){
    $("#productBox").html(
        "<div class='img-container'>"+
            "<img src='http://org.oa.mattburg.cn/jeewxmb/webpage/extend/product-img/"+data.id+".png'alt=''/>"+
        "</div>"+
        "<div class='product-content clearfix'>"+
            "<p class='name'>"+data.memo+"</p>"+
            "<p class='ename'>"+data.product_ename+"</p>"+
            "<p class='price'>￥"+data.sales_price+".00</p>"+
            "<p class='no-price'>￥"+data.price+".00<span></span></p>"+
        "</div>"
    );
}