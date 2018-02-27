<template>
        <div>
            <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
                <div class="mbx">
                    <mu-list>
                        <mu-sub-header>
                            播放列表
                            <span style="float: right;margin-right: 20px;" @click="clearAll()">清空</span>
                        </mu-sub-header>
                        <template v-for="(item,index) in playerBarJson.barLists">
                            <mu-list-item :title="item.name" @click="playMusic2(item)" :class="{colorRed:index==playerBarJson.currentArrIndex}">
                                <!--<mu-icon value="chat_bubble" slot="right" @click="removeList(index)"/>-->
                               <span slot="right" @click="removeList(index)">x</span>
                            </mu-list-item>
                            <mu-divider/>
                        </template>
                    </mu-list>
                </div>
            </mu-bottom-sheet>
            <div class="foot p10">
                <div>
                    <div style="padding-bottom: 10px;">
                        <div style="background: #ce3d3a;height: 2px;position: absolute;z-index: 100;left: 0;" :style="{width:widthProgress}"></div>
                        <div style="background: #757575;height: 2px;width: 100%;position: absolute;left: 0;"></div>
                    </div>
                    <div class="bar">
                        <audio :src=playerBarJson.currentProgressArr.songSrc  autoplay @canplay="playMusic()" @error="error()" @ended="next()" @timeupdate="timeupdate()" id="audioPlay2"></audio>
                        <div class="dib mr10">
                            <mu-circular-progress v-show="!loading" :size="30"/>
                            <img :src=playerBarJson.currentProgressArr.songImg alt="" v-show="loading" width="40px" height="40px" class="radio-cover">
                        </div>
                        <div class="dib">
                            <p class="fz18">{{playerBarJson.currentProgressArr.songName | limitLen}}</p>
                            <p class="grey fz10">{{playerBarJson.currentProgressArr.singerName}}</p>
                        </div>
                        <div class="dib fr">
                            <mu-icon-button class="mini-btn play-list" @click="changeBottomSheet"/>
                            <mu-icon-button class="mini-btn play" :class="{pause:!playing}" @click="toggleStatus"/>
                            <mu-icon-button class="mini-btn next" @click="next()"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="space"></div>
        </div>
</template>

<script>
    import api from '../api/index.js'
    export default {
        data () {
            return {
                loading: true,
                bottomSheet:false,
                timer:"",
                a:0,
                b:0
            }
        },
        computed:{
            playerBarJson:function(){
                return this.$store.state.playerBarJson;
            },
            playing:function(){
                return this.$store.state.playerBarJson.playing;
            },
            widthProgress:function(){
                return this.$store.state.playerBarJson.widthProgress;
            }
        },
        methods:{
            playMusic(){
                this.$store.commit("startIcon");
            },
            playMusic2(item){
                this.$store.commit("playMusic",item);
            },
            error(){
                if(this.$store.state.playerBarJson.barLists.length>0){
                    console.log("音乐出错了");
                }
            },
            next(){
                this.$store.commit("next");
            },
            timeupdate(){
                var audioPlay=document.getElementById("audioPlay2");
                this.$store.commit("timeupdate",audioPlay.currentTime);
                this.$store.commit("widthProgress",audioPlay.currentTime/audioPlay.duration*100+"%");
            },
            toggleStatus(){
                this.$store.commit("toggleStatus");
                var audioPlay=document.getElementById("audioPlay2");
                if(this.playing){
                    audioPlay.play();
                }
                else{
                    audioPlay.pause();
                }
            },
            closeBottomSheet(){
                this.bottomSheet = false
            },
            changeBottomSheet(){
                this.bottomSheet = !this.bottomSheet;
            },
            removeList(index){
                this.$store.commit("removeList",{index:index});
            },
            clearAll(){
                this.$store.commit("clearAll");
                this.bottomSheet = !this.bottomSheet;
            }
        },
        filters:{
            limitLen(name){
                if(name){
                    return name.length>7?name.substring(0,7)+"...":name;
                }
            }
        }
    }
</script>

<style lang="less">
/*@import "../assets/theme.less";*/
.space{
    width: 100%;
    height: 0.76rem;
    background: white;
    display: block;
    bottom: 0;
}
.colorRed .mu-item-title{
    color:red !important;
}
.mbx{
    margin-bottom:70px;
}
.foot{
    position:fixed;
    bottom:0;
    background-color: rgba(255, 255, 255, 1);
    width: 100%;
    z-index:20141263;
}
.cover{
    background-color: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    z-index:-1;
}
.bar{
    background-color: rgba(255, 255, 255, 0.9);
}
.mini-btn{
    width: 46px;
    height: 46px;
}
.play-list{
    background:url('/static/playbar_btn_playList.png') no-repeat;
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
.mu-list{
    max-height: 4rem;
}

</style>
