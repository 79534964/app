//公共方法组件
var common = require('./common');
module.exports = function (data) {
    var inpuHtml = "<div class='swiper-slide2 product-container convert'>" +
        "<div class='input'>" +
        "<input type='text' id='convertInput' placeholder='请输入兑换码' maxlength='8'>" +
        "<div class='btn' id='convert'>兑换</div>" +
        "</div>" +
        "</div>";
    var notUsedHtml = "";
    var alreadyUsedHtml = "";
    var notUsedIndex = 0;
    var alreadyUsedIndex = 0;
    $.each(data, function (i, e) {
        if (e.couponStatus == 0) {
            if (++notUsedIndex < 30) {
                notUsedHtml += common.setData(e, e.couponStatus, true);
            }
        } else if (e.couponStatus == 1 || e.couponStatus == 2) {
            if (++alreadyUsedIndex < 30) {
                alreadyUsedHtml += common.setData(e, e.couponStatus, false);
            }
        }
    });
    if (notUsedHtml != "") {
        notUsedHtml += common.getLoadNodeHtml();
        $("#notUsed").html(inpuHtml + notUsedHtml);
    } else {
        $("#notUsed").html(inpuHtml + common.getPoints("没有可用的优惠券", "(请关注抢卷活动)"));
    }
    if (alreadyUsedHtml != "") {
        alreadyUsedHtml += common.getLoadNodeHtml();
        $("#alreadyUsed").html(alreadyUsedHtml);
    } else {
        $("#alreadyUsed").html(common.getPoints("没有已使用的优惠券", "(请关注抢卷活动)"));
    }
}