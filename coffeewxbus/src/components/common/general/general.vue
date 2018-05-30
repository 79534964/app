<template>
  <transition>
    <div class="general fade-in" v-show="showFlag">
      <transition name="fade-in">
        <div class="background fade-in" @click="close" v-show="showFlag"></div>
      </transition>
      <transition name="bottom-in">
        <div class="picker bottom-in" v-show="showFlag">
          <div class="button">
            <mt-button @click="close">取消</mt-button>
            <mt-button @click="submit">确定</mt-button>
          </div>
          <mt-picker :slots="slots" @change="change"></mt-picker>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">

  import {Picker, Button} from 'mint-ui';

  export default {
    name: 'general',
    data() {
      let data = {'有': 1, '没有': 0};
      return {
        showFlag: false,
        data,
        slots: [{
          flex: 1,
          defaultIndex: 0,
          values: Object.keys(data),
          className: 'slot1',
          textAlign: 'center'
        }],
        form: {
          key: '',
          value: ''
        }
      };
    },
    methods: {
      open() {
        this.showFlag = true;
      },
      close() {
        this.showFlag = false;
      },
      change(picker, values) {
        if (values[0]) {
          this.form.key = values[0];
          this.form.value = this.data[values[0]];
        }
      },
      submit() {
        this.close();
        this.$emit('getData', this.form);
      }
    },
    components: {
      'mt-picker': Picker,
      'mt-button': Button
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .general
    transition: all 0.5s
    position: absolute
    z-index: 99
    top: 0
    bottom: 0
    right: 0
    left: 0
    .background
      background-color: rgba(0, 0, 0, 0.6)
      position: absolute
      left: 0
      right: 0
      bottom: 0
      top: 0
    .picker
      position: absolute
      z-index: 9
      left: 0
      right: 0
      bottom: 0
      height: 180px
      background-color: #fff
      .button
        display: flex
        position: absolute
        z-index: 9999
        top: 0
        left: 0
        right: 0
        justify-content: space-between
        padding: 0.1rem 0
        background-color: #fff
        border-bottom: 1px solid #e5e5e5
        button
          color: #157ce3
          font-size: 0.27rem
          width: 1rem
</style>
