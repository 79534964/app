//全局数据对象
var brewObject=require('./dataObj');
//弹出选机器的页面组件
var productPosition=require('./productPosition');
//后端对应的数字字典
var machineData=require('./machineData');

module.exports=function(data){
    if(brewObject.getMachineId()!=""){
        entity(data);
    }else{
        noEntity();
    }
    productPosition(brewObject.getUserId());
}
//entity
function entity(data){
    var operatorId=data.operator_id;
    var img=data.machine_ico+".png";
    var imgPath="http://api.mattburg.cn/static/machineIco/"+operatorId+"/"+img;
    $("#entity").html(
        "<p class='title'>"+data.machine_number+"</p>"+
        "<p class='entity-img'>"+
            "<img src='"+imgPath+"' alt=''/>"+
        "</p>"+
        "<div class='entity-address'>"+
            "<p class='entity-name'>"+machineData.getMachineIco(data.machine_ico)+"—"+data.machine_name+"</p>"+
            "<p class='entity-number'>"+data.machine_address_detail+"</p>"+
            "<p class='entity-adr'>"+data.machine_address+"</p>"+
       "</div>"
    );
}
//noEntity
function noEntity(){
    $("#entity").html(
        "<p class='no-entity'>请选择冲泡地址~</p>"
    );
}