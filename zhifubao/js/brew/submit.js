//loading组件
var loading=require('./loading');
//全局数据对象
var brewObject=require('./dataObj');
//最后一步提交的ajax
var brewAjax=require('./brewAjax');

module.exports=function(){
  $("#payBtn").on("tap",function(){
      loading(true);
      brewAjax();
  });
}