<template>
  <div class="data-machine-wrapper" v-loading="loading" element-loading-text="拼命加载中...">
    <div class="header-wrapper">
      <div class="block">
        <span class="demonstration">选择查询时间:</span>
        <el-date-picker
          v-model="timeValue"
          type="daterange"
          align="right"
          placeholder="请选择查询开始和结束时间"
          :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <el-button type="primary" size="large" @click="query()">查询</el-button>
    </div>
    <div class="content-wrapper">
      <el-table :data="machineList" border height=100%>
        <el-table-column type="expand">
          <template scope="props">
            <div class="clearfix">
              <p>全免订单: {{ props.row.free }}
                <el-progress v-if="props.row.totalCount" type="circle"
                             :percentage="Math.round((props.row.free*100/props.row.totalCount))"></el-progress>
              </p>
              <p>付费订单: {{ props.row.totalpayOrderCount }}
                <el-progress v-if="props.row.totalCount" type="circle"
                             :percentage="Math.round((props.row.totalpayOrderCount*100/props.row.totalCount))"></el-progress>
              </p>
            </div>
            <div class="clearfix">
              <p>支付宝订单: {{ props.row.aliOrderNumber }}
                <el-progress v-if="props.row.totalCount" type="circle"
                             :percentage="Math.round((props.row.aliOrderNumber*100/props.row.totalCount))"></el-progress>
              </p>
              <p>微信订单: {{ props.row.wxOrderNumber }}
                <el-progress v-if="props.row.totalCount" type="circle"
                             :percentage="Math.round((props.row.wxOrderNumber*100/props.row.totalCount))"></el-progress>
              </p>
              <p>app订单: {{ props.row.appOrderNumber }}
                <el-progress v-if="props.row.totalCount" type="circle"
                             :percentage="Math.round((props.row.appOrderNumber*100/props.row.totalCount))"></el-progress>
              </p>
            </div>
            <div class="clearfix">
              <p>三元订单: {{ props.row.three }}
                <el-progress v-if="props.row.totalCount" type="circle"
                             :percentage="Math.round((props.row.three*100/props.row.totalCount))"></el-progress>
              </p>
              <p>五元订单: {{ props.row.five }}
                <el-progress v-if="props.row.totalCount" type="circle"
                             :percentage="Math.round((props.row.five*100/props.row.totalCount))"></el-progress>
              </p>
              <p>半价订单: {{ props.row.helfPrice }}
                <el-progress v-if="props.row.totalCount" type="circle"
                             :percentage="Math.round((props.row.helfPrice*100/props.row.totalCount))"></el-progress>
              </p>
              <p>其他订单: {{ props.row.otherCount }}
                <el-progress v-if="props.row.totalCount" type="circle"
                             :percentage="Math.round((props.row.otherCount*100/props.row.totalCount))"></el-progress>
              </p>
              <p>全额订单: {{ props.row.completePrice }}
                <el-progress v-if="props.row.totalCount" type="circle"
                             :percentage="Math.round((props.row.completePrice*100/props.row.totalCount))"></el-progress>
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="机器名称" prop="machineName"></el-table-column>
        <el-table-column label="机器代数" prop="machineSuppierId"></el-table-column>
        <el-table-column label="首杯三元" prop="firstthree"></el-table-column>
        <el-table-column label="订单总计" prop="totalCount"></el-table-column>
        <el-table-column label="实付金额" prop="countPay"></el-table-column>
        <el-table-column label="其他金额" prop="otherPay"></el-table-column>
        <el-table-column label="金额总计" prop="totalPay"></el-table-column>
        <el-table-column label="客单价" prop="perticket"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '当天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime());
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        loading: false
      };
    },
    methods: {
      query() {
        this.$store.dispatch('dataMachine', {
          vue: this
        });
      }
    },
    computed: {
      machineList () {
        return this.$store.getters.getDataMachineMachineList;
      },
      timeValue: {
        get () {
          return this.$store.getters.getDataMachineTimeValue;
        },
        set (value) {
          this.$store.commit('SET_DATAMACHINE_TIMEVALUE', value);
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .data-machine-wrapper
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
      .block
        padding-top: 30px
        .demonstration
          font-size: 25px
          padding-right: 25px
        .el-date-editor
          width: 400px
          .el-icon-date
            font-size: 25px
            width: 45px
          .el-input__inner
            height: 50px
            font-size: 19px
      .el-button
        width: 150px
        margin-top: 20px
        width: 200px
        margin-top: 30px
        letter-spacing: 6px
        padding-left: 25px
        font-size: 20px
    .content-wrapper
      position: absolute
      top: 0
      left: 0
      width: 100%
      padding-top: 180px
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
          padding: 0 0 20px 50px
        @keyframes flipInX
          0%
            opacity: 0
            transform: scale3d(1, 0, 1)
          100%
            opacity: 1
        p
          display: inline-block
          width: 142px
          text-align: center
          margin-top: 20px
          .el-progress-circle
            width: 100px !important
            height: 108px !important
            margin-top: 10px
</style>
