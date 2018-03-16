<template>
  <transition name="fade-in">
    <div class="_wrapper fade-in" v-if="flag">
      <img class="background" :src="`${$store.state.imgUrl}after.jpg`"/>
      <transition name="top-in">
        <div class="coupon top-in" v-if="coupon" @click="goCoupon">
          <div class="info">
            <div class="left">
              <div>{{coupon.ruleName}}</div>
              <p class="day" v-if="coupon.couponEndTime*1000 > time">
                还剩{{parseInt((coupon.couponEndTime * 1000 - time) / 1000 / 60 / 60 / 24) + 1}}天
              </p>
              <p class="time" v-else>
                已过期
              </p>
            </div>
            <div class="other"
                 v-if="coupon.priceType ===2 && (coupon.couponPrice === 50 || coupon.couponPrice === 100)">
              {{coupon.couponPrice === 50 ? '半价券' : '全免券'}}
            </div>
            <div class="right" v-else>
              <div class="type">
                {{coupon.priceType === 1 ? '元' : '折'}}
              </div>
              <div class="price">
                {{coupon.priceType === 1 ? coupon.couponPrice : (coupon.couponPrice / 10)}}
              </div>
            </div>
          </div>
          <img class="background" :src="`${$store.state.imgUrl}coupon.png`"/>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">

  export default {
    name: 'after',
    data() {
      return {
        flag: false,
        answer: [],
        time: new Date().getTime()
      };
    },
    methods: {
      open() {
        this.flag = true;
      },
      submit(selectObject) {
        this.getAnswer(selectObject);
        this.$store.dispatch('common/act/LOADING', {loading: true});
        this.$store.dispatch('index/act/COUPON', {
          Vue: this,
          mobile: this.$route.query.mobile,
          answer: JSON.stringify(this.answer)
        }).then(() => {
          this.$store.dispatch('common/act/LOADING', {loading: false});
        });
      },
      getAnswer(selectObject) {
        this.ques.forEach(({id}, index) => {
          this.answer.push({
            qid: id,
            aid: selectObject[`qid${index + 1}`]
          });
        });
      },
      goCoupon() {
        window.location.href = 'http://www.mattburg.com/go/coupon';
      }
    },
    computed: {
      ques() {
        return this.$store.getters['index/get/QUES'];
      },
      coupon() {
        return this.$store.getters['index/get/COUPON'];
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  ._wrapper
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 2
    .background
      position: absolute
      left: 0
      right: 0
      bottom: 0
      top: 0
      z-index: -1
    .coupon
      position: relative
      width: 7rem
      margin: auto
      margin-top: 2.5rem
      .info
        width: 100%
        height: 100%
        padding: 0.6rem 0.5rem
        color: #fff
        box-sizing: border-box
        display: flex
        justify-content: space-between
        .left
          display: flex
          flex-direction: column
          justify-content: space-around
          text-align: left
          font-size: 0.3rem
          .day
            font-size: 0.24rem
            margin-top: 0.1rem
        .right
          display: flex
          .type
            padding-top: 0.46rem
            font-size: 0.3rem
            margin-right: 0.05rem
          .price
            font-size: 0.9rem
        .other
          font-size: 0.5rem
          padding-top: 0.1rem
</style>

<style lang="stylus" rel="stylesheet/stylus">

</style>
