<template>
  <div class="__wrapper">
    <p v-if="info && info.groupName">{{info.groupName}},每人限领一张</p>
    <p v-if="info">发放张数：{{info.totalCoupon}}　剩余张数：{{info.totalCoupon - info.usedCoupon}}</p>
    <div class="box"><i :style="iStyle"></i></div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    name: '',
    data() {
      return {
        iStyle: {
          width: '0%'
        }
      };
    },
    methods: {
      changWidth() {
        if (this.info.usedCounpon !== 0) {
          this.iStyle.width = `${Math.round((this.info.usedCounpon * 100) / this.info.totalCoupon)}%`;
        }
      }
    },
    created() {
    },
    computed: {
      info() {
        return this.$store.getters['index/get/INFO'];
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .__wrapper
    width: 100%
    height: 1.8rem
    background-color: #36a3fe
    position: relative
    p:nth-child(1)
      font-size: 0.28rem
      text-align: center
      color: #fff;
      font-weight: 600
      position: absolute
      width: 100%
      top: 11%
    .box
      width: 70%
      height: 0.2rem
      position: absolute
      left: 50%
      margin-left: -35%
      top: 50%
      margin-top: -0.1rem
      border-radius: 10px
      background: #fff
      overflow: hidden
      i
        transition: width 1s
        background: -webkit-linear-gradient(left, #f7dd16, #f7dea6)
        height: 100%
        display: block
        border-radius: 10px
    p:nth-child(2)
      font-size: 0.28rem
      text-align: center
      color: #fff
      position: absolute
      bottom: 11%
      width: 100%
</style>

<style lang="stylus" rel="stylesheet/stylus">

</style>
