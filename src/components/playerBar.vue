<template>
    <div v-if="barLists.length!=81">

            <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
                <div class="mbx">
                    <mu-list>
                        <mu-sub-header>
                            播放列表
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
            <div class="bar">
                <div class="dib mr10">
                    <mu-circular-progress v-show="!loading" :size="30"/>
                    <img src="/static/banner1.jpg" alt="" v-show="loading" width="40px" height="40px" class="radio-cover">
                </div>
                <div class="dib">
                    <p class="fz18">那么骄傲</p>
                    <p class="grey fz10">金海心</p>
                </div>
                <div class="dib fr">
                    <mu-icon-button class="mini-btn play-list" @click="changeBottomSheet"/>
                    <mu-icon-button class="mini-btn play" :class="{pause:playing}" @click="toggleStatus"/>
                    <mu-icon-button class="mini-btn next" @click="next"/>
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
                arr:[],
                bottomSheet:false
            }
        },
        mounted () {
        },
        methods:{
            toggleStatus(){
                this.playing=!this.playing;
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
               console.log(this.barLists);
            }
        },
        computed:{
            barLists(){
                if(this.barList){
                    this.arr=this.arr.concat(this.barList);
                }
                return this.arr;
            }
        },
        props:['barList']

    }
</script>

<style lang="less">
@import "../assets/theme.less";
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
