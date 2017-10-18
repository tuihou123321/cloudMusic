<template>
    <div>
        <div class="header">
          固定头部
        </div>
        <!--打开下面注释后，页面报错-->
        <div>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        }
    }
</script>

<style>
</style>
