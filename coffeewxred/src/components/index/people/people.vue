<template>
  <div class="_wrapper" v-if="record.length !== 0">
    <div class="header">
      <span class="left"></span>看看大家手气<span class="right"></span>
    </div>
    <div class="content">
      <div class="item" v-for="people in record">
        <div class="img">
          <img v-if="!people.headImg" src="./avatar.png"/>
          <img v-else :src="people.headImg"/>
        </div>
        <div class="info">
          <div class="name">{{people.nickName ? people.nickName : people.userName}}</div>
          <div class="time">{{people.createTime}}</div>
        </div>
        <img class="good" v-if="people.isBest === 1" src="./good.png"/>
        <div class="price" :class="{good_price:people.isBest === 1}">
          <span class="other" v-if="people.priceType ===2 && (people.couponPrice === 50 || people.couponPrice === 100)">
            {{people.couponPrice === 50 ? '半价券' : '全免券'}}
          </span>
          <div v-else>
            <span class="price">
            {{people.priceType === 1 ? people.couponPrice : (people.couponPrice / 10)}}
            </span>
            <span class="type">
            {{people.priceType === 1 ? '元' : '折'}}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'index_people',
    computed: {
      record() {
        return this.$store.getters['index/get/RECORD'];
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  ._wrapper
    background-color: #fff
    .header
      margin-top: 0.2rem
      text-align: center
      padding: 0.2rem 0
      padding-bottom: 0
      span
        border-top: 1px solid black
        width: 10%
        display: inline-block
        position: relative
        top: -0.08rem
      .left
        right: 2%
      .right
        left: 2%
    .content
      color: #484848
      .item
        position: relative
        display: flex
        justify-content: space-between
        padding: 0.2rem 0
        margin: 0 0.3rem
        font-size: 0.27rem
        border-bottom: 1px solid #f4f4f4
        .img
          width: 1rem
          height: 1rem
          border: 1px solid #e9e9e9
          border-radius: 50%
          overflow: hidden
          img
            width: 100%
        .good
          position: absolute
          width: 1.3rem
          right: 0
          bottom: 0.3rem
        .info
          display: flex
          flex-direction: column
          justify-content: space-around
          position: absolute
          left: 1.3rem
          height: 0.8rem
          top: 0.3rem
        .price
          line-height: 1rem
        .good_price
          position: relative
          top: -0.1rem
</style>

<style lang="stylus" rel="stylesheet/stylus">

</style>
