<template>
  <div class="__wrapper index_red_phone">
    <div class="content">
      <mt-field class="phone" placeholder="请输入手机号" type="tel" v-model="phone"
                :attr="{ maxlength: 11 }" :disableClear="true"></mt-field>
      <div class="captcha">
        <mt-field class="input" placeholder="请输入验证码" v-model="captcha" :attr="{ maxlength: 4 }" type="tel"
                  :disableClear="true"></mt-field>
        <mt-button class="btn" @click="getCaptcha()" type="default" :disabled="captchaFlag">{{captchaText}}</mt-button>
      </div>
    </div>
    <mt-button class="submit" @click="sumbit()">立即领取</mt-button>
  </div>
</template>

<script type="text/ecmascript-6">

  import {Field, Button, Toast} from 'mint-ui';

  export default {
    name: 'index_red_phone',
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
        if (this.captchaFlag) {
          return false;
        }
        if (!/^1[34578]\d{9}$/.test(this.phone)) {
          Toast('请输入正确的手机号');
          return false;
        }
        this.$store.dispatch('common/act/LOADING', {loading: true});
        this.$store.dispatch('index/act/SMSSEND', {Vue: this, phone: this.phone}).then(() => {
          this.$store.dispatch('common/act/LOADING', {loading: false});
          this.changeCaptcha();
        });
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
            return false;
          }
          this.captchaText = `${num}秒`;
        }, 1000);
      },
      init() {
        this.phone = '';
        this.captcha = '';
        this.captchaText = '获取验证码';
        this.captchaFlag = false;
      },
      sumbit() {
        if (this.captcha === '') {
          Toast('请输入4位验证码');
          return false;
        }
        this.$store.dispatch('index/act/SUMBIT', {Vue: this, phone: this.phone, smsCode: this.captcha});
      }
    },
    components: {
      'mt-field': Field,
      'mt-button': Button
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .__wrapper
    .content
      border: 1px solid #dddddd
      border-radius: 5px
      overflow: hidden
      background-color: #f8f8f8
      .phone
        height: 0.83rem
        min-height: inherit
        border-bottom: 1px solid #e4e4e4
      .captcha
        display: flex
        border-bottom: 1px solid #e4e4e4
        margin-top: 0.1rem
        .input
          flex: 1
          min-height: inherit
        .btn
          width: 2.5rem
          height: 0.83rem
          border-radius: 0
          font-size: 0.3rem
          color: #009bec
          box-shadow: none
          &::after
            background-color: #fff
    .submit
      width: 100%
      margin-top: 0.5rem
      background: #009bec
      color: #fff
      padding: 0.17rem
      border-radius: 3px
      font-size: 0.33rem
</style>

<style lang="stylus" rel="stylesheet/stylus">
  .index_red_phone
    .content
      ::-webkit-input-placeholder
        color: #cacaca
      :-moz-placeholder
        color: #cacaca
        opacity: 1
      ::-moz-placeholder
        color: #cacaca
        opacity: 1
      :-ms-input-placeholder
        color: #cacaca
      input
        background-color: #f8f8f8
</style>
