//全局数据对象
var payObject=require('./dataObj');
//弹出选机器的页面组件
var productPosition=require('./productPosition');
//后端对应的数字字典
var machineData=require('./machineData');

module.exports=function(data){
    if(payObject.getMachineId()!=""){
        entity(data[1].machineEntity);
    }else{
        noEntity();
    }
    productPosition(payObject.getUserId());
}
//entity
function entity(data){
    var operatorId=data.operatorId;
    var img=data.machineIco+".png";
    var imgPath="http://api.mattburg.cn/static/machineIco/"+operatorId+"/"+img;
    $("#entity").html(
            "<p class='title'>"+data.machineNumber+"</p>"+
            "<p class='entity-img'>"+
                // "<img src='"+imgPath+"' alt=''/>"+
                "<img src='http://zjc.mattburg.cn/jeewxmb/webpage/extend/images/pay-logo.png' alt=''/>"+
            "</p>"+
            "<div class='entity-address'>"+
                // "<p class='entity-name'>"+getMachineIco(data.machineIco)+"—"+data.machineName+"</p>"+
                "<p class='entity-name'>北京辛蒂("+data.machineName+")</p>"+
                "<p class='entity-number'>"+data.machineAddressDetail+"</p>"+
                "<p class='entity-adr'>"+data.machineAddress+"</p>"+
            "</div>"
    );
}
//noEntity
function noEntity(){
    $("#entity").html(
        "<p class='no-entity'>请选择冲泡地址~</p>"
    );
}