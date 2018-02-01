<template>
  <div class="_wrapper index_sumbit" v-if="answerValue !== null">
    <div class="content">
      <mt-field v-if="userPhone === null" class="phone" placeholder="请输入手机号" type="tel" v-model="phone"
                :attr="{ maxlength: 11 }"></mt-field>
      <div v-if="userPhone === null" class="captcha">
        <mt-field class="input" v-model="captcha" :attr="{ maxlength: 4 }"></mt-field>
        <mt-button class="btn" @click="getCaptcha()" type="default" :disabled="captchaFlag">{{captchaText}}</mt-button>
      </div>
      <div v-if="userPhone !== null" class="hasPhone">
        <p>{{this.userPhone}}</p>
        <span v-if="couponInfo.length === 0" class="update" @click="updatePhone()">修改手机号</span>
      </div>
    </div>
    <div class="bottom">
      <div v-if="couponInfo.length === 0" class="btn can" @click="submit()">领取奖励</div>
      <div class="btn alreadyCan" v-if="couponInfo.length !== 0">已经领取奖励</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Field, Button, Toast, MessageBox} from 'mint-ui';

  export default {
    name: 'v-submit',
    data() {
      return {
        phone: '',
        captcha: '',
        captchaFlag: false,
        captchaText: '获取验证码'
      };
    },
    methods: {
      updatePhone() {
        MessageBox({
          title: '提示',
          message: '是否修改手机号',
          showCancelButton: true
        }).then((data) => {
          if (data === 'confirm') {
            this.userPhone = null;
          }
        });
      },
      getCaptcha() {
        if (this.captchaFlag) {
          return false;
        }
        if (!/^1[34578]\d{9}$/.test(this.phone)) {
          Toast('请输入正确的手机号');
          return false;
        }
        this.$store.dispatch('index/act/SMSSEND', {Vue: this, phone: this.phone});
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
      submit() {
        if (!/^1[34578]\d{9}$/.test(this.phone) && this.userPhone === null) {
          Toast('请输入正确的手机号');
          return false;
        }
        if (this.captcha === '' && this.userPhone === null) {
          Toast('请输入验证码');
          return false;
        }
        this.$store.dispatch('index/act/SUBMITCOUPON', {
          Vue: this,
          phone: this.userPhone === null ? this.phone : this.userPhone,
          code: this.captcha,
          type: this.userPhone === null ? 1 : 0
        });
      }
    },
    computed: {
      userPhone: {
        get () {
          return this.$store.getters['index/get/USERPHONE'];
        },
        set (value) {
          this.$store.commit('index/set/USERPHONE', value);
        }
      },
      answerValue() {
        return this.$store.getters['index/get/ANSWERVALUE'];
      },
      couponInfo() {
        return this.$store.getters['index/get/COUPONINFO'];
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
    .content
      .hasPhone
        text-align: center
        p
          color: #fff
          font-size: 0.4rem
          padding-top: 0.7rem
          padding-bottom: 0.25rem
      .update
        color: #bad3f1
        text-decoration: underline
    .bottom
      height: .9rem
      line-height: .9rem
      margin-top: 0.3rem
      .btn
        height: 100%
        text-align: center
        font-size: 0.35rem
      .can
        background-color: #fbc000
        color: #672614
        border: 1px solid #b14f2c
      .alreadyCan
        background-color: #7e7e7e
        color: #3a3a3a
        border: 1px solid #323232

</style>

<style lang="stylus" rel="stylesheet/stylus">
  .index_sumbit
    .phone, .input
      min-height: 0.83rem
      background-color: #222943
      .mint-cell-wrapper
        border: 1px solid #a0a0a2
        input
          background-color: #222943
          font-size: 0.3rem
          color: #fff
          &::-webkit-input-placeholder
            color: #9f9f9f !important
        .mint-field-clear
          i
            color: #9f9f9f
            font-size: 0.3rem
    .captcha
      display: flex
      margin-top: 0.2rem
      min-height: 0.83rem
      .input
        flex: 1
      .btn
        width: 2.5rem
        height: 0.83rem
        border-radius: 0
        font-size: 0.3rem
        background-color: #bad3f1
        color: #212643
</style>
