<template>
  <div class="content-wrapper">
    <div class="sidebar">
      <el-menu class="el-menu-vertical-demo" :default-active="routerList[0].list[0].url" :router="true">
        <el-submenu :index="item.title" v-for="(item,index) in routerList">
          <template slot="title">{{item.title}}</template>
          <el-menu-item v-for="e in item.list" :index="e.url">{{e.name}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="sidebar-content">
      <div class="content-box">
        <transition name="fade">
          <router-view class="router-wrapper"></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      routerList: {
        type: Array
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .content-wrapper
    display: flex
    .sidebar
      flex: 0 0 210px
      width: 210px
      border-radius: 5px
      overflow-y: auto
      box-shadow: 0px 0px 7px 0px #b6b6b6
      margin-left: 15px
    .el-menu
      background-color: #fff
      transition: all 0.3s
      .el-submenu__title
        font-size: 20px
        padding: 0 !important
        background-color: #eff2f7
        text-align: center
        &:hover
          background-color: #d3dce6
      .el-menu-item
        padding: 0 !important
        text-align: center
        margin: 0px 3px
        &.is-active
          background-color: #0663a2
          color: #fff
          font-size: 16px
    .sidebar-content
      position: relative
      flex: 1
      margin-left: 30px
      margin-right 15px
      .content-box
        position: absolute
        width: 100%
        box-shadow: 0px 0px 7px 0px #b6b6b6
        height: 100%
        border-radius: 5px
        .router-wrapper
          transition: all 0.3s
          height: 100%
          &.fade-enter-active
            opacity: 0
            transform: translate3d(0, 100%, 0)
          &.fade-leave-active
            opacity: 0
</style>
