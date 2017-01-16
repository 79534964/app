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