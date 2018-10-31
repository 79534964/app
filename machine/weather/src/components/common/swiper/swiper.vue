<template>
    <div class="common-swiper" ref="scrollWrapper">
        <ul ref="ulNode" :style="`width: ${length * 100}%`">
            <slot></slot>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">

    import BScroll from 'better-scroll';

    export default {
        data() {
            return {
                myScroll: null,
                length: 0,
                timer: -1,
                interval: 10000,
                inter: -1
            };
        },
        methods: {
            init() {
                if (this.length === 0) {
                    this.length = this.$refs.ulNode.children.length + 2;
                }
                this.myScroll = new BScroll(this.$refs.scrollWrapper, {
                    scrollX: true,
                    scrollY: false,
                    probeType: 3,
                    snap: {
                        loop: true,
                        speed: 700
                    },
                    click: true
                });
                this.myScroll.on('scrollEnd', (pos) => {
//                        if (this.myScroll.getCurrentPage().pageX === 2) {
//                            this.myScroll.disable();
//                        } else {
//                            this.myScroll.enable();
//                        }
                    this.$emit('getCurrent', this.myScroll.getCurrentPage().pageX);
                    if (this.myScroll.getCurrentPage().pageX === 0) {
                        this.update();
                    }
                    this.play();
                });

                this.myScroll.on('touchEnd', () => {
                    this.play();
                });
                this.myScroll.on('beforeScrollStart', () => {
                    window.clearTimeout(this.timer);
                });

                this.clear();
                this.inter = window.setInterval(() => {
                    this.myScroll.next();
                }, this.interval);
            },
            goSwiper(index) {
                this.myScroll.goToPage(index, 0);
            },
            play() {
                this.clear();
                this.timer = window.setTimeout(() => {
                    this.myScroll.next();
                }, this.interval);
            },
            clear() {
                if (this.inter !== -1) {
                    window.clearInterval(this.inter);
                }
                if (this.timer !== -1) {
                    window.clearTimeout(this.timer);
                }
            },
            update() {
                if (this.myScroll) {
                    this.myScroll.destroy();
                }
                this.$nextTick(() => {
                    this.init();
                });
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .common-swiper
        height: 100%
        overflow: hidden
        ul
            display: flex
            height: 100%
            li
                flex: 1
                position: relative
</style>
