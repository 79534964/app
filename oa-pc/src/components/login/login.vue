<template>
  <div class="content-wrapper">
    <div class="login-wrapper">
      <h1 class="title">咖啡码头OA系统</h1>
      <div class="from-wrapper">
        <span class="text">账号</span><br/>
        <el-input v-model="user"></el-input>
        <span class="text">密码</span><br/>
        <el-input v-model="password" type="password"></el-input>
        <el-button type="primary" @click="loginFun()">登陆</el-button>
        <label class="remember">
          <el-tooltip content="勾选后七天内免登陆" placement="bottom" effect="light">
            <input type="checkbox" v-model="radio">
          </el-tooltip>
          记住我（公共场所慎用）
        </label>
      </div>
      <img class="logo" src="./logo-text.png"/>
    </div>
    <el-button plain>警告</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        user: '',
        password: '',
        radio: false
      };
    },
    created: function () {
      // 判断是否支持Promise localStorage
      if (!(typeof (Promise) === 'function') || !window.localStorage) {
        this.$notify({
          title: '提示',
          message: '很抱歉无法使用,请切换其他浏览器！(建议chrome谷歌浏览器)',
          type: 'warning',
          duration: 0
        });
      }
    },
    methods: {
      loginFun() {
        if (this.user && this.password) {
          this.$store.dispatch('login', {
            Vue: this,
            user: this.user,
            password: this.password,
            radioValue: this.radio
          });
        } else {
          this.$alert('账号密码不能为空', '温馨提示');
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .login-wrapper
    position: fixed
    z-index: 1
    top: 0
    left: 0
    width: 100%
    min-width: 1200px
    height: 100%
    background-color: #f5f5f5
    text-align: center
    .title
      font-size: 36px
      margin-bottom: 20px
      color: #0663a2
      font-weight: 600;
      margin-bottom: 20px
      padding-top: 150px
    .from-wrapper
      box-sizing: border-box
      text-align: left
      width: 380px
      padding: 25px 29px 29px
      margin: 0 auto 20px
      background-color: #fff
      border: 1px solid #e5e5e5
      border-radius: 5px
      font-size: 13px
      .text
        display: inline-block
        font-size: 21px
        margin: 20px 0px 10px 0px
        color: #999
      .el-input__inner
        font-size: 20px
      .el-button
        margin-top: 15px
        letter-spacing: 5px
        padding-left: 20px
        font-size: 20px
      .remember
        position: relative
        margin-left: 45px
        input
          position: absolute
          top: -10px
          left: -14px
    .logo
      margin-top: 60px
      width: 500px
</style>
