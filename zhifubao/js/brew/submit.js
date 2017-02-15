//loading组件
var loading=require('./loading');
//全局数据对象
var brewObject=require('./dataObj');
//最后一步提交的ajax
var brewAjax=require('./brewAjax');

module.exports=function(){
  var flag=true;
  $("#payBtn").on("tap",function(){
    if(flag){
      flag=false;
      loading(true);
      brewAjax();
    }
  });
}