//loading组件
var loading=require('./brew/loading');
//头部产品组件
var header=require('./brew/header');
//选机器部分组件
var addMachine=require('./brew/machine');
//全局数据对象
var brewObject=require('./brew/dataObj');
//全局数据对象
var sugar=require('./brew/sugar');
//最后一步冲泡
var submit=require('./brew/submit');
//最后一步提交的ajax
var brewAjax=require('./brew/brewAjax');

sucess=function(orderform,orderdetaile,product,machine,ordertype){
    var product=product;
    product.sugar_taste=product.sugar_taste.split(",");
    brewObject.init(orderform,orderdetaile,product);
    header(product);
    addMachine(machine);
    sugar(product.sugar_taste);
    submit();
    loading(false);
}