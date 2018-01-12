<template>
    <div>
       <h3>我是排行榜页面</h3>
        <playerBar  ref="playerBar2"></playerBar>
    </div>
</template>

<script>
    import playerBar from '../components/playerBar.vue'
    export default {
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        components:{
            playerBar
        }
    }
</script>

<style>
</style>
