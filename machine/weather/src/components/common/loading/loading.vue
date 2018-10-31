<template>
    <transition name="fade-in">
        <div class="common-loading fade-in" v-show="loading">
            <div class="content">
                <img :src="`${$store.state.imgUrl}loading/loading.gif`"/>
            </div>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'common-loading',
        computed: {
            loading() {
                return this.$store.getters['common/get/LOADING'];
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .common-loading
        position: fixed
        top: 0
        bottom: 0
        right: 0
        left: 0
        z-index: 99
        background-color: #f5f5f5
        .content
            position: absolute
            width: 25%
            top: 50%
            left: 50%
            margin-left: -162px
            margin-top: -164px
</style>
