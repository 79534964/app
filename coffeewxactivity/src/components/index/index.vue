<template>
  <div class="wrapper">
    <phone ref="phoneNode" @success="success"></phone>
    <coupon ref="couponNode"></coupon>
    <rule ref="ruleNode"></rule>
    <div class="rule" @click="$refs.ruleNode.open()">
      <img src="./rule.png"/>
    </div>
    <div class="header">
      <img v-if="info && info.img" :src="info.img"/>
    </div>
    <count ref="countNode"></count>
    <lucky ref="luckyNode"></lucky>
    <period ref="periodNode"></period>
    <div class="submit">
      <mt-button @click="submit()">立即参与</mt-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Toast, Button} from 'mint-ui';
  import {userTypeMixin} from '@/common/js/mixins';
  import rule from './rule/rule';
  import phone from './phone/phone';
  import count from './count/count';
  import lucky from './lucky/lucky';
  import period from './period/period';
  import coupon from './coupon/coupon';

  export default {
    name: 'index',
    mixins: [userTypeMixin],
    data() {
      return {};
    },
    methods: {
      checkToken() {
        this.$store.dispatch('weiXin/act/SHARE', {
          Vue: this,
          title: this.info.shareTitle,
          desc: this.info.shareContent
        });
        if (this.info.endTime < new Date().getTime() / 1000) {
          // 表示活动时间结束
          Toast('该活动已经结束');
          return false;
        }
        if (this.info.startTime > new Date().getTime() / 1000) {
          // 表示活动暂未开始
          Toast('该活动暂未开始');
          return false;
        }
        if (this.info.totalCoupon < this.info.usedCounpon) {
          // 表示没有可领优惠券
          Toast('该活动没有可领取的优惠券');
          return false;
        }
        return true;
      },
      submit() {
        if (this.checkToken()) {
          if (this.userInfo.mobile) {
            this.$store.dispatch('index/act/COUPONS', {Vue: this, phone: this.userInfo.mobile, code: ''}).then(() => {
              this.success();
            });
          } else {
            this.$refs.phoneNode.open();
          }
        }
      },
      success() {
        this.$refs.couponNode.open();
      }
    },
    created() {
      this.$store.dispatch('common/act/LOADING', {loading: true});
      this.$store.dispatch('index/act/INFO', {Vue: this}).then(() => {
        this.checkToken();
        this.$refs.countNode.changWidth();
        this.$refs.luckyNode.initSwiper();
        this.$store.dispatch('common/act/LOADING', {loading: false});
      });
    },
    computed: {
      info() {
        return this.$store.getters['index/get/INFO'];
      },
      userInfo() {
        return this.$store.getters['common/get/USERINFO'];
      }
    },
    components: {
      rule,
      count,
      lucky,
      period,
      phone,
      coupon,
      'mt-button': Button
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    .rule
      position: absolute
      top: -4px
      right: 0
      width: 12%
      z-index: 10
      padding: 0 3%
    .header
      font-size: 0
      min-height: 100px
    .submit
      height: 1rem
      background-color: #fff
      position: fixed
      bottom: 0
      z-index: 11
      width: 100%
      max-width: 750px
      margin: 0 auto
      padding: 2% 6%
      box-sizing: border-box
      button
        font-size: 0.3rem
        text-align: center
        background-color: #36a3fe
        color: #fff
        padding: 0.1rem
        border-radius: 5px
</style>
