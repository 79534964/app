<template>
  <transition name="fade-in">
    <div class="_wrapper fade-in" v-if="flag">
      <img class="background" :src="`${$store.state.imgUrl}before.jpg`"/>
      <img v-show="ques.length > 0" @click="close()" class="btn" src="./before.png"/>
      <img v-show="ques.length === 0" class="btn" :style="{width: '60%', left:'20%'}" src="./point.png"/>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">

  export default {
    name: 'before',
    data() {
      return {
        flag: true
      };
    },
    methods: {
      close() {
        this.flag = false;
      }
    },
    computed: {
      ques() {
        return this.$store.getters['index/get/QUES'];
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
    .btn
      position: absolute
      top: 6.5rem
      width: 35%
      left: 32.5%
      z-index: 9
</style>

<style lang="stylus" rel="stylesheet/stylus">

</style>
