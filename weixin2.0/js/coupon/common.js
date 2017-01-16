//如果为空添加默认动画
exports.getPoints=function(str1,str2){
    return "<img class='points-ani' src='http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/icon-ani.png'>"+
           "<img class='points-img' src='http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/icon.png'>"+
           "<span class='points'>"+str1+"</span>"+
           "<span class='points' style='font-size:0.3rem;'>"+str2+"</span>";
}
//再最后添加动画
exports.getLoadNodeHtml=function(){
    return "<i class='swiper-slide2 load-node'><img src='http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/load-node.png'/><p>正在加载</p></i>";
}
//遍历输出
exports.setData=function(e,flag){
    if(flag){
        var imgSrc="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/";    
    }else{
        var imgSrc="http://org.oa.mattburg.cn/jeewxmb/webpage/extend/images/n";
    }
    var imgName;
    var name;
    var html;
    if(e.priceType==1){
        name=e.ruleName;
        if(e.couponPrice*1>5||e.couponPrice*1==1){
            imgName=99;
        }else{
            imgName=e.couponPrice;
        }
    }else if(e.priceType==2){
        if(e.couponPrice!=50&&e.couponPrice!=100){
            imgName=99;
            name=e.couponPrice+"%OFF";
        }else{
            imgName=e.couponPrice;
            name=e.ruleName;
        }
    }
    html="<div class='swiper-slide2 product-container'>"+
            "<div class='img-container'>"+
                "<img src='"+imgSrc+imgName+".png"+"'alt=''/>"+
                "<p>"+name+"</p>"+
             "</div>"+
          "</div>";
     return html;
}
exports.getPoints