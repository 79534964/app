<template>
  <div class="wrapper">
    <before></before>
    <after ref="afterNode"></after>
    <div v-if="quesFlag">
      <div class="number">
        <img :src="`${$store.state.imgUrl}question${quesIterator && quesIterator.getCurrent()}.png`">
      </div>
      <div class="content">
        <img :src="`${$store.state.imgUrl}content.png`"/>
        <div class="index">
          {{quesIterator && quesIterator.getCurrent()}}/{{ques.length}}
        </div>
        <div class="text">
          <span>{{getCurData && getCurData.question}}</span>
        </div>
      </div>
      <div class="answer" v-if="getCurData">
        <div class="btn" v-for="answer in getCurData.answers" @click="tapAnswer(answer.id)">
          <div class="p">
            <span>{{answer.answer}}</span>
          </div>
          <img v-if="answer.id === curAnswer" src="./cur.png"/>
          <img v-else src="./btn.png"/>
        </div>
      </div>
      <div class="bottom" v-if="quesIterator && quesIterator.getCurrent() !== ques.length">
        <div class="left" v-if="quesIterator.getCurrent() > 1" @click="goBack()">
          <img src="./left.png"/>
        </div>
        <div class="right" @click="goNext()">
          <img src="./right.png"/>
        </div>
      </div>
      <div class="bottom" v-else>
        <div class="left" :style="{marginLeft:'0.3rem'}" @click="goNext()">
          <img src="./coupon.png"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Iterator from '@/common/js/iterator';
  import {Toast, MessageBox} from 'mint-ui';
  import before from './before/before';
  import after from './after/after';
  import {userTypeMixin, locationMixin} from '@/common/js/mixins';

  export default {
    name: 'index',
    mixins: [userTypeMixin, locationMixin],
    data() {
      return {
        quesFlag: false,
        quesIterator: null,
        getCurData: null,
        curAnswer: '',
        selectObject: {}
      };
    },
    methods: {
      getQues() {
        let {batch} = this.$route.query;
        this.$store.dispatch('index/act/QUES', {
          Vue: this,
          batch: batch || ''
        }).then(() => {
          this.$store.dispatch('common/act/LOADING', {loading: false});
          this.quesIterator = new Iterator(this.ques);
          this.goIterator('next');
          this.quesFlag = true;
        });
      },
      goIterator(type) {
        let data;
        if (type === 'next') {
          data = this.quesIterator.next();
        } else {
          data = this.quesIterator.back();
        }
        let {isDone, getCurData} = data;
        if (!isDone) {
          this.getCurData = getCurData;
        } else {
          this.getCurData = null;
        }
        return isDone;
      },
      tapAnswer(id) {
        this.curAnswer = id;
      },
      goBack() {
        this.goIterator('back');
        this.reduceSelectObject();
      },
      goNext() {
        if (this.curAnswer === '') {
          Toast({message: '您还没有选择呢~'});
          return;
        }
        this.addSelectObject();
        this.goIterator('next');
        this.getCurAnswer();
        if (this.quesIterator.getCurrent() === this.ques.length + 1) {
          this.quesFlag = false;
          this.$refs.afterNode.open();
          this.$refs.afterNode.submit(this.selectObject);
        }
      },
      addSelectObject() {
        this.selectObject[`qid${this.quesIterator.getCurrent()}`] = this.curAnswer;
      },
      reduceSelectObject() {
        this.getCurAnswer();
      },
      getCurAnswer() {
        this.curAnswer = this.selectObject[`qid${this.quesIterator.getCurrent()}`] || '';
      }
    },
    async created() {
      this.$store.dispatch('common/act/LOADING', {loading: true});
      await this.mixin_location();
      await this.$store.dispatch('index/act/MACHINES', {Vue: this});
      if (this.machines.length === 0) {
        this.$store.dispatch('common/act/LOADING', {loading: false});
        MessageBox.alert('您还没用过我们机器，快来下一单吧');
        return;
      }
      this.getQues();
    },
    computed: {
      ques() {
        return this.$store.getters['index/get/QUES'];
      },
      machines() {
        return this.$store.getters['index/get/MACHINES'];
      }
    },
    components: {
      after,
      before
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    .number
      width: 30%
      padding: 1.2rem 35% 0.1rem
    .content
      position: relative
      margin: 0 0.7rem
      .index
        position: absolute
        left: 50%
        top: 0
        width: 1.5rem
        text-align: center
        background-color: #fff
        margin-left: -0.75rem
        font-size: 0.33rem
        border: 1px solid
        border-radius: 0.3rem
        padding: 0.1rem 0
      .text
        position absolute
        left: 0
        right: 0
        top: 0
        bottom: 0
        display: flex
        flex-direction: column
        justify-content: space-around
        padding: 0.3rem
        span
          line-height: 0.4rem
          font-size: 0.33rem
          margin-top: -0.3rem
    .answer
      margin: 0.5rem 0.7rem
      .btn
        position: relative
        margin-bottom: 0.2rem
        .p
          display: flex
          justify-content: center
          position: absolute
          left: 0
          right: 0
          top: 0
          bottom: 0
          span
            font-size: 0.33rem
            padding-top: 0.2rem
    .bottom
      display: flex
      justify-content: space-around
      padding: 0 0.4rem
      img
        width: 2.7rem
</style>
