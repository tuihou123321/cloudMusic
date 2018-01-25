<template>
    <!--<div v-if="playerBarJson.barLists.length!=81" v-show="playerBarJson.barLists.length>0">-->
        <!--<div  v-if="playerBarJson.barLists.length>0">-->
        <div>
            <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
                <div class="mbx">
                    <mu-list>
                        <mu-sub-header>
                            播放列表
                            <span style="float: right;margin-right: 20px;" @click="clearAll()">清空</span>
                        </mu-sub-header>
                        <template v-for="(item,index) in playerBarJson.barLists">
                            <mu-list-item :title="item.name" @click="startPlay(item,index)" :class="{colorRed:index==playerBarJson.currentArrIndex}">
                                <mu-icon value="chat_bubble" slot="right" @click="removeList(index)"/>
                            </mu-list-item>
                            <mu-divider/>
                        </template>
                    </mu-list>
                </div>
            </mu-bottom-sheet>
            <div class="foot p10">
                <div>
                    <div id="progress" style="padding-bottom: 10px;">
                        <div style="background: #ce3d3a;height: 2px;position: absolute;z-index: 100;left: 0;" :style="{width:widthProgress}"></div>
                        <div style="background: #757575;height: 2px;width: 100%;position: absolute;left: 0;"></div>
                    </div>
                    <div class="bar">
                        <audio :src=playerBarJson.currentProgressArr.songSrc id="audioPlay" autoplay></audio>
                        <div class="dib mr10">
                            <mu-circular-progress v-show="!loading" :size="30"/>
                            <img :src=playerBarJson.currentProgressArr.songImg alt="" v-show="loading" width="40px" height="40px" class="radio-cover">
                        </div>
                        <div class="dib">
                            <p class="fz18">{{playerBarJson.currentProgressArr.songName}}</p>
                            <p class="grey fz10">{{playerBarJson.currentProgressArr.singerName}}</p>
                        </div>
                        <div class="dib fr">
                            <mu-icon-button class="mini-btn play-list" @click="changeBottomSheet"/>
                            <mu-icon-button class="mini-btn play" :class="{pause:!playing}" @click="toggleStatus"/>
                            <mu-icon-button class="mini-btn next" @click="nextMusic()"/>
                        </div>
                    </div>
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
            toggleStatus(){
                var _this=this;
                this.$store.commit("changePlayIcon");
                var audioPlay=document.getElementById("audioPlay");
                if(_this.playing){
                    audioPlay.play();
                    _this.timer=setInterval(function(){
//                        _this.$store.commit("toggleState");
                        _this.$store.state.playerBarJson.currentTime++;
                        _this.$store.state.playerBarJson.widthProgress=audioPlay.currentTime/audioPlay.duration*100+"%"
                    },1000)
                }
                else{
                    clearInterval(_this.timer);
                    audioPlay.pause();
                }
            },
            closeBottomSheet () {
                this.bottomSheet = false
            },
            openBottomSheet () {
                this.bottomSheet = true
            },
            changeBottomSheet () {
                this.bottomSheet = !this.bottomSheet;
            },
            removeList(index){
                this.$store.commit("removeList",{index:index});
            },
            clearAll(){
                this.$store.commit("clearAll");
            },
            barListsFun(arr){
               this.$store.commit("barListsFun",arr);
            },
            startPlay(objParm,index){
                if(index>=0){
                    this.playerBarJson.currentArrIndex=index;
                }
              this.startPlay2(objParm);
            },
            startPlay2(objParm){
                 this.$store.commit("startPlay2",{obj:objParm});
            },
            nextMusic:function(){
                this.$store.commit("nextMusic");
            }
        }
    }
</script>

<style lang="less">
/*@import "../assets/theme.less";*/
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
