<template>
  <div class="_wrapper" v-if="$store.state.isWeiXin === 1 && groupFlag">
    <coupon></coupon>
    <phone v-if="!cookiePhone" @success="success"></phone>
    <div v-else class="phone">
      <p>优惠券已放入账号：{{cookiePhone}}
        <span class="update" @click="openPopup()">修改></span>
      </p>
    </div>
    <mt-button class="href" v-if="cookiePhone"
               @click="goHref()">
      立即使用
    </mt-button>
    <mt-popup class="popup" v-model="popupFlag" popup-transition="popup-fade">
      <div>
        <phone @success="success"></phone>
      </div>
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">

  import {Popup, Button} from 'mint-ui';
  import phone from './phone/phone';
  import coupon from './coupon/coupon';
  import {getCookie} from '@/common/js/utils';

  export default {
    name: 'index_red',
    data() {
      return {
        popupFlag: false,
        cookiePhone: ''
      };
    },
    methods: {
      getPhone() {
        this.cookiePhone = getCookie('user_phone');
      },
      openPopup() {
        this.popupFlag = true;
      },
      success() {
        this.getPhone();
        this.popupFlag = false;
      },
      goHref() {
        window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.mattburg_coffee.application';
      }
    },
    created() {
      this.getPhone();
    },
    computed: {
      groupFlag() {
        return this.$store.getters['index/get/GROUPFLAG'];
      }
    },
    components: {
      coupon,
      phone,
      'mt-popup': Popup,
      'mt-button': Button
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  ._wrapper
    background-color: #fff
    padding: 0.1rem 0.3rem
    padding-top: 0.25rem
    .phone
      margin: 0.4rem 0 0.3rem 0
      text-align: center
      .update
        color: #009bec
        font-size: 0.25rem
        position: relative
        top: -0.01rem
        margin-left: 0.05rem
    .href
      width: 100%
      margin-bottom: 0.2rem
      background: #009bec
      color: #fff
      padding: 0.17rem
      border-radius: 3px
      font-size: 0.35rem
    .popup
      top: 40%
      width: 7rem
      padding: 0.5rem 0 0.5rem 0
      border-radius: 5px

</style>

<style lang="stylus" rel="stylesheet/stylus">

</style>
