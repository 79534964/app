// loading组件
var loading=require('./loading');
// 优惠劵区域
var reBenefit=require('./reBenefit');
//全局数据对象
var payObject=require('./dataObj');

module.exports=function(){
    if(payObject.getMachineId()!=='') {
        loading(true);
        $.ajax({
            type:'POST',
            url:'http://test.wx.mattburg.cn/coffeeservice/product/getProdcutInfo',
            dataType:"json",
            data:{
                productId:payObject.getProductId(),
                machineId:payObject.getMachineId()
            },
            success: function(data){
                payObject.setProductPrice(data.content.salesPrice);
                $('#productPrice').text('￥'+data.content.salesPrice+'.00');
                reBenefit();
                loading(false);
            }
        });
    }
}