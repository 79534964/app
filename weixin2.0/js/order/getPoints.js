//如果为空添加默认动画
module.exports=function(str1,str2){
    return "<img class='points-ani' src='http://test.wx.mattburg.cn/jeewxmb/webpage/extend/images/icon-ani.png'>"+
           "<img class='points-img' src='http://test.wx.mattburg.cn/jeewxmb/webpage/extend/images/icon.png'>"+
           "<span class='points'>"+str1+"</span>"+
           "<a href='http://test.wx.mattburg.cn/jeewxmb/webpage/extend/productList.html' class='points-a'>"+str2+"</a>";
}