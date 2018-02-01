<template>
  <div class="wrapper" :style="{backgroundImage:`url(${backgroundImgSrc})`}">
    <v-header></v-header>
    <div class="title">
      <img :src="`${$store.state.imgUrl}title.png`" width="100%"/>
    </div>
    <div class="content">
      <v-question></v-question>
      <v-submit></v-submit>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  import {getRandomNum} from '@/common/js/utils';
  import header from './header/header';
  import question from './question/question';
  import submit from './submit/submit';
  import {checkGroupInfoMixin, userTypeMixin} from '@/common/js/mixins';

  export default {
    name: 'index',
    mixins: [checkGroupInfoMixin, userTypeMixin],
    data() {
      return {
        backgroundImgSrc: `${this.$store.state.imgUrl}random_background_${getRandomNum(1, 5)}.jpg`
      };
    },
    created() {
      this.mixin_checkGroupInfo().then(() => {
        this.$store.dispatch('index/act/QUESTION', {Vue: this});
      });
    },
    components: {
      'v-header': header,
      'v-question': question,
      'v-submit': submit
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    background-size: 100%;
    background-repeat: no-repeat
    background-position-y: 3rem
    background-color: #222943
    .title
      margin-top: 0.8rem
    .content
      padding: 0.3rem 0.64rem
</style>
