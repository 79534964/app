 exports.getStatus=function(num){
    var str;
    switch(num){
       case "91":
        str="不在线";
        break;
       case "00":
        str="在线";
        break;
       case "02":
        str="缺水";
        break;
       case "03":
        str="断水";
        break;
       case "05":
        str="机器故障";
        break;
       case "08":
        str="正在制冰";
        break;
        case "13":
        str="缺奶";
        break;
       case "14":
        str="缺糖";
        break;
       case "15":
        str="缺香柚";
        break;
       case "16":
        str="缺奶茶";
        break;
       case "17":
        str="缺可可";
        break;
        case "18":
        str="缺香柚";
        break;
       case "19":
        str="缺料";
        break;
       case "20":
        str="缺咖啡豆";
        break;
    }
    return str;
}
//machineIco
exports.getMachineIco=function(num){
    var name;
    switch(num){
        case "10":
        name="上海码头";
        break;
        case "20":
        name="汉堡码头";
        break;
        case "30":
        name="伦敦码头";
        break;
        case "40":
        name="洛杉矶码头";
        break;
        case "50":
        name="悉尼码头";
        break;
    }
    return name;
}