module.exports=function(flag){
    var positionNode=$("#positionEntity");
    var backIcon=$("#back");
    if(flag){
        positionNode.removeClass("position-ani-remove").addClass("position-ani-add");
        backIcon.addClass("go").removeClass("back");
    }else{
        positionNode.removeClass("position-ani-add").addClass("position-ani-remove");
        backIcon.addClass("back").removeClass("go");
    }
}