<template>
    <!--<div v-if="barLists.length!=81" v-show="barLists.length>0">-->
        <div  v-if="barLists.length>0">
            <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
                <div class="mbx">
                    <mu-list>
                        <mu-sub-header>
                            播放列表
                            <span style="float: right;margin-right: 20px;" @click="clearAll()">清空</span>
                        </mu-sub-header>
                        <template v-for="(item,index) in barLists">
                            <mu-list-item :title="item.name">
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
                        <audio :src=currentProgressArr.songSrc id="audioPlay" autoplay></audio>
                        <div class="dib mr10">
                            <mu-circular-progress v-show="!loading" :size="30"/>
                            <img :src=currentProgressArr.songImg alt="" v-show="loading" width="40px" height="40px" class="radio-cover">
                        </div>
                        <div class="dib">
                            <p class="fz18">{{currentProgressArr.songName}}</p>
                            <p class="grey fz10">{{currentProgressArr.singerName}}</p>
                        </div>
                        <div class="dib fr">
                            <mu-icon-button class="mini-btn play-list" @click="changeBottomSheet"/>
                            <mu-icon-button class="mini-btn play" :class="{pause:playing}" @click="toggleStatus"/>
                            <mu-icon-button class="mini-btn next" @click="next"/>
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
                playing:false,
                currentArrIndex:"", //当前播放的索引
                bottomSheet:false,
                widthProgress:"0%",  //当前播放的进度条
                currentTime:0,   //当前播放的时间
                timer:"",
                currentProgressArr: {
                    songName: "",
                    singerName: "",
                    songImg: "",
                    songSrc: ""
                },
                a:0,
                barLists:[]  //选中的播放列表
            }
        },
        mounted () {
        },
        methods:{
            toggleStatus(){
                var _this=this;
                _this.playing=!_this.playing;
                var audioPlay;
                audioPlay=document.getElementById("audioPlay");
                if(_this.playing){
                    audioPlay.play();
                    _this.timer=setInterval(function(){
                        _this.currentTime++;
                        _this.widthProgress=audioPlay.currentTime/audioPlay.duration*100+"%";
                    },1000)
                }
                else{
                    clearInterval(_this.timer);
                    audioPlay.pause();
                }
            },
            next(){
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
               this.barLists.splice(index,1);
            },
            clearAll(){
                this.barLists=[];
                console.log(this.barLists.length);
            },
            barListsFun(arr){
                if(arr){
                 this.barLists=this.barLists.concat(arr);
                }
                this.playing=false;  //重置播放按钮
                this.widthProgress="0%";  //重置播放的进度条
                this.currentTime=0;   //重置播放的时间
               var objParm=this.barLists[this.barLists.length-1];
               this.currentProgressArr.songName=objParm.name;
               this.currentProgressArr.singerName=objParm.ar[0].name;
               this.a++;
               if(this.a%2==1){
                   this.currentProgressArr.songSrc="/static/music/music1.mp3";
               }
               else{
                   this.currentProgressArr.songSrc="/static/music/music2.mp3";
               }
               console.log(this.currentProgressArr.songSrc);
               this.currentProgressArr.songImg="/static/banner1.jpg";
               this.toggleStatus();
            }
        }
    }
</script>

<style lang="less">
/*@import "../assets/theme.less";*/
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

</style>
