<template>
  <div class="_wrapper">
    <div class="content">
      <ul>
        <li>
          <p class="title">1：具有独立承担民事责任能力的企业法人，工商、税务证件的公司资质</p>
        </li>
        <li>
          <p class="title">2：	具备品牌意识，有长远的发展眼光</p>
        </li>
        <li>
          <p class="title">3：了解自助咖啡及行业认同咖啡码头的品牌、经营管理模式和经营的理念</p>
        </li>
        <li>
          <p class="title">4：有一定的渠道资源，教育，医疗，产业园区以及大型企事业单位的物业资源</p>
        </li>
        <li>
          <p class="title">5：有一定的渠道资源，教育，医疗，产业园区以及大型企事业单位的物业资源</p>
        </li>
        <li>
          <p class="title">6：在企业所在地具有良好的信誉和商誉</p>
        </li>
        <li>
          <p class="title">7：具有一定的流动资金, 能与咖啡码头同步资源发展</p>
        </li>
      </ul>
    </div>
    <mt-button class="submit" type="danger" @click="goback">我了解了</mt-button>
  </div>
</template>

<script type="text/ecmascript-6">

  import {Button} from 'mint-ui';

  export default {
    name: 'notes',
    methods: {
      goback() {
        window.history.go(-1);
      }
    },
    components: {
      'mt-button': Button
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  ._wrapper
    padding: 0.6rem
    background-color: #f2f2f4
    .content
      .title
        color: #444444
        margin-bottom: 0.5rem
        line-height: 0.5rem
    .submit
      width: 35%
      margin-bottom: 1rem
      margin-left: 32.5%
      font-size: 0.28rem
      padding: 0.13rem 0
      color: #fff
      background-color: #127ce0
      border-radius: 5px
      height: auto
</style>

<style lang="stylus" rel="stylesheet/stylus">

</style>
