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