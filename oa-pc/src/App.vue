<template>
  <div class="main">
    <div class="header">
      <p class="title">咖啡码头OA系统</p>
      <ul class="list-wrapper">
        <li>
          <router-link to="/product">商品中心</router-link>
        </li>
        <li>
          <router-link to="/order/orderQuery">订单中心</router-link>
        </li>
        <li>
          <router-link to="/user">用户中心</router-link>
        </li>
        <li>
          <router-link to="/service">客服中心</router-link>
        </li>
        <li>
          <router-link to="/machine">机器管理</router-link>
        </li>
        <li>
          <router-link to="/data/dataMachine">数据中心</router-link>
        </li>
        <li>
          <router-link to="/activity">营销活动</router-link>
        </li>
        <li>
          <router-link to="/system">系统设置</router-link>
        </li>
      </ul>
      <div class="header-right">
        <span class="user">您好，{{userName}}</span>
        <span class="btn" @click="quit">退出</span>
      </div>
    </div>
    <transition name="fade">
      <router-view class="content"></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      quit() {
        this.$store.dispatch('login/act/LOGOUT', {Vue: this});
        window.localStorage.clear();
        window.sessionStorage.clear();
        window.setTimeout(() => {
          window.location.reload();
        }, 0);
      }
    },
    computed: {
      userName () {
        return this.$store.getters['login/get/UERNAME'];
      }
    },
    created() {
      this.$store.dispatch('login/act/USERINFO');
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .main
    height: 100%
    .header
      color: #fff
      height: 50px
      background-color: #0060b0
      line-height: 50px
      min-width: 1200px
      box-shadow: 0px 4px 7px 0px #b6b6b6
      .title
        float: left
        width: 180px
        padding-left: 1%
        font-weight: 600
        font-size: 22px
      .list-wrapper
        float: left
        width: 67%
        li
          float: left
          cursor: pointer
          width: 12%;
          text-align: center
          a
            display: block
            transition: all 0.5s
            font-size: 17px
            color: #fff
            padding: 0 2%
            &:hover, &.router-link-active
              background-color: rgba(0, 0, 0, .3)
      .header-right
        float: right
        width: 15%
        .user
          font-size: 17px
          margin-right: 5%
        .btn
          cursor: pointer
          margin-right: 5%
          font-size: 18px
          font-weight: 600
    .content
      position: absolute
      min-height: 800px
      margin-bottom: 20px
      margin-top: 15px
      width: 100%
      height: 88%
      transition: all 0.4s
      min-width: 1200px
      &.fade-enter-active
        opacity: 0
        transform: translate3d(-100%, 0, 0)
      &.fade-leave-active
        opacity: 0
</style>
