//全局数据对象
var brewObject=require('./dataObj');
module.exports=function(data){
    var boxNode=$("#sugar");
    if(data.length==1){
        boxNode.html("<li sugarTaste='"+data[0]+"' class='highcur one'>标准</li>");
    }else{
        boxNode.html("<li sugarTaste='"+data[0]+"' name='none' class='none'>无糖</li>"+
                     "<li sugarTaste='"+data[1]+"' name='low' class='lowcur'>低糖</li>"+
                     "<li sugarTaste='"+data[2]+"' name='high' class='high'>高糖</li>");
    }   
    boxNode.children().on("tap",function(){
        var obj=$(this);
        var className=obj.attr("class");
        if(className.indexOf("cur")==-1){
            brewObject.setSugarTaste(obj.attr("sugarTaste"));
            obj.attr("class",className+"cur");
            $.each(obj.siblings(),function(i,e){
                var classname=e.className;
                if(classname.indexOf("cur")!=-1){
                    e.className=e.getAttribute("name");
                }
            });
        }
    });
}