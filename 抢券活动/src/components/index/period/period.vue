<template>
  <div class="__wrapper">
    <div class="header clearfix"><p>本期参与人</p>
      <p v-if="info">{{dateFormat(new Date(info.startTime * 1000), 'yyyy-MM-dd hh:mm:ss')}} 开始</p></div>
    <div class="content" v-if="info">
      <ul>
        <li class="clearfix" v-for="user in info.disRecords" :key="user.userName">
          <img v-if="user.avatar" :src="user.avatar"/>
          <img v-if="!user.avatar" src="./head.png">
          <div>
            <p>{{user.userName}}</p>
            <p>{{dateFormat(new Date(user.createTime * 1000), 'yyyy-MM-dd hh:mm:ss')}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {dateFormat} from '@/common/js/utils';

  export default {
    name: '',
    methods: {
      dateFormat
    },
    created() {
    },
    computed: {
      info() {
        return this.$store.getters['index/get/INFO'];
      }
    },
    components: {}
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .__wrapper
    height: 33%
    margin-top: 3%
    background-color: #fff
    padding: 0 5%
    margin-bottom: 1rem
    .header
      height: 12%
      padding-top: 6%
      border-bottom-color: #b6b6b6
      border-bottom-style: solid
      border-bottom-width: 1px
      font-size: 0.3rem
      padding-bottom: 2%
      p:nth-child(1)
        float: left
        font-weight: 600
        margin-left: 1%
        color: #353535
      p:nth-child(2)
        float: right
        margin-right: 1%
        color: #898886
    .content
      ul
        li
          padding: 2%
          border-bottom-style: solid
          border-bottom-width: 1px
          border-bottom-color: #b6b6b6
          img
            float: left
            width: 14%
          div
            float: left
            font-size: 0.3rem
            padding-left: 7%
            width: 70%
            p
              padding-top: 1.5%
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
              width: 100%
            p:nth-child(2)
              color: #898886
</style>

<style lang="stylus" rel="stylesheet/stylus">

</style>
