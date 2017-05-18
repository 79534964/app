//loading组件
var loading=require('./brew/loading');
//头部产品组件
var header=require('./brew/header');
//选机器部分组件
var machine=require('./brew/machine');
//全局数据对象
var brewObject=require('./brew/dataObj');
//全局数据对象
var sugar=require('./brew/sugar');
//最后一步冲泡
var submit=require('./brew/submit');
sucess=function(json,type){
    var data=json;
    data.productEntity.sugarTaste=data.productEntity.sugarTaste.split(",");
    brewObject.init(data);
    $(document).ready(function(){
       header(data.productEntity);
       machine(data,type);
       sugar(data.productEntity.sugarTaste);
       submit();
       loading(false);
    });
}
