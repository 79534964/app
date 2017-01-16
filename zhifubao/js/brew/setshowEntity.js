//loading组件
var loading=require('./loading');
//后端对应的数字字典
var machineData=require('./machineData');
//点击每一个地址像后端传值的组件
var machineAjax=require('./machineAjax');

module.exports=function(node,datas){
    var imgPath="http://api.mattburg.cn/static/machineIco/";
    var html="<ul>";
    $.each(datas,function(i,e){
        if(e.machine_name.indexOf("CS")==-1){
            if(e.enabled_flag==1&&e.flag==0){
                var str="id="+e.id+" title="+e.machine_number+" name="+machineData.getMachineIco(e.machine_ico)+"—"+e.machine_name+" num="+e.machine_address_detail+" adr="+e.machine_address+" img="+imgPath+e.operator_id+"/"+e.machine_ico+".png"+" status="+e.status;
                if(e.status=="00"){
                    html+="<li class='entity-box'"+str+">";
                }else{
                    html+="<li class='entity-box background'"+str+">"; 
                }
                if(e.distence*1>30000){
                    e.distence="未知";
                }
                html+="<p class='entity-title'>"+e.machine_number+"</p>"+
                    "<div class='entity-con'>"+
                        "<img src='"+imgPath+e.operator_id+"/"+e.machine_ico+".png"+"' alt=''/>"+
                        "<div class='content'>"+
                            "<p class='status'>"+machineData.getStatus(e.status)+"</p>"+
                            "<div class='icon'>"+
                                "<p><img src='http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/position-img.png'/></p>"+
                                "<span>距您"+e.distence+"m</span>"+
                            "</div>"+
                            "<span class='name'>"+machineData.getMachineIco(e.machine_ico)+"—"+e.machine_name+"</span>"+
                            "<span class='address'>"+e.machine_address_detail+"</span>"+
                            "<span>"+e.machine_address+"</span>"+
                        "</div>"+
                    "</div>"+
                  "</li>";
            } 
        }
    });
    html+="</ul>";
    node.append(html);
    var showNode=$(".tab-box").children();
    $(".nav-box").children().on("tap",function(){
        $(this).addClass('cur').siblings().removeClass('cur');
        showNode.eq($(this).index()).addClass("position-left-go").siblings().removeClass("position-left-go").addClass("position-left-back");
    });
    machineAjax(node.find("li"));
}