<template>
  <div class="_wrapper" v-if="$store.state.isWeiXin === 1 && groupFlag">
    <coupon></coupon>
    <phone v-if="!cookiePhone"></phone>
    <div v-else class="phone">
      <p>优惠券已放入账号：{{cookiePhone}}
        <span class="update" @click="openPopup()">修改></span>
      </p>
    </div>
    <mt-popup class="popup" v-model="popupFlag" popup-transition="popup-fade">
      <div>
        <phone @success="success"></phone>
      </div>
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">

  import {Popup} from 'mint-ui';
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
        this.cookiePhone = getCookie('uer_phone');
      },
      openPopup() {
        this.popupFlag = true;
      },
      success() {
        this.getPhone();
        this.popupFlag = false;
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
      'mt-popup': Popup
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  ._wrapper
    background-color: #fff
    padding: 0.1rem 0.3rem
    padding-top: 0.15rem
    .phone
      text-align: center
      .update
        color: #186899
        font-size: 0.25rem
        position: relative
        top: -0.03rem
        margin-left: 0.05rem
    .popup
      width: 7rem
      padding: 0.5rem 0 0.5rem 0
      border-radius: 5px

</style>

<style lang="stylus" rel="stylesheet/stylus">

</style>
