<template>
    <div class="wrapper">
        <div class="title">全部歌单</div>
            <mu-flexbox class="box" wrap="wrap" justify="space-around" gutter="0">
                <mu-flexbox-item basis="40%" class="list-item" v-for="item in playList" :key="item.id">
                    <div class="list-bar">{{item.playCount}}</div>
                    <img class="list-img img-response" :src="item.coverImgUrl+'?param=300y300'" alt="" >
                    <div class="list-name">{{item.name}}</div>
                </mu-flexbox-item>
            </mu-flexbox>
            <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
    </div>
</template>

<script>
    import api from '../api/index.js'
    export default {
        data () {
            return {
                playList:[],
                offset:0,
                loading: false,
                scroller: null
            }
        },
        mounted () {
            this.scroller = this.$el;
            this.get();
        },
        methods:{
            get(){
                this.loading = true;
                var _this=this;
                _this.$http.get(api.getPlayListByWhere("全部","hot",_this.offset,true,6)).then(function(res){
                    console.log(1);
                    if(res.code=200){
                        var total=res.data.total;
                        var list=res.data.playlists;
                        for(let i=0;i<list.length;i++){
                            _this.playList.push(list[i]);
                        }
                        _this.offset=_this.offset+6;
                        if(_this.offset>total) _this.offset=total
                        _this.loading=false
                    }
                    else{
                        console.log(res.code);
                    }
                })
            },
            loadMore () {
                var _this=this;
                _this.get();
            }
        }
    }
</script>

<style lang="less" scoped>
@import "../assets/theme.less";
.wrapper{
    height: 5.65rem;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    border: 1px solid #d9d9d9;
    padding:0 10px;
}
.img-response{
    max-width:100%;
    height: auto;
}
.title{
    margin: 5px 0 5px 0;
    padding-left: 8px;
    border-left:4px solid @primaryColor;
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
    &-name{
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
    }
}
</style>
