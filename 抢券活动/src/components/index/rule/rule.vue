<template>
  <transition name="top-in">
    <div class="_wrapper top-in" v-if="showFlag" @touchmove.prevent>
      <img :src="info.img2"/>
      <div class="button">
        <mt-button @click="showFlag=false">知道了</mt-button>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {Button} from 'mint-ui';

  export default {
    name: 'index_rule',
    data() {
      return {
        showFlag: false
      };
    },
    methods: {
      open() {
        this.showFlag = true;
      }
    },
    computed: {
      info() {
        return this.$store.getters['index/get/INFO'];
      }
    },
    components: {
      'mt-button': Button
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  ._wrapper
    position: fixed
    width: 100%
    height: 100%
    z-index: 30
    background-color: #fff
    .button
      text-align: center
      background-color: #36a3fe
      padding: 0.14rem 0
      border-radius: 5px
      width: 60%
      margin-left: 20%
      button
        font-size: 0.3rem
        color: #fff
</style>

<style lang="stylus" rel="stylesheet/stylus">

</style>
