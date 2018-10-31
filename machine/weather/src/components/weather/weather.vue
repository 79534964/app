<template>
    <div class="_wrapper" v-if="weather.days.length > 0">
        <div class="background">
            <img :src="`${$store.state.imgUrl}weather/${weather.day.weatherImg}-background.png`"/>
        </div>
        <div class="icon">
            <img :src="`${$store.state.imgUrl}weather/${weather.day.weatherImg}-white.png`"/>
        </div>
        <div class="top">
            <div class="left">
                <div class="temp">
                    {{weather.day.temperature}}°
                </div>
                <div class="city">
                    <P class="name">{{location.city}}<img src="./address.png"/></P>
                    <P class="yp">{{location.cityPy}}</P>
                    <p class="text">{{weather.days[0].nightTemp}}/{{weather.days[0].dayTemp}}°C</p>
                </div>
                <div class="product">
                    <img :src="`${$store.state.imgUrl}weather/${weather.day.weatherImg}-product.png`"/>
                    <p>{{weather.day.weather}}</p>
                </div>
            </div>
            <div class="right">
                <p class="day">{{time.month}}/{{time.date}} {{time.day}}</p>
                <p class="dayE">{{time.dayE}} {{time.date}} {{time.monthE}}</p>
                <p class="hour">{{time.hour}}:{{time.minute}}</p>
            </div>
        </div>
        <div class="point">
            <img :src="`${$store.state.imgUrl}weather/${weather.day.weatherImg}-point.png`"/>
        </div>
        <div class="content">
            <div>
                <p>{{weather.day.windPower}}级</p>
                <p class="text">{{weather.day.windDirection}}风</p>
            </div>
            <div>
                <p>{{weather.day.humidity}}%</p>
                <p class="text">湿度</p>
            </div>
        </div>
        <div class="bottom">
            <div class="box">
                <div class="item" v-for="(day,index) in weather.days" :key="day.week" v-if="index !== 0">
                    <p>{{getDay(day.date)}}</p>
                    <img :src="`${$store.state.imgUrl}weather/${day.dayWeatherImg}-white.png`"/>
                    <p>{{day.nightTemp}} ~ {{day.dayTemp}}°C</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">

    export default {
        methods: {
            getDay(str) {
                let arr = str.split('-');
                return `${arr[1]}/${arr[2]}`;
            }
        },
        computed: {
            time() {
                return this.$store.getters['common/get/TIME'];
            },
            weather() {
                return this.$store.getters['common/get/WEATHER'];
            },
            location() {
                return this.$store.getters['common/get/LOCATION'];
            }
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
        .icon
            position: absolute
            width: 100px
            left: 30px
            top: 50px
        .top
            display: flex
            justify-content: space-between
            color: #fff
            padding: 85px 50px 0 150px
            .right
                .day
                    font-size: 32px
                .dayE
                    font-size: 30px
                    text-align: center
                    margin-top: 7px
                .hour
                    font-size: 66px
                    text-align: center
            .left
                display: flex
                .temp
                    font-size: 100px
                .city
                    margin-left: 30px
                    padding-top: 12px
                    .name
                        display: flex
                        font-size: 40px
                        align-items: center
                        letter-spacing: 27px
                        img
                            margin-left: -17px
                            width: 24px
                    .yp
                        font-size: 25px
                    .text
                        font-size: 30px
                        margin-top: 4px
                .product
                    margin-left: 23px
                    text-align: center
                    padding-top: 10px
                    img
                        width: 79px
                    p
                        font-size: 24px
                        margin-top: 9px
        .point
            width: 510px
            margin-left: 130px
            margin-bottom: 50px
            margin-top: 10px
        .content
            display: flex
            width: 400px
            margin-left: 117px
            font-size: 26px
            color: #fff
            > div
                text-align: center
                width: 33.33%
                .text
                    font-size: 17px
                    margin-top: 10px
        .bottom
            position: absolute
            bottom: 40px
            left: 0
            right: 162px
            .box
                display: flex
                .item
                    border-left: 2px solid #fff
                    flex: 1
                    color: #fff
                    display: flex
                    flex-direction: column
                    justify-content: space-between
                    align-items: center
                    font-size: 28px
                    &:nth-child(1)
                        border-left: none !important
                    img
                        width: 75px
                        margin: 15px 0 20px 0
</style>
