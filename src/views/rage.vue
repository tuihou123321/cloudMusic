<template>
    <div class="container">
        <!-- swiper -->
        <div class="swiper-box">
            <swiper :options="swiperOption">
                <swiper-slide><img src="/static/banner1.jpg" class="banner-item"  alt=""></swiper-slide>
                <swiper-slide><img src="/static/banner2.jpg" class="banner-item"  alt=""></swiper-slide>
                <swiper-slide><img src="/static/banner3.jpg" class="banner-item"  alt=""></swiper-slide>
                <swiper-slide><img src="/static/banner4.jpg" class="banner-item"  alt=""></swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
        <div class="content">
            <div class="g-title song-list">
                推荐歌单
                <router-link :to="{path:'/'}">更多></router-link>
            </div>

            <mu-flexbox wrap="wrap" justify="space-around" :gutter="0">

                    <mu-flexbox-item class="list-item" basis="32%" v-for="item in swiperOption.playList">
                        <!--<router-link :to="{naplayListDetail.jsontail',params:{}}">-->
                        <router-link :to="{path:'../playListDetail'}">
                            <div class="list-bar">
                               {{item.playCount}}
                            </div>
                            <img :src="item.coverImgUrl+'?param=300y300'" alt="" class="img-response list-img">
                            <div class="list-name">
                               {{item.name}}
                            </div>
                        </router-link>
                    </mu-flexbox-item>

            </mu-flexbox>
        </div>
    </div>
</template>

<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import api from '../api/index.js'

    export default {
        data() {
            return {
                swiperOption: {
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    playList:[],
                    offset:0
                }
            }
        },
        created(){
            this.get();
        },
        methods: {
            get() {
                this.loading = true
                var _this = this;
                _this.$http.get(api.getRage("全部", "hot", _this.swiperOption.offset, true, 6)).then(function (res) {
                    _this.swiperOption.playList=res.data.playlists;
                    _this.loading=false;
                })
            }
        },
        components: {
            swiper,
            swiperSlide
        }
    }
</script>
<style lang="less" scoped>
    /*@import "~swiper/src/less/swiper.less";*/
    @import "~swiper/dist/css/swiper.css";
    .swiper-box img{
        width: 100%;
    }
    .img-response{
        width: 100%;
        height:auto;
    }
    .list{
        &-item{
            margin:0 5px 5px 10px;
            position: relative;
        }
        &-bar{
            position: absolute;
            top: 0;
            left: 0;
            color: #ffffff;
            width: 100%;
            text-align: right;
            padding: 2px 5px;
            background-color:rgba(0,0,0,.2);
        }
        &-img{
            height: 100px;
        }
        &-name{
            -ms-text-overflow: ellipsis;
            text-overflow: ellipsis;
        }
    }
    //通用标题样式
    .g-title{
        padding-left: 25px;
        color: #333333;
        height: 35px;
        line-height: 35px;
        font-size: 16px;
        a{
            float: right;
            font-size: 12px;
            color: #666666;
        }
    }
    //推荐歌单
    .song-list{
        background: url("../../static/aei.png") no-repeat left center;
        -webkit-background-size: 20px 20px;
        background-size: 20px 20px;
    }
    .content{
        padding: 0 5px;
    }
</style>
