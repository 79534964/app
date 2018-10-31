<template>
  <transition name="fade-in">
    <div class="_wrapper fade-in" v-if="showFlag" @touchmove.prevent>
      <div class="background" @click="showFlag = false"></div>
      <div class="content">
        <mt-field class="phone" placeholder="请输入手机号" type="tel" v-model="phone" :attr="{ maxlength: 11 }"></mt-field>
        <div class="captcha">
          <mt-field class="input" v-model="captcha" :attr="{ maxlength: 4 }" type="tel"
                    :disableClear="true"></mt-field>
          <mt-button class="btn" @click="getCaptcha()" type="default" :disabled="captchaFlag">{{captchaText}}
          </mt-button>
        </div>
        <mt-button class="submit" @click="sumbit()">绑定手机领取红包</mt-button>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {Button, Field, Toast} from 'mint-ui';

  export default {
    name: 'index_rule',
    data() {
      return {
        showFlag: false,
        phone: '',
        captcha: '',
        captchaFlag: false,
        captchaText: '获取验证码'
      };
    },
    methods: {
      open() {
        this.showFlag = true;
      },
      getCaptcha() {
        if (this.captchaFlag) {
          return false;
        }
        if (!/^1[123456789]\d{9}$/.test(this.phone)) {
          Toast({
            message: '请输入正确的手机号',
            duration: 700
          });
          return false;
        }
        this.changeCaptcha();
        this.$store.dispatch('index/act/SMS', {Vue: this, phone: this.phone}).then(() => {
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
      sumbit() {
        if (this.captcha === '') {
          Toast({
            message: '请输入4位验证码',
            duration: 700
          });
          return false;
        }
        this.$store.dispatch('index/act/COUPONS', {Vue: this, phone: this.phone, code: this.captcha}).then(() => {
          this.showFlag = false;
          this.$emit('success');
        });
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
    position: fixed
    width: 100%
    height: 100%
    z-index: 30
    .background
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      background: rgba(0, 0, 0, .3)
    .content
      position: absolute
      right: 0
      left: 0
      top: 14%
      z-index: 9
      width: 85%
      margin: 0 auto
      background-color: #fff
      box-shadow: 0 3px 10px #353636
      border-radius: 5px
      padding: 5%
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
          font-size: 0.28rem
          background-color: #fff
          color: #009bec
          box-shadow: none
          &::after
            background-color: #fff
      .submit
        width: 100%
        margin-top: 0.6rem
        background: #009bec
        color: #fff
        padding: 0.2rem
        border-radius: 3px
        font-size: 0.27rem
</style>

<style lang="stylus" rel="stylesheet/stylus">

</style>
