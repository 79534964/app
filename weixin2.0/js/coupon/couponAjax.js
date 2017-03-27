//loading组件
var loading = require('./loading');
module.exports = function (nodes, couponOffList) {
    nodes.on('click', function () {
        var node = $(this).find(".rob");
        if (node.attr("class").indexOf("y") != -1) {
            loading(true);
            var coupon_rule_id = couponOffList[node.attr("index")].id;
            var url = "http://org.oa.mattburg.cn/jeewxmb/productController.do?getCouponOff&" + 'openId=' + openId + '&coupon_rule_id=' + coupon_rule_id;
            $.ajax({
                type: 'GET',
                url: url,
                dataType: "json",
                success: function (data) {
                    loading(false);
                    alert(data[0].msg);
                    if (data[0].msg.indexOf("成功") != -1) {
                        window.location.href = "http://org.oa.mattburg.cn/jeewxmb/productController.do?toCoupon";
                    }
                }
            });
        } else {
            alert("抢券时间未到,请您稍后!");
        }
    });
}