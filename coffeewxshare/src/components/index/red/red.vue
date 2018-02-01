<template>
  <div class="_wrapper">
    <coupon v-if="coupon !== null"></coupon>
    <phone v-else></phone>
  </div>
</template>

<script type="text/ecmascript-6">

  import phone from './phone/phone';
  import coupon from './coupon/coupon';

  export default {
    name: 'index_red',
    computed: {
      coupon() {
        return this.$store.getters['index/get/COUPON'];
      }
    },
    components: {
      coupon,
      phone
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  ._wrapper
    padding: 0.1rem 0.3rem
</style>

<style lang="stylus" rel="stylesheet/stylus">

</style>
