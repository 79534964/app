//如果为空添加默认动画
module.exports=function(str1,str2){
    return "<img class='points-ani' src='http://zjc.mattburg.cn/jeewxmb/webpage/extend/images/icon-ani.png'>"+
           "<img class='points-img' src='http://zjc.mattburg.cn/jeewxmb/webpage/extend/images/icon.png'>"+
           "<span class='points'>"+str1+"</span>"+
           "<a href='http://zjc.mattburg.cn/jeewxmb/webpage/extend/productList.html' class='points-a'>"+str2+"</a>";
}