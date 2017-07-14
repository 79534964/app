module.exports=function(){
    $("img").error(function(){
        $(this).attr("src","http://test.wx.mattburg.cn/jeewxmb/webpage/extend/images/takePlace.png");
    });
}