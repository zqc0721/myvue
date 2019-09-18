<template>
  <div id="App">
    <transition name='fade'>
      <!-- <keep-alive> -->
        <router-view v-if="this.$route.meta.keepAlive"></router-view>
      <!-- </keep-alive> -->
    </transition>
    <transition name='fade'>
      <!-- <keep-alive> -->
        <router-view v-if="!this.$route.meta.keepAlive"></router-view>
      <!-- </keep-alive> -->
    </transition>
  </div>
</template>

<script>
  export default {
    name:'App',
    data(){
      return{

      }
    }
  }
</script>

<style lang="scss" scoped>
.fade-enter-active , .fade-leave-active{
  transition: all .5s;
}
.fade-enter , .fade-leave-to{
  opacity: 0;
}
</style>
