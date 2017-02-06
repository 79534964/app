<template>
  <div class="order-query-wrapper" v-loading="loading" element-loading-text="拼命加载中...">
    <div class="header-wrapper">
      <el-radio-group v-model="radioValue" fill="#0663a2">
        <el-tooltip content="根据订单编号查询" placement="top" effect="light">
          <el-radio-button label="orderid">订单编号</el-radio-button>
        </el-tooltip>
        <el-tooltip content="根据用户昵称查询" placement="top" effect="light">
          <el-radio-button label="nickname">用户昵称</el-radio-button>
        </el-tooltip>
        <el-tooltip content="根据机器编号查询" placement="top" effect="light">
          <el-radio-button label="machineid">机器编号</el-radio-button>
        </el-tooltip>
        <el-tooltip content="根据机器名称查询" placement="top" effect="light">
          <el-radio-button label="machinename">机器名称</el-radio-button>
        </el-tooltip>
        <el-tooltip content="根据用户手机号查询" placement="top" effect="light">
          <el-radio-button label="mobile">用户手机号</el-radio-button>
        </el-tooltip>
      </el-radio-group>
      <div class="demo-input-size">
        <el-input size="large" placeholder="请输入:用户昵称、订单编号、机器名称或编号" v-model="inputValue">
        </el-input>
      </div>
      <el-button type="primary" size="large" @click="query()">查询</el-button>
    </div>
    <div class="content-wrapper">
      <el-table :data="orderList" border height=100%>
        <el-table-column type="expand">
          <template scope="props">
            <p>用户类型: {{ props.row.usertype }}</p>
            <p>用户昵称: {{ props.row.nickname }}</p>
            <p>用户手机号: {{ props.row.mobile }}</p>
            <p>优惠券: {{ props.row.rulename }}</p>
            <p>优惠金额: {{ props.row.productcouponprice }}</p>
            <p>下单时间: {{ props.row.createtime }}</p>
            <p>支付金额: {{ props.row.payprice }}</p>
            <p>支付方式: {{ props.row.paychannel }}</p>
          </template>
        </el-table-column>
        <el-table-column label="订单编号" prop="orderid"></el-table-column>
        <el-table-column label="创建时间" prop="createtime"></el-table-column>
        <el-table-column label="商品名称" prop="productname"></el-table-column>
        <el-table-column label="订单状态" prop="status"></el-table-column>
        <el-table-column label="下单机器" prop="machinename"></el-table-column>
      </el-table>
    </div>
    <div class="page-wrapper">
      <el-pagination @current-change="handleCurrentChange" :current-page="currentPage"
                     :page-size="10" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        loading: false
      };
    },
    methods: {
      query() {
        this.$store.dispatch('orderQuery/act/ORDERQUERY', {
          Vue: this,
          page: 1
        });
      },
      handleCurrentChange(val) {
        this.$store.dispatch('orderQuery/act/ORDERQUERY', {
          Vue: this,
          page: val
        });
      }
    },
    computed: {
      radioValue: {
        get () {
          return this.$store.getters['orderQuery/get/RADIOVALUE'];
        },
        set (value) {
          this.$store.commit('orderQuery/set/RADIOVALUE', value);
        }
      },
      inputValue: {
        get () {
          return this.$store.getters['orderQuery/get/INPUTVALUE'];
        },
        set (value) {
          this.$store.commit('orderQuery/set/INPUTVALUE', value);
        }
      },
      total () {
        return this.$store.getters['orderQuery/get/TOTAL'];
      },
      orderList () {
        return this.$store.getters['orderQuery/get/ORDERLIST'];
      },
      currentPage () {
        return this.$store.getters['orderQuery/get/PAGENUMBER'];
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .order-query-wrapper
    position: relative
    .header-wrapper
      position: absolute
      z-index 1
      top: 0
      left: 0
      width: 100%
      height: 180px
      text-align: center
      border-bottom-color: #b6b6b6
      border-bottom-style: solid
      border-bottom-width: 1px
      .el-radio-group
        padding-top: 10px
        .el-tooltip
          .el-radio-button__inner
            font-size: 18px
            border: none
            border-radius: 4px
            padding: 13px 20px
      .demo-input-size
        margin-top 10px
        .el-input
          width: 570px
          .el-input__inner
            height: 50px
            font-size: 23px
      .el-button
        width: 150px
        margin-top: 20px
        width: 200px
        margin-top: 10px
        letter-spacing: 6px
        padding-left: 25px
        font-size: 20px
    .content-wrapper
      position: absolute
      top: 0
      left: 0
      width: 100%
      padding-top: 180px
      padding-bottom: 70px
      box-sizing: border-box
      height: 100%
      .el-table
        width: 100%
        .el-table__body-wrapper
          overflow-x: hidden
        .el-table__empty-text
          font-size: 25px
        .el-table__expanded-cell
          animation: flipInX 0.5s forwards
          padding: 0 50px
        @keyframes flipInX
          0%
            opacity: 0
            transform: scale3d(1, 0, 1)
          100%
            opacity: 1
        p
          margin: 30px 0
          .el-progress-circle
            width: 100px !important
            height: 108px !important
            margin-top: 10px
    .page-wrapper
      position: absolute
      width: 100%
      left: 0
      bottom: 0
      height: 70px
</style>
