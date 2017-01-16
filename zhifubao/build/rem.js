(function(){
    function w() {
        var r = document.documentElement;
        var a = r.getBoundingClientRect().width;
        if (a > 750 ){
            a = 750;
        }else if(a <320){
            a=320;
        }
        //750/w = 100/font-size
        rem = a / 7.5;
        r.style.fontSize = rem + "px"
    }
    var t;
    w();
    window.addEventListener("resize", function() {
        clearTimeout(t);
        t = setTimeout(w, 300)
    }, false);
})();
(function(){
    function hengshuping(){
        if(window.orientation==90||window.orientation==-90){
            alert("为了给您更好的服务,请您竖屏!");
        }
    }
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);
})();