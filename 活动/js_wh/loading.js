(function(){
    function load(){
        this.container=document.createElement("div");
        this.canvBox=document.createElement("div");
        this.canv=document.createElement("canvas");
        this.init();
    }
    load.prototype.init=function(){
        this.container.setAttribute("style","position:fixed;width:100%;height:100%;z-index:100;top:0;max-width:750px");
        this.canvBox.setAttribute("style","position:absolute;top:3.75rem;left:50%;width:1.4rem;height:1.4rem;margin-left:-0.7rem;background-color:rgba(0,0,0,.7);border-radius: 10%;");
        this.canv.setAttribute("style","position:absolute;top:2.95rem;left:50%;width:5rem;margin-left:-1.49rem;z-index:10;");
        this.canv.setAttribute("id","loading");
        this.container.appendChild(this.canv);
        this.container.appendChild(this.canvBox);
        document.body.appendChild(this.container);
    }

    function isEmpty(obj){
        var name;
        for(name in obj){
            return false;
        }
        return true;
    }
    function loading(arg){
        this.init(arg);
    }
    loading.prototype = {
        constructor:loading,
        init: function (arg) {
            var isConsist = !isEmpty(arg);
            this.block = isConsist ? arg.block ? arg.block : 12 : 12;
            this.height = isConsist ? arg.height ? arg.height : 15 : 15;
            this.width = isConsist ? arg.width ? arg.width : 3.5 : 3.5;
            this.time = isConsist ? arg.time ? arg.time : 50 : 50;
            
            this.cvs = document.getElementById(arg.id),
            this.ctx = this.cvs.getContext("2d");
            this.ctx.width = this.height*6;
            this.ctx.height = this.height*6;
            
            this.ctx.translate(this.ctx.width, this.ctx.height);
            var radius = 2;
            this.view(radius);
        },
        loop: function(alpha){
            this.ctx.rotate(Math.PI*2/this.block);
            this.ctx.beginPath();
            this.ctx.fillStyle = "rgba(255,255,255,"+alpha+")";
            this.ctx.arc(0, this.ctx.width/2-this.height*2,this.width/2, 0 ,Math.PI, true);
            this.ctx.arc(0, this.ctx.width/2-this.height, this.width/2, Math.PI, 0, true);
            this.ctx.closePath();
            this.ctx.fill();
        },
        view: function(radius){
            var that = this;
            this.ctx.rotate(Math.PI*2/this.block);
            for(var i = 1; i <= this.block; i ++){
                this.loop(i/this.block);
            }
            setTimeout(function(){
                that.ctx.clearRect(-that.ctx.width/2, -that.ctx.height/2, that.ctx.width, that.ctx.height);
                radius >= that.block? radius = 1:radius += 1;
                that.view(radius);
            }, that.time);
        }
    }
    new load().init();
    new loading({"id":"loading"});
    var node=document.getElementById('loading').parentNode;
    loadings=function(flag){
        if(flag){
            node.style.display="block";
        }else{
            node.style.display="none";
        }
    }
})();