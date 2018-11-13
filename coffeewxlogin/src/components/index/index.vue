<template>
  <div class="wrapper">
    <img class="background" :src="`${$store.state.imgUrl}background.jpg`"/>
    <img class="logo" src="./logo.png"/>
    <p class="system" v-if="systemFlag && userInfo && userInfo.mobile"><span style="font-size: 0.23rem;">您的号码:</span>{{this.userInfo.mobile}}
    </p>
    <phone v-else :systemFlag="systemFlag" @systemFlag="success"></phone>
    <p v-if="systemFlag" class="point">绑定手机号成功后，返回OA继续注册账号</p>
    <p v-else class="point">18元优惠券请在 - 个人中心 - 我的礼券中查看</p>
    <img class="text" src="./text.png"/>
  </div>
</template>

<script type="text/ecmascript-6">

  import {Toast} from 'mint-ui';
  import {userTypeMixin} from '@/common/js/mixins';

  import phone from './phone/phone';

  export default {
    name: 'index',
    mixins: [userTypeMixin],
    data() {
      return {
        systemFlag: false
      };
    },
    methods: {
      success() {
        this.$store.dispatch('common/act/USERTOKEN', {Vue: this});
      },
      getSystemFlag() {
        this.systemFlag = this.$route.query.system;
      }
    },
    mounted() {
      this.getSystemFlag();
      this.$store.dispatch('common/act/USERTOKEN', {Vue: this}).then(() => {
        if (this.userInfo.mobile) {
          Toast({
            message: '您已经绑定过啦~',
            duration: 2000
          });
        }
      });
    },
    computed: {
      userInfo() {
        return this.$store.getters['common/get/USERINFO'];
      }
    },
    components: {
      phone
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    display: flex
    flex-direction: column
    align-items: center
    .system
      color: #fff
      font-size: 0.6rem
      margin-top: 0.7rem
      margin-bottom: 0.8rem
    .background
      position: absolute
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: -1
    .logo
      width: 25%
      margin-top: 1rem
      margin-bottom: 0.3rem
    .point
      color: #fff
      font-size: 0.25rem
    .text
      position: absolute
      width: 35%
      left: 50%
      margin-left: -17.5%
      bottom: 4%
</style>
