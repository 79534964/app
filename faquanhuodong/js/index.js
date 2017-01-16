$(document).ready(function () {
    var data = {
        options: {
            countNodes: $('#count'),
            luckyNdes: $('#lucky'),
            period: $('#period'),
            submitNode: $('#submit')
        },
        init: function (json) {
            data.countInit(json);
            data.luckyInit(json);
            data.periodInit(json);
            data.options.submitNode.on('tap', function () {
                if (json.response.code == 100) {
                    ani.submitOk();
                } else if (json.response.code == 01) {
                    ani.prop('该活动不存哦');
                } else if (json.response.code == 02) {
                    ani.prop('活动暂未开始,敬请期待');
                } else if (json.response.code == 03) {
                    ani.prop('活动已经结束,请关注最新活动');
                } else if (json.response.code == 06) {
                    ani.prop('您已经参与过了,下次再来吧');
                } else if (json.response.code == 07) {
                    ani.prop('优惠券已抢完,下次继续努力');
                }
            });
            function getCookie(c_name) {
                if (document.cookie.length > 0) {
                    var c_start = document.cookie.indexOf(c_name + "=")
                    if (c_start != -1) {
                        c_start = c_start + c_name.length + 1
                        c_end = document.cookie.indexOf(";", c_start);
                        if (c_end == -1) c_end = document.cookie.length
                        return unescape(document.cookie.substring(c_start, c_end));
                    }
                }
                return ""
            }

            $('#dole').on('tap', function () {
                var phone = $(this).siblings()[0].value;
                if (/^1[34578]\d{9}$/.test(phone)) {
                    loadings(true);
                    $.ajax({
                        url: 'http://' + window.location.host + '/activity/share/sendcoupon?',
                        type: 'post',
                        dataType: 'json',
                        data: {
                            mobile: phone,
                            openid: json.openid,
                            groupid: json.coupongroup.groupid,
                            headimgurl: getCookie(json.openid)
                        },
                        success: function (data) {
                            loadings(false);
                            if (data.code == '01') {
                                var prizeNode = $('#prize');
                                prizeNode.find('.price').html('¥ ' + data.content.couponprice);
                                prizeNode.find('.name').html(data.content.couponname);
                                prizeNode.addClass('showprize');
                            } else {
                                alert(data.msg);
                            }
                        }
                    });
                } else {
                    ani.prop('请输入正确的手机号');
                }
            });
        },
        countInit: function (json) {
            data.options.countNodes.html('<p>' + json.coupongroup.groupname + ',每人限领一张</p>' +
                '<p>发放张数：' + json.totalcoupon + '&#12288;剩余张数：' + json.remaincounpon + '</p>' +
                '<div class="box">' +
                '<i></i>' +
                '</div>');
            data.options.countNodes.find('i').css({'width': (data.options.countNodes.find('.box').width() * (json.totalcoupon - json.remaincounpon) / (json.totalcoupon * 1)) + 'px'});
        },
        luckyInit: function (json) {
            var imgSrc;
            var html = "";
            $.each(json.coupongrouprecordlist, function (i, e) {
                imgSrc = e.userheadimgurl == null ? 'webapp/images/head.png' : e.userheadimgurl;
                html += '<div class="clearfix swiper-slide">' +
                    '<img src="' + imgSrc + '"/>' +
                    '<div>' +
                    '<p>' + e.usernickname + '</p>' +
                    '<p>' + e.couponname + '</p>' +
                    '<span>' + getTimeStr((new Date().getTime() - new Date(e.createtime.replace(/-/g, "/")).getTime()) / 1000) + '前</span>' +
                    '</div>' +
                    '</div>';
            });
            data.options.luckyNdes.find('.swiper-wrapper').html(html);
            function getTimeStr(seconds) {
                if (seconds > 60 * 60 * 24) {
                    return parseInt(seconds / (60 * 60 * 24)) + '天';
                } else if (seconds > 60 * 60) {
                    return parseInt(seconds / 3600) + '小时';
                } else if (seconds > 60) {
                    return parseInt(seconds / 60) + '分钟';
                } else {
                    return parseInt(seconds) + '秒';
                }
            }
        },
        periodInit: function (json) {
            var imgSrc;
            var html = '<div class="header clearfix">' +
                '<p>本期参与人</p>' +
                '<p>' + json.coupongroup.createtime + ' 开始</p>' +
                '</div>';
            html += '<div class="content">' +
                '<ul>';
            $.each(json.coupongrouprecordlist, function (i, e) {
                imgSrc = e.userheadimgurl == null ? 'webapp/images/head.png' : e.userheadimgurl;
                html += '<li class="clearfix">' +
                    '<img src="' + imgSrc + '"/>' +
                    '<div>' +
                    '<p>' + e.usernickname + '</p>' +
                    '<p>' + e.createtime + '</p>' +
                    '</div>' +
                    '</li>';
            });
            html += '</ul>' +
                '</div>';
            data.options.period.html(html);
        }
    }
    data.init(json);
    var ani = {
        options: {
            propNode: $('#prop'),
            footerNode: $("footer"),
            phoneSubmit: $("#phone"),
            ruleBtn: $("#ruleBtn"),
            ruleBox: $("#ruleBox"),
            removeRule: $("#removeRule")
        },
        prop: function (text) {
            ani.options.propNode.addClass('showProp').find('p').html(text);
            setTimeout(function () {
                ani.options.propNode.removeClass('showProp');
            }, 2000);
        },
        submitOk: function () {
            ani.options.footerNode.removeClass('showSubmit').addClass('removeSubmit');
            ani.options.phoneSubmit.removeClass('removeSubmit').addClass('showSubmit');
            ani.options.phoneSubmit.unbind('tap').on('tap', function (e) {
                if (e.target == this) {
                    ani.submitRemove();
                }
            });
        },
        submitRemove: function () {
            ani.options.footerNode.removeClass('removeSubmit').addClass('showSubmit');
            ani.options.phoneSubmit.removeClass('showSubmit').addClass('removeSubmit');
        },
        swiperInit: function () {
            ani.options.ruleBtn.on('tap', function () {
                ani.options.ruleBox.removeClass('removeRule').addClass('showRule');
            });
            ani.options.removeRule.on('tap', function () {
                ani.options.ruleBox.removeClass('showRule').addClass('removeRule');
            });
            new Swiper('.swiper-banner', {
                loop: false,
                autoplay: 2000,
                autoplayDisableOnInteraction: false
            });
            new Swiper('.swiper-container', {
                loop: true,
                direction: 'vertical',
                autoplay: 2000,
                autoplayDisableOnInteraction: false
            });
            window.onload=function(){
                new iScroll('scroller');
            };
            if (json.response.code == 01) {
                ani.prop('该活动不存哦');
            } else if (json.response.code == 02) {
                ani.prop('活动暂未开始,敬请期待');
            } else if (json.response.code == 03) {
                ani.prop('活动已经结束,请关注最新活动');
            } else if (json.response.code == 06) {
                ani.prop('您已经参与过了,下次再来吧');
            } else if (json.response.code == 07) {
                ani.prop('优惠券已抢完,下次继续努力');
            }
        }
    }
    ani.swiperInit();
    loadings(false);
});