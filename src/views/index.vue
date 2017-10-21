<template>
    <div>
        <mu-appbar title="网易云音乐">
            <mu-icon-button icon="search" slot="right"/>
        </mu-appbar>
        <mu-tabs :value="activeTab" @change="handleTabChange" class="view-tabs">
            <mu-tab value="rage" title="时下流行"/>
            <mu-tab value="songList" title="歌单"/>
            <mu-tab value="leaderBoard" title="排行榜"/>
            <mu-tab value="hotSinger" title="热门歌手"/>
        </mu-tabs>
        <div>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                activeTab:'rage'
            }
        },
        created(){
            // 刷新页面后，保持tab高亮
            var tmpArr=this.$route.path.split('/')
            this.activeTab=tmpArr[2]
        },
        methods: {
            handleTabChange (val) {
                this.activeTab=val;
                this.$router.push({path:'/index/'+val});
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/theme.less";
    .view-tabs{
        background: #fff;
        color: #333;
        >.mu-tab-link{
            color:#666666;
        }
        >.mu-tab-active{
            color:@primaryColor;
        }
    }
</style>