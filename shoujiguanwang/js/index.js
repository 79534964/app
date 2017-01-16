$(document).ready(function(){
    var _flag=true;
    //内容对象
    function contentBox(){
        this.node=$("#contentBox");
        this.node1=$("#indexBox");
    }
    contentBox.prototype.go=function(){
        this.node.removeClass("content-box-back").addClass("content-box-go");
        this.node1.removeClass("index-box-go").addClass("index-box-back");
    }
    contentBox.prototype.back=function(){
        this.node.removeClass("content-box-go").addClass("content-box-back");
        setTimeout(function(){
            window.scrollTo(0,0);
        },500);
        this.node1.removeClass("index-box-back").addClass("index-box-go");
    }
    var content=new contentBox();
    //回退图标对象
    function backIcon(){
        this.node=$("#backIcon");
        this.init();
    }
    backIcon.prototype.go=function(){
        this.node.removeClass("back-icon-back").addClass("back-icon-go");
    }
    backIcon.prototype.back=function(){
        this.node.removeClass("back-icon-go").addClass("back-icon-back");
    }
    backIcon.prototype.init=function(){
        var o=this;
        this.node.on("tap",function(){
            content.back();
            indexObject.back();
            aboutObject.back();
            cooperateObject.back();
            callObject.back();
            o.back();
        });
    }
    var back=new backIcon();
    //首页动画对象
    function indexContent(){
        this.node=$("#indexContent");
    }
    indexContent.prototype.go=function(){
        this.node.addClass("index-ani").css("display","block");
    }
    indexContent.prototype.back=function(){
        var o=this;
        this.node.removeClass("index-ani");
        setTimeout(function(){
            _flag=true;
            o.node.css("display","none");
        },500);
    }
    var indexObject=new indexContent();

    //关于我们页面对象
    function aboutContent(){
        this.node=$("#aboutContent");
    }
    aboutContent.prototype.go=function(){
        this.node.addClass("about-ani").css("display","block");
    }
    aboutContent.prototype.back=function(){
        var o=this;
        this.node.removeClass("about-ani");
        setTimeout(function(){
            o.node.css("display","none");
        },500);
    }
    var aboutObject=new aboutContent();
    //加盟页面对象
     function cooperateContent(){
        this.node=$("#cooperateContent");
    }
    cooperateContent.prototype.go=function(){
        this.node.addClass("cooperate-ani").css("display","block");
    }
    cooperateContent.prototype.back=function(){
        var o=this;
        this.node.removeClass("cooperate-ani");
        setTimeout(function(){
            o.node.css("display","none");
        },500);
    }
    var cooperateObject=new cooperateContent();
    //联系页面对象
     function callContent(){
        this.node=$("#callContent");
    }
    callContent.prototype.go=function(){
        this.node.addClass("call-ani").css("display","block");
    }
    callContent.prototype.back=function(){
        var o=this;
        this.node.removeClass("call-ani");
        setTimeout(function(){
            o.node.css("display","none");
        },500);
    }
    var callObject=new callContent();
    $("#indexBox .cur").on("tap",function(){
        if(_flag){
            _flag=false;
            if($(this).index()==0){
                indexObject.go();
            }else if($(this).index()==2){
                aboutObject.go();
            }else if($(this).index()==4){
                cooperateObject.go();
            }else{
                callObject.go();
            }
            content.go();
            back.go();
        }
    });
    $(".skip").on("tap",function(){
        $(this).addClass("skip-ani");
    });
});