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
//冲泡请求
var brewAjax=require('./brew/brewAjax');

sucess=function(json,type){
    var data=json;
    data.productEntity.sugarTaste=data.productEntity.sugarTaste.split(",");
    brewObject.init(data,type);
    $(document).ready(function(){
       loading(false);
       header(data.productEntity);
       machine(data,type);
       sugar(data.productEntity.sugarTaste);
       submit();
       if(type=="1"){
          $(".container").css({'opacity':'1'});
       }else{
          brewAjax();
       }
    });
}
