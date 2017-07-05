//header
module.exports=function(data){
    $("#productBox").html(
        "<div class='img-container'>"+
            "<img src='http://test.wx.mattburg.cn/jeewxmb/webpage/extend/product-img/"+data.productId+".png'alt=''/>"+
        "</div>"+
        "<div class='product-content clearfix'>"+
            "<p class='name'>"+data.productName+"</p>"+
            "<p class='ename'>"+data.productEname+"</p>"+
            "<p class='price' id='productPrice'>￥"+data.salesPrice+".00</p>"+
            "<p class='no-price'>￥"+data.price+".00<span></span></p>"+
        "</div>"
    );
}