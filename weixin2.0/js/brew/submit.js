//loading组件
var loading=require('./loading');
//冲泡请求
var brewAjax=require('./brewAjax');

module.exports=function(){
  $("#payBtn").on("tap",function(){
      loading(true);
      brewAjax();
   });
 }