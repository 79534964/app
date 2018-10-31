<template>
    <div class="index-navigation">
        <img v-show="index === 0" src="./nav0.png"/>
        <img v-show="index === 1" src="./nav1.png"/>
        <img v-show="index === 2" src="./nav2.png"/>
        <div class="weather" @click="goSwiper(0)"></div>
        <div class="clock" @click="goSwiper(1)"></div>
        <div class="traffic" @click="goSwiper(2)"></div>
    </div>
</template>

<script type="text/ecmascript-6">

    export default {
        data() {
            return {
                index: 0
            };
        },
        methods: {
            goSwiper(index) {
                this.$emit('goSwiper', index);
            },
            setIndex(index) {
                this.index = index;
            }
        }
    };

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .index-navigation
        position: absolute
        bottom: 40px
        right: 20px
        width: 170px
        .weather
            position: absolute
            left: 27px
            right: 26px
            top: 143px
            height: 32px
        .clock
            position: absolute
            left: 27px
            right: 26px
            top: 183px
            height: 32px
        .traffic
            position: absolute
            left: 27px
            right: 26px
            top: 222px
            height: 32px
</style>
