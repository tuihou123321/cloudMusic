<template>
  <div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <playerBar v-show="barListsLength"></playerBar>
  </div>
</template>

<script>
  import playerBar from "./components/playerBar.vue"
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed:{
      barListsLength:function(){
          return this.$store.state.playerBarJson.barLists.length;
      }
  },
  components:{
      playerBar
  }
}
</script>

<style lang="less">
    /*@import "../assets/theme.less";*/
</style>
