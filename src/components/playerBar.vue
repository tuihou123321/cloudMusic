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
                        <div style="background: #ce3d3a;height: 2px;position: absolute;z-index: 100;left: 0;" :style="{width:playerBarJson.widthProgress}"></div>
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
                            <mu-icon-button class="mini-btn play" :class="{pause:playing}" @click="toggleStatus"/>
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
                playing:false,
                bottomSheet:false,
                timer:"",
                a:0,
                b:0,
                playerBarJson:{
                    currentArrIndex:0, //当前播放的索引
                    widthProgress:"0%",  //当前播放的进度条
                    currentTime:0,   //当前播放的时间
                    currentProgressArr: {
                        songName: "",
                        singerName: "",
                        songImg: "",
                        songSrc: ""
                    },
                    barLists:[]  //选中的播放列表
                }
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
                        _this.playerBarJson.currentTime++;
                        _this.playerBarJson.widthProgress=audioPlay.currentTime/audioPlay.duration*100+"%";
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
               this.playerBarJson.barLists.splice(index,1);
            },
            clearAll(){
                this.playerBarJson.barLists=[];
            },
            barListsFun(arr){
                var len=this.playerBarJson.barLists.length;
                var _this=this;
                // 歌曲列表不为空;
                if(len>0){
                    function isExistFun(){
                        var isExist=false; //默认歌曲不重复
                        for (var i=0;i<len;i++) {//
                            if (_this.playerBarJson.barLists[i].id == arr[0].id) {
                                //重复，不添加到歌曲库
                                _this.playerBarJson.currentArrIndex = i;
                                isExist=true;
                            }
                        }
                        return isExist;
                    }
                    //不重复
                    if(!isExistFun()){
                        _this.playerBarJson.barLists = _this.playerBarJson.barLists.concat(arr);
                        _this.playerBarJson.currentArrIndex = _this.playerBarJson.barLists.length-1;
                    }
                }
                //歌曲列表为空，直接添加，_this.playerBarJson.currentArrIndex=0;
                else{
                    _this.playerBarJson.barLists = _this.playerBarJson.barLists.concat(arr);
                    _this.playerBarJson.currentArrIndex=0;
                }
                //播放传入的单曲
                _this.startPlay(_this.playerBarJson.barLists[_this.playerBarJson.currentArrIndex]);
            },
            startPlay(objParm,index){
                //当index不为空时，代表点击的是选中菜单的索引，否则就是最后一首歌
//                this.playerBarJson.currentArrIndex=index>=0?index:this.playerBarJson.barLists.length-1;
                if(index>=0){
                    this.playerBarJson.currentArrIndex=index;
                }
              this.startPlay2(objParm);
            },
            startPlay2(objParm){
                this.playing=false;  //重置播放按钮
                this.playerBarJson.widthProgress="0%";  //重置播放的进度条
                this.playerBarJson.currentTime=0;   //重置播放的时间
                if(objParm.name.length>7){
                    this.playerBarJson.currentProgressArr.songName=objParm.name.substring(0,7)+"..";
                }
                else{
                    this.playerBarJson.currentProgressArr.songName=objParm.name;
                }
                this.playerBarJson.currentProgressArr.singerName=objParm.ar[0].name;
                this.a++;
                if(this.a%2==1){
                    this.playerBarJson.currentProgressArr.songSrc="/static/music/music1.mp3";
                }
                else{
                    this.playerBarJson.currentProgressArr.songSrc="/static/music/music2.mp3";
                }
                this.playerBarJson.currentProgressArr.songImg="/static/banner1.jpg";
                this.toggleStatus();
                this.setItem();
            },
            nextMusic:function(){
                if(this.playerBarJson.currentArrIndex<this.playerBarJson.barLists.length-1){
                    ++this.playerBarJson.currentArrIndex;
                }else{
                    this.playerBarJson.currentArrIndex=0;
                }
                this.startPlay2(this.playerBarJson.barLists[this.playerBarJson.currentArrIndex]);
            }
        },
        created:function(){
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
