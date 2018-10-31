<template>
    <div class="_wrapper">
        <div class="background">
            <img src="./background.png"/>
        </div>
        <div class="content">
            <div class="time" v-for="e in list" :key="e.time">
                <div class="watch">
                    <horologe :time="e.time"></horologe>
                </div>
                <p class="city">{{e.city}}</p>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">

    import horologe from '@/components/common/horologe/horologe';

    export default {
        data() {
            return {
                list: [{
                    city: 'BEIJING',
                    time: 0
                }, {
                    city: 'TOKYO',
                    time: 1 * 60 * 60 * 1000
                }, {
                    city: 'PARIS',
                    time: -6 * 60 * 60 * 1000
                }, {
                    city: 'LONDON',
                    time: -7 * 60 * 60 * 1000
                }, {
                    city: 'NEWYORK',
                    time: -12 * 60 * 60 * 1000
                }]
            };
        },
        components: {
            horologe
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    ._wrapper
        position: absolute
        right: 0
        left: 0
        top: 0
        bottom: 0
        .background
            position: absolute
            right: 0
            left: 0
            top: 0
            z-index: -1
        .content
            display: flex
            font-size: 22px
            margin-top: 80px
            align-items: center
            padding: 0 20px
            .time
                flex: 1
                .watch
                    width: 135px
                    margin: 0 auto
                    margin-bottom: 5px
                .city
                    text-align: center
                    color: #707070
</style>
