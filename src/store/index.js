/**
 * Created by Administrator on 2018/1/22.
 */
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

var store=new Vuex.Store({
    state:{
        arr:{
            a:1,
            b:2
        },
        a:1,
        playerBarJson:{
            currentArrIndex:0, //当前播放的索引
            widthProgress:"10%",  //当前播放的进度条
            currentTime:0,   //当前播放的时间
            playing:false,
            currentProgressArr: {
                songName: "",
                singerName: "",
                songImg: "",
                songSrc: ""
            },
            barLists:[]  //选中的播放列表
        }
    },
    getters:{

    },
    //同步方法
    mutations:{
        //从列表页点击 添加歌曲到播放列表
        addMusic:function(state,payload){
            function isExistFun(item){
                var isExist=false; //默认歌曲不重复
                var len=state.playerBarJson.barLists.length;
                for (var i=0;i<len;i++) {
                    if (state.playerBarJson.barLists[i].id == item.id) {
                        //重复，不添加到歌曲库
                        state.playerBarJson.currentArrIndex = i;
                        isExist=true;
                    }
                }
                return isExist;
            }

            //没有重复,直接添加到最后，索引也跳转

            if(!isExistFun(payload)){
                state.playerBarJson.barLists.push(payload);
                state.playerBarJson.currentArrIndex = state.playerBarJson.barLists.length>0?state.playerBarJson.barLists.length-1:0;
            }
            //重复了，不添加，索引跳转到当前选中的部分，已在函数中处理
            //...
            //重新开始播放新音乐
             this.commit("playMusicStart");
        },
        playMusicStart:function(state){
            //重新播放新歌曲
            state.playerBarJson.playing=true;  //重置播放按钮
            state.playerBarJson.widthProgress="0%";  //重置播放的进度条
            state.playerBarJson.currentTime=0;   //重置播放的时间
            var payload2=state.playerBarJson.barLists[state.playerBarJson.currentArrIndex];
            if(payload2.name.length>7){
                state.playerBarJson.currentProgressArr.songName=payload2.name.substring(0,7)+"..";
            }
            else{
                state.playerBarJson.currentProgressArr.songName=payload2.name;
            }
            state.playerBarJson.currentProgressArr.singerName=payload2.ar[0].name;
            state.a++;
            if(state.a%2==1){
                state.playerBarJson.currentProgressArr.songSrc="/static/music/music1.mp3";
            }
            else{
                state.playerBarJson.currentProgressArr.songSrc="/static/music/music2.mp3";
            }
            state.playerBarJson.currentProgressArr.songImg="/static/banner1.jpg";
        },
        //从列表中删除歌曲
        removeList:function(state,payload){
            state.playerBarJson.barLists.splice(payload.index,1);
        },
        //清空歌曲库
        clearAll:function(state){
            state.playerBarJson.barLists=[];
        },
        nextMusic:function(state){
            if(state.playerBarJson.currentArrIndex<state.playerBarJson.barLists.length-1){
                ++state.playerBarJson.currentArrIndex;
            }else{
                state.playerBarJson.currentArrIndex=0;
            }
            this.commit("playMusicStart");
        },
        startPlay2:function(state){
            var objParm=state.playerBarJson.barLists[currentArrIndex];

            state.playing=true;  //重置播放按钮
            state.playerBarJson.widthProgress="0%";  //重置播放的进度条
            state.playerBarJson.currentTime=0;   //重置播放的时间
            if(objParm.name.length>7){
                state.playerBarJson.currentProgressArr.songName=objParm.name.substring(0,7)+"..";
            }
            else{
                state.playerBarJson.currentProgressArr.songName=objParm.name;
            }
            state.playerBarJson.currentProgressArr.singerName=objParm.ar[0].name;
            state.a++;
            if(state.a%2==1){
                state.playerBarJson.currentProgressArr.songSrc="/static/music/music1.mp3";
            }
            else{
                state.playerBarJson.currentProgressArr.songSrc="/static/music/music2.mp3";
            }
            state.playerBarJson.currentProgressArr.songImg="/static/banner1.jpg";
        },
        //
        barListsFun:function(state,item){
            var len=this.playerBarJson.barLists.length;
            // 歌曲列表不为空;
            if(len>0){
                //不重复
                if(!state.isExistFun(item)){
                    state.playerBarJson.barLists = state.playerBarJson.barLists.concat(item);
                    state.playerBarJson.currentArrIndex = state.playerBarJson.barLists.length-1;
                }
            }
            //歌曲列表为空，直接添加，state.playerBarJson.currentArrIndex=0;
            else{
                state.playerBarJson.barLists = state.playerBarJson.barLists.concat(item);
                state.playerBarJson.currentArrIndex=0;
            }
            //播放传入的单曲
            state.startPlay(state.playerBarJson.barLists[state.playerBarJson.currentArrIndex]);
        },
        changePlayIcon:function(state){
            state.playerBarJson.playing=!state.playerBarJson.playing;  //所有涉及到数据更改的都要提交commit;
        }
    },
    actions:{

    }
})

export default  store;