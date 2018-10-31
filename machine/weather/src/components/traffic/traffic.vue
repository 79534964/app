<template>
    <div class="_wrapper">
        <div class="map" id="map"></div>
        <div class="content">
            <div class="top">
                <div class="left">
                    <div class="btn">实时</div>
                </div>
                <div class="right">
                    <span>畅通</span>
                    <ul class="ul">
                        <li class="level1"></li>
                        <li class="level2"></li>
                        <li class="level3"></li>
                        <li class="level4"></li>
                    </ul>
                    <span>拥堵</span>
                </div>
            </div>
            <div class="bottom">
                <div class="time">更新时间：</div>
                <div class="day">{{getTime()}}</div>
            </div>
        </div>
        <div class="button">
            <div class="refresh" @click="init()">
                <img src="./refresh.png"/>
            </div>

            <div class="add" @click="setZoom('add')">
                <img src="./add.png"/>
            </div>

            <div class="minus" @click="setZoom('minus')">
                <img src="./minus.png"/>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">

    import {dateFormat} from '@/common/js/utils';

    export default {
        data() {
            return {
                map: null,
                markers: [],
                time: null,
                interTime: -1,
                zoom: 17
            };
        },
        methods: {
            init() {
                if (this.map === null) {
                    this.map = new window.AMap.Map('map', {
                        resizeEnable: true,
                        center: [this.location.lng, this.location.lat],
                        zoom: 17,
                        touchZoom: false,
                        dragEnable: false
                    });
                    let marker = new window.AMap.Marker({
                        position: [this.location.lng, this.location.lat],
                        icon: new window.AMap.Icon({
                            image: `${this.$store.state.imgUrl}index/maps/my.png`
                        })
                    });
                    marker.setMap(this.map);
                    let trafficLayer = new window.AMap.TileLayer.Traffic({
                        // 层级
                        zIndex: 2,
                        // 实时 180s默认
                        autoRefresh: true
                    });
                    trafficLayer.setMap(this.map);
                } else {
                    this.map.panTo([this.location.lng, this.location.lat]);
                }
                this.initTime();
            },
            initTime() {
                this.time = new Date();
                if (this.interTime !== -1) {
                    window.clearInterval(this.interTime);
                }
                this.interTime = window.setInterval(() => {
                    this.time = new Date();
                }, 1000 * 60 * 3);
            },
            getTime() {
                return dateFormat(this.time, 'yyyy-MM-dd hh:mm:ss');
            },
            setZoom(type = 'add') {
                if (type === 'minus') {
                    if (this.zoom > 3) {
                        this.zoom--;
                    }
                }
                if (type === 'add') {
                    if (this.zoom < 18) {
                        this.zoom++;
                    }
                }
                this.map.setZoom(this.zoom);
            }
        },
        mounted() {
            this.init();
        },
        computed: {
            location() {
                return this.$store.getters['common/get/LOCATION'];
            }
        }
    };

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    ._wrapper
        position absolute
        left: 0
        right: 0
        top: 0
        bottom: 0
        .button
            display: flex
            position: absolute
            left: 60px
            bottom: 60px
            width: 200px
            .refresh
                width: 40px
                height: 40px
                padding: 10px
                box-sizing: border-box
                box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15)
                background: #fff
                border-radius: 3px
            .add
                width: 40px
                height: 40px
                padding: 10px
                box-sizing: border-box
                box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15)
                background: #fff
                border-radius: 3px
                margin-left: 40px
            .minus
                width: 40px
                height: 40px
                padding: 10px
                box-sizing: border-box
                box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15)
                background: #fff
                border-radius: 3px
                margin-left: 20px
        .map
            position absolute
            left: 0
            right: 0
            top: 0
            bottom: 0
        .content
            position: absolute
            top: 58px
            right: 30px
            width: 320px
            background: #FFF
            border-radius: 3px
            padding: 12px
            z-index: 9
            box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .2), 0 2px 6px 0 rgba(0, 0, 0, .19)
            .top
                display: flex
                justify-content: space-between
                .left
                    height: 28px
                    line-height: 28px
                    border: 1px solid #0f89f5
                    border-radius: 2px
                    .btn
                        text-align: center
                        width: 48px
                        background: #0f89f5
                        color: #FFF
                        font-size: 14px
                .right
                    display: flex
                    justify-content: space-between
                    align-items: center
                    font-size: 15px
                    .ul
                        display: flex
                        margin: 0 14px
                        li
                            width: 30px
                            height: 6px
                        .level1
                            background: #34b000
                        .level2
                            background: #fecb00
                        .level3
                            background: #df0100
                        .level4
                            background: #8e0e0b
            .bottom
                display: flex
                font-size: 13px
                margin-top: 15px
                .time
                    color: #999
                .day
                    color: #565656
</style>
