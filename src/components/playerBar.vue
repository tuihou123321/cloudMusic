<template>
    <div v-if="playMusicAll">
    <div class="foot p10">
        <div class="dib mr10">
            <mu-circular-progress v-show="!loading" :size="30"/>
            <img src="/static/banner1.jpg" alt="" v-show="loading" width="40px" height="40px" class="radio-cover">
        </div>
        <div class="dib">
            <p class="fz18">那么骄傲</p>
            <p class="grey fz10">金海心</p>
        </div>
        <div class="dib fr">
            <mu-icon-button class="mini-btn play-list" @click="showList"/>
            <mu-icon-button class="mini-btn play" :class="{pause:playing}" @click="toggleStatus"/>
            <mu-icon-button class="mini-btn next" @click="next"/>
        </div>
    </div>
    </div>
</template>

<script>
    import api from '../api/index.js'
    export default {
        data () {
            return {
                loading: true,
                playing:false,
                playMusicAll:1
            }
        },
        mounted () {
//            this.playMusicAll=JSON.parse(localStorage.getItem("playMusicAll"));
//            console.log(this.playMusicAll);
        },
        methods:{
            toggleStatus(){
                this.playing=!this.playing;
            },
            next(){
            },
            showList(){
            }
        }
    }
</script>

<style lang="less">
@import "../assets/theme.less";
.foot{
    position:fixed;
    bottom:0;
    background-color: rgba(255, 255, 255, 0.9);
    width: 100%;
}
.mini-btn{
    width: 46px;
    height: 46px;
}
.play-list{
    background:url('/static/playbar_btn_playlist.png') no-repeat;
    background-size: cover;
}
.play{
    background:url('/static/playbar_btn_play.png') no-repeat;
    background-size: cover;
}
.pause{
    background:url('/static/playbar_btn_pause.png') no-repeat !important;
    background-size: cover !important;
}
.next{
    background:url('/static/playbar_btn_next.png') no-repeat;
    background-size: cover;
}
.radio-cover{
    vertical-align: bottom;
}

</style>
