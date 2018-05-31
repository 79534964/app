<template>
  <div class="wrapper">
    <div class="banner">
      <img src="./banner.png"/>
    </div>
    <div class="input">
      <div class="header">
        <p class="title">联系信息</p>
        <p class="info">(请填写真实信息)</p>
      </div>
      <div class="content">
        <div class="picker">
          <mt-field label="申请合作城市：" placeholder="点击选择" v-model="form.cityShow"></mt-field>
          <div class="right" @click="openCity"></div>
        </div>
        <mt-field label="联系人姓名：" v-model="form.name"></mt-field>
        <mt-field label="联系电话：" type="tel" v-model="form.phone" :attr="{ maxlength: 11 }"></mt-field>
        <mt-field label="预计投入资金：" placeholder="单位为万元" type="tel" v-model="form.fund"></mt-field>
        <div class="picker">
          <mt-field label="是否有投放点位：" v-model="form.hasPositionShow" placeholder="点击选择"></mt-field>
          <div class="right" @click="openGeneral"></div>
        </div>
        <mt-field label="预计投放点位：" v-model="form.position" placeholder="如大学校园图书馆"></mt-field>
      </div>
    </div>
    <mt-cell class="cell" title="合作须知" is-link to="/notes"></mt-cell>
    <mt-button class="submit" type="danger" @click="submit">我要加盟</mt-button>
    <city ref="cityNode" @getData="getCityData"></city>
    <general ref="generalNode" @getData="getGeneralData"></general>
    <transition name="page-skip">
      <router-view class="common_page page-skip"></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">

  import {Field, Cell, Button, Toast, MessageBox} from 'mint-ui';
  import city from '@/components/common/city/city';
  import general from '@/components/common/general/general';

  //  下拉框报错 是框架内部问题 无需修复

  export default {
    name: 'index',
    data() {
      return {
        form: {
          phone: '',
          city: '',
          area: '',
          name: '',
          fund: '',
          hasPosition: '',
          position: '',
          hasPositionShow: '',
          cityShow: ''
        }
      };
    },
    methods: {
      openCity() {
        this.$refs.cityNode.open();
      },
      openGeneral() {
        this.$refs.generalNode.open();
      },
      getCityData({city, divider}) {
        this.form.cityShow = `${divider}/${city}`;
        this.form.city = city;
        this.form.area = divider;
      },
      getGeneralData({key, value}) {
        this.form.hasPositionShow = key;
        this.form.hasPosition = value;
      },
      submit() {
        let rules = {
          city: {
            rule: (val) => {
              return val !== '';
            },
            msg: '请选择城市'
          },
          area: {
            rule: (val) => {
              return val !== '';
            },
            msg: '请选择省份'
          },
          name: {
            rule: (val) => {
              return val !== '';
            },
            msg: '请输入您的姓名'
          },
          phone: {
            rule: (val) => {
              return /^1[34578]\d{9}$/.test(val);
            },
            msg: '请输入正确的手机号'
          },
          fund: {
            rule: (val) => {
              return val !== '' || window.isNaN(val);
            },
            msg: '请输入预计投入资金'
          },
          hasPosition: {
            rule: (val) => {
              return val !== '';
            },
            msg: '请选择是否有投放点位'
          },
          position: {
            rule: (val) => {
              return val !== '';
            },
            msg: '请输入预计投放点位'
          }
        };
        for (let key in rules) {
          if (!rules[key].rule(this.form[key])) {
            Toast({message: rules[key].msg, duration: 800});
            return;
          }
        }
        this.http();
      },
      http() {
        MessageBox({
          message: '是否已阅读过合作须知，是否提交',
          showCancelButton: true
        }).then((data) => {
          if (data === 'confirm') {
            this.$store.dispatch('common/act/LOADING', {loading: true});
            this.$store.dispatch('index/act/SUBMIT', Object.assign({Vue: this}, this.form)).then(() => {
              this.$store.dispatch('common/act/LOADING', {loading: false});
              MessageBox.alert('提交成功，我们会在3个工作日之内给您回复').then(() => {
                window.location.reload();
              });
            });
          }
        });
      }
    },
    components: {
      'mt-field': Field,
      'mt-cell': Cell,
      'mt-button': Button,
      city,
      general
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    background-color: #f2f2f4
    .banner
      font-size: 0
    .input
      background-color: #fff
      .header
        padding-top 0.3rem
        display: flex
        border-left: 0.1rem solid #127ce0
        align-items: flex-end
        .title
          margin: 0 0.2rem 0 0.4rem
          color: #157ce3
          font-size 0.3rem
        .info
          font-size: 0.2rem;
          color: #808080;
      .content
        margin-top 0.2rem
        padding: 0 0.3rem
        .picker
          position: relative
          .right
            position: absolute
            z-index: 9
            right: 0
            top: 0
            bottom: 0
            width: 60%
    .cell
      margin-top: 0.2rem
      padding: 0 0.3rem
      background-color: #fff
    .submit
      width: 35%
      margin: 1rem 0
      margin-left: 32.5%
      font-size: 0.28rem
      padding: 0.13rem 0
      color: #fff
      background-color: #127ce0
      border-radius: 5px

</style>

<style lang="stylus" rel="stylesheet/stylus">
  .wrapper
    .content
      .mint-cell-wrapper
        font-size: 0.29rem
        padding: 0 0.1rem
        height: 0.8rem
        border-bottom: 0.01rem solid #e5e5e5
        .mint-cell-title
          width: 3rem
          &:before
            content: "*"
            color: #0f7be0
            font-size: 0.3rem
    .cell
      .mint-cell-wrapper
        height: 0.65rem
        font-size: 0.29rem
      .mint-cell-allow-right::after
        width: 0.15rem
        height: 0.15rem
</style>
