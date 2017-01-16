//全局数据对象
var payObject=require('./dataObj');

function sortArr(list){
        var arr=list;
        for(var i=0,len=arr.length;i<len;i++){
            for(var j=0;j<len-i-1;j++){
                if(arr[j].couponPrice<arr[j+1].couponPrice){
                    var obj=arr[j];
                    arr[j]=arr[j+1];
                    arr[j+1]=obj;
                }
            }
        }
        return arr;
}
module.exports=function(data){
    if(data[2].productEntity.noCouponFlag==0){
        var arr=sortArr(data[4].couponVoList);
        if(data[3].machineFavourable.length>0){
            arr=(data[3].machineFavourable).concat(arr);
        }
        payObject.setCouponArr(arr);
    }
};