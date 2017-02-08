//loading组件
var loading=require('./loading');
//冲泡请求
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