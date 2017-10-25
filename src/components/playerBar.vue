<template>
    <div class="foot">
        <div>
            <mu-circular-progress v-show="!loading" size="30"/>
            <img src="/static/banner1.jpg" alt="" width="42" v-show="loading">
        </div>
        <div>
            <p>那么骄傲</p>
            <p class="grey fz10">金海心</p>
        </div>
        <div class="fr">
            <mu-icon-button class="play-list" @click="showList"/>
            <mu-icon-button class="play" :class="{pause:playing}" @click="toggleStatus"/>
            <mu-icon-button class="next" @click="next"/>
        </div>
    </div>
</template>

<script>
    import api from '../api/index.js'
    export default {
        data () {
            return {
                loading: false
            }
        },
        mounted () {
            this.scroller = this.$el;
            this.get();
        },
        methods:{
        }
    }
</script>

<style lang="less" scoped>
@import "../assets/theme.less";
</style>
