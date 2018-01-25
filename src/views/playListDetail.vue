<template>
    <div class="wrapper">
        <mu-appbar title="歌单">
            <mu-icon-button icon="arrow_back" slot="left" @click="back"/>
        </mu-appbar>
        <div  class="bg-grey">
            <mu-flexbox class="p20">
                <mu-flexbox-item>
                    <img :src="audio.albumPic" alt="" class="w140">
                </mu-flexbox-item>
                <mu-flexbox-item>
                    <div class="white">
                        <p class="mb15">{{audio.name}}</p>
                        <p>
                            <mu-avatar slot="left" src="/static/default_cover.png" :size="30"/>
                            <span class="white mu-avatar-text">{{creator.nickname}}</span>
                        </p>
                    </div>
                </mu-flexbox-item>
            </mu-flexbox>
        </div>
       <div class="lists">
           <div class="lists-title p10 pl15 pb0">
              <mu-flat-button label="播放全部" icon="add_circle_outline" @click="playMusicAll()"></mu-flat-button>
               <mu-divider/>
           </div>
           <mu-list>
               <template v-for="(item,index) in playList">
                   <mu-list-item  :title="item.name" :describeText="item.ar[0].name" value="true" @click="playMusic(item)">
                       <span slot="left" class="indexStyle">{{index+1}}</span>
                   </mu-list-item>
                   <mu-divider inset/>
               </template>
           </mu-list>
       </div>
        <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
        <playerBar  ref="playerBar2"></playerBar>
    </div>
</template>

<script>
    import api from '../api/index.js'
    import playerBar from '../components/playerBar.vue'
    import {mapState} from "vuex"

    export default {
        data () {
            return {
                creator:{},
                audio:[],
                title:"",
                playList:[],
                barList:"",
                offset:0,
                loading: false,
                scroller: null
            }
        },
        computed:{
//            ...mapState(["arr"])
        },
        components:{
            playerBar
        },
        mounted () {
            this.scroller = this.$el;
            this.get();
        },
        methods:{
            get(){
                this.loading = true
                var _this=this;
                this.$http.get(api.getPlayListDetail("全部","hot",_this.offset,true,6)).then(function(res){
                    if(res.code=200){
                        var total=res.data.total;
                        var list=res.data.playlist.tracks;
                        for(let i=0;i<list.length;i++){
                            _this.playList.push(list[i]);
                        }
                        _this.offset=_this.offset+10;
                        if(_this.offset>total) _this.offset=total;
                        _this.creator=res.data.playlist.creator;

                        _this.audio.albumPic="/static/default_cover.png";
                        _this.audio.name="歌单标题";
                        _this.loading=false
                    }
                    else{
                        console.log(res.code);
                    }
                })
            },
            loadMore () {
                var _this=this;  
//                _this.get();
            },
            back(){
                this.$router.go(-1);
            },
            playMusic(item){
               //向store中添加数据(此时是同步的)；
               this.$store.commit("addMusic",item);
            },
            playMusicAll(){
            }
        },
        created:function(){
        }
    }
</script>

<style lang="less" scoped>
@import "../assets/theme.less";
.w140{
    width: 140px;
}
.ml-18{
    margin-left: -18px;
}
.show-left{
    padding-left: 50px !important;
}
.iconClass{
    padding-left: 50px;
}
.mu-avatar-text{
    display: inline-block;
    vertical-align: top;
    height: 30px;
    line-height: 30px;
    margin-left: 3px;
}
.indexStyle {
    padding-left: 10px;
    font-size: 18px;
    font-weight: bolder;
}
</style>
