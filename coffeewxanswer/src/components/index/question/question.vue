<template>
  <div class="_wrapper index_question">
    <div class="header">
      <p>{{question.question}}</p>
    </div>
    <div class="content">
      <div class="hidden" v-if="answerValue !== null"></div>
      <div v-if="question.answerType === 1" class="radio">
        <mt-radio v-model="answerValue !== null ? answerValue : value" :options="answerList">
        </mt-radio>
      </div>
      <div v-if="question.answerType === 2" class="input">
        <textarea class="mint-field-core" v-model="answerValue !== null ? answerValue : value"
                  maxlength="60"></textarea>
      </div>
    </div>
    <div class="bottom" v-if="answerValue === null && question.id !== ''">
      <div class="btn" @click="submit()">提交答案</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Radio, Toast} from 'mint-ui';

  export default {
    name: 'v-question',
    data() {
      return {
        value: ''
      };
    },
    methods: {
      submit() {
        if (this.question.answerType === 1 && this.value === '') {
          Toast('请选择答案');
          return false;
        }
        this.$store.dispatch('index/act/SUBMITQUESTION', {
          Vue: this,
          answerId: this.value,
          questionId: this.question.id
        });
      }
    },
    computed: {
      question() {
        return this.$store.getters['index/get/QUESTION'];
      },
      answerList() {
        return this.$store.getters['index/get/ANSWERLIST'];
      },
      answerValue() {
        return this.$store.getters['index/get/ANSWERVALUE'];
      }
    },
    components: {
      'mt-radio': Radio
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  ._wrapper
    padding-bottom: 0.2rem
    .header
      color: #fff
      font-size: 0.33rem
      margin-bottom: 0.2rem
      p
        word-break: break-word
    .content
      position: relative
      .hidden
        position: absolute
        top: 0
        bottom: 0
        left: 0
        right: 0
        z-index 1
    .bottom
      height: 0.9rem
      line-height: 0.9rem
      margin-top: 0.5rem
      .btn
        height: 100%
        text-align: center
        font-size: 0.35rem
        background-color: #fbc000
        color: #672614
        border: 1px solid #b14f2c
</style>

<style lang="stylus" rel="stylesheet/stylus">
  .index_question
    .content
      .radio
        .mint-radiolist-title
          display: none
        .mint-cell
          background: none
          color: #fff
          .mint-cell-wrapper
            padding: 0
            background-image: none
            .mint-radiolist-label
              padding-left: 0
            .mint-radio
              .mint-radio-core
                background: none
              .mint-radio-input:checked + .mint-radio-core
                border-color: #fbc000
              .mint-radio-input:checked + .mint-radio-core::after
                background-color: #fbc000
      .input
        font-size: 0.3rem
        height: 100%
        textarea
          height: 95%
          width: 98%
          background: none
          padding: 2%
          box-sizing: border-box
          border: 1px solid #a0a0a2
          font-size: 0.3rem
          color: #fff
          font-weight: 600
</style>
