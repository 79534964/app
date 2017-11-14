<template>
  <div class="wrapper">
    <div class="header">
      <img :src="`${$store.state.imgUrl}header.jpg`"/>
    </div>
    <div class="point">
      好友邀您喝咖啡，送上一张半价券！
    </div>
    <red></red>
    <div class="rule">
      <span @click="openRule()">活动规则</span>
    </div>
    <mt-popup class="popup" v-model="popupFlag" popup-transition="popup-fade" :style="{marginTop:'-50px'}">
      <div class="box">
        <img :src="`${$store.state.imgUrl}rule.png`"/>
        <div class="btn" @click="popupFlag=false"></div>
      </div>
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">

  import red from './red/red';
  import {shareMixin} from '@/common/js/mixins';

  export default {
    name: 'index',
    mixins: [shareMixin],
    data() {
      return {
        popupFlag: false
      };
    },
    methods: {
      openRule() {
        this.popupFlag = true;
      }
    },
    components: {
      red
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    .header
      font-size: 0
    .point
      height: 1rem
      line-height: 1rem
      text-align: center
      font-size: 0.4rem
    .rule
      text-align: center
      margin-top: 0.4rem
      color: #8d8d8d
      span
        padding: 0.2rem
        text-decoration: underline
    .popup
      background: none
      .box
        position: relative
        width: 6.5rem
        .btn
          position: absolute
          bottom: 0
          left: 0.5rem
          right: 0.5rem
          height: 1.1rem
</style>
