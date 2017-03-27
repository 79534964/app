//loading组件
var loading = require('./loading');

module.exports = function () {
    $('#convert').on('click', function () {
        var value = $('#convertInput').val();
        if (value) {
            loading(true);
            $.ajax({
                type: 'POST',
                url: 'http://zjc.mattburg.cn/activity/couponcode/setcouponcode',
                dataType: "json",
                data: {
                    couponCode: $('#convertInput').val(),
                    userId: window.openId,
                    appType: 'H5',
                    userType: 2
                },
                success: function (data) {
                    loading(false);
                    if (data.code == 01) {
                        alert('领取成功!');
                        window.location.href = "http://org.oa.mattburg.cn/jeewxmb/productController.do?toCoupon";
                    } else {
                        alert(data.msg);
                    }
                }
            });
        } else {
            alert('请输入兑换码!');
        }

    });
}