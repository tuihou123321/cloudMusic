<template>
    <div>
        <div class="title">全部歌单</div>
        <mu-flexbox class="mt8">
            <mu-flexbox-item class="flex-demo" v-for="(item,index) in playList">
                <div class="num">{{item.playCount}}</div>
                <div class="img"><img :src="item.coverImgUrl+'?param=300y300'" alt=""></div>
                <div class="name">{{item.name}}</div>
            </mu-flexbox-item>
        </mu-flexbox>

    </div>
</template>

<script>
    export default {
        data () {
            return {
                playList:[]
            }
        },
        methods:{
            get(){
                var _this=this;
                _this.$http.get("../src/api/songList.json",{limit:6}).then(function(res){
                    if(res.code=200){
                        _this.playList=res.data.playlists;
                        console.log(res.data.playlists);
                    }
                })
            }
        },
        created(){
            this.get();
        }
    }
</script>

<style lang="less" scoped>

</style>
