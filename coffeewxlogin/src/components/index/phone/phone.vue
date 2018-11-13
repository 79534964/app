<template>
  <div class="_wrapper index_phone">
    <div class="content">
      <mt-field class="phone" placeholder="请输入您的手机号" type="tel" v-model="phone"
                :attr="{ maxlength: 11 }" :disableClear="true"></mt-field>
      <div class="captcha">
        <mt-field class="input" placeholder="请输入验证码" v-model="captcha" :attr="{ maxlength: 4 }" type="tel"
                  :disableClear="true" id="inputNode"></mt-field>
        <mt-button class="btn" @click="getCaptcha()" type="default" :disabled="captchaFlag">{{captchaText}}</mt-button>
      </div>
    </div>
    <mt-button v-if="userInfo && userInfo.mobile" class="submit" @click="http()">快去下单吧~</mt-button>
    <mt-button v-else class="submit" @click="submit()">{{systemFlag ? '绑定手机号注册账户' : '绑定手机领取18元优惠券'}}</mt-button>
  </div>
</template>

<script type="text/ecmascript-6">

  import {Field, Button, Toast} from 'mint-ui';

  export default {
    name: 'index_phone',
    props: {
      systemFlag: {
        type: Boolean
      }
    },
    data() {
      return {
        phone: '',
        captcha: '',
        captchaFlag: false,
        captchaText: '获取验证码'
      };
    },
    methods: {
      getCaptcha() {
        if (this.userInfo.mobile) {
          Toast({
            message: '您已经绑定过啦~',
            duration: 2000
          });
          return;
        }
        if (this.captchaFlag) {
          return;
        }
        if (!/^1[123456789]\d{9}$/.test(this.phone)) {
          Toast({
            message: '请输入正确的手机号',
            duration: 700
          });
          return;
        }
        this.$store.dispatch('common/act/LOADING', {loading: true});
        this.$store.dispatch('index/act/SMS', {Vue: this, phone: this.phone}).then(() => {
          this.changeCaptcha();
          this.$store.dispatch('common/act/LOADING', {loading: false});
        });
        document.getElementById('inputNode').children[1].children[1].children[0].focus();
      },
      changeCaptcha() {
        this.captchaFlag = true;
        let num = 60;
        this.captchaText = `${num}秒`;
        let interval = window.setInterval(() => {
          num--;
          if (num === 0) {
            window.clearInterval(interval);
            this.captchaText = '获取验证码';
            this.captchaFlag = false;
            return;
          }
          this.captchaText = `${num}秒`;
        }, 1000);
      },
      submit() {
        if (this.captcha === '') {
          Toast({
            message: '请输入4位验证码',
            duration: 700
          });
          return;
        }
        this.$store.dispatch('index/act/SETRED', {Vue: this, phone: this.phone, code: this.captcha}).then(() => {
          if (this.systemFlag) {
            this.$emit('systemFlag');
            return;
          }
          Toast({
            message: '领取成功！',
            duration: 700
          });
          window.setTimeout(() => {
            this.http();
          }, 700);
        });
      },
      http() {
        window.location.href = this.$route.query.redirect_url || `http://${window.location.host}/mobile/coffeewxapp/#/`;
      }
    },
    computed: {
      userInfo() {
        return this.$store.getters['common/get/USERINFO'];
      }
    },
    components: {
      'mt-field': Field,
      'mt-button': Button
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  ._wrapper
    padding: 6%
    .content
      background-color: rgba(255, 255, 255, .4)
      .phone
        height: 0.83rem
        min-height: inherit
        border-bottom: 1px solid #898a8c
      .captcha
        display: flex
        height: 0.83rem
        align-items: center
      .input
        flex: 1
        min-height: inherit
      .btn
        background-color: #ffffff
        color: #909497
        border-radius: 0.1rem
        height: .5rem
        width: 2rem
        margin-right: 0.4rem
        font-size: 0.28rem
        box-shadow: none
        &::after
          background-color: #fff
    .submit
      width: 100%
      margin-top: 0.65rem
      background: #fff
      color: #8f9297
      padding: 0.17rem
      border-radius: 3px
      font-size: 0.28rem
</style>

<style lang="stylus" rel="stylesheet/stylus">
  .index_phone
    .content
      input
        background: none
        color: #575454
</style>
