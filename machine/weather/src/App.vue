<template>
    <div id="app">
        <loading></loading>
        <div class="swiper">
            <swiper ref="swiperNode" @getCurrent="getCurrent">
                <li>
                    <weather></weather>
                </li>
                <li>
                    <clock></clock>
                </li>
                <li>
                    <traffic ref="trafficNode"></traffic>
                </li>
            </swiper>
        </div>
        <navigation @goSwiper="goSwiper" ref="navigationNode"></navigation>
    </div>
</template>

<script type="text/ecmascript-6">

    import swiper from '@/components/common/swiper/swiper';
    import loading from '@/components/common/loading/loading';
    import traffic from '@/components/traffic/traffic';
    import weather from '@/components/weather/weather';
    import clock from '@/components/clock/clock';
    import navigation from '@/components/index/navigation/navigation';

    export default {
        name: 'app',
        methods: {
            init({lng, lat}) {
                this.$store.dispatch('common/act/LOCATION', {lng, lat}).then((city) => {
                    window.setInterval(() => {
                        this.$store.dispatch('common/act/WEATHER', {city});
                    }, 1000 * 60 * 10);
                    this.$store.dispatch('common/act/WEATHER', {city}).then(() => {
                        this.$nextTick(() => {
                            this.$refs.swiperNode.init();
                        });
                    });
                });
                window.setInterval(() => {
                    this.$store.dispatch('common/act/TIME');
                }, 1000);
            },
            goSwiper(index) {
                this.$refs.swiperNode.goSwiper(index);
            },
            getCurrent(index) {
                if (index === 2) {
                    this.$refs.trafficNode.init();
                }
                this.$refs.navigationNode.setIndex(index);
            }
        },
        created() {
            this.init(window.$utils.getUrlBody(window.location.href));
        },
        components: {
            loading,
            traffic,
            swiper,
            weather,
            clock,
            navigation
        }
    };

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    #app
        position: relative
        width: 100%
        height: 100%
        .swiper
            width: 100%
            height: 100%
</style>
