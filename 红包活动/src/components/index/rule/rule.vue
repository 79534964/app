<template>
  <div class="_wrapper" v-if="groupInfo !== null">
    <div class="header">
      <span class="left"></span>活动规则<span class="right"></span>
    </div>
    <div class="content">
      <p>1、下单即可分享优惠券给小伙伴</p>
      <p>2、每个红包限制{{groupInfo.limitCount}}人领取</p>
      <p>3、发放{{groupInfo.groupType === 1 ? '随机' : '指定'}}优惠券</p>
      <p>4、每个订单只能用一个优惠券</p>
      <p>5、其他未尽事宜，联系客服咨询</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'index_rule',
    computed: {
      groupInfo() {
        return this.$store.getters['index/get/GROUPINFO'];
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  ._wrapper
    background-color: #fff
    margin-top: 0.2rem
    .header
      margin-top: 0.2rem
      text-align: center
      padding: 0.3rem 0
      padding-bottom: 0.17rem
      font-size: 0.29rem
      span
        border-top: 1px solid black
        width: 12%
        display: inline-block
        position: relative
        top: -0.08rem
      .left
        right: 2%
      .right
        left: 2%
    .content
      padding: 0.2rem 0.5rem
      p
        font-size: 0.26rem
        margin-bottom: 0.1rem

</style>

<style lang="stylus" rel="stylesheet/stylus">
</style>
