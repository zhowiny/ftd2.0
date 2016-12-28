<template>
  <transition tag='div' name='slide' apper>
    <header v-show="header.show" class="mint-header" :class="{ 'is-fixed': header.fixed }" :style='{"background":header.background,"color":header.color}'>
      <div class="mint-header-button is-left">
        <slot name="left"></slot>
      </div>
      <h1 class="mint-header-title" v-text="header.title" />
      <div class="mint-header-button is-right">
        <slot name="right"></slot>
      </div>
    </header>
  </transition>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    computed: mapState(['header'])
  }
</script>
<style lang="scss">
  @import "./../../assets/css/common/config";
  .mint-header {
    color: $deepColor;
    border-bottom: 1px solid transparent;
    height: 48px;
  }
  .mint-header-title {
    font-size: 0.36rem;
    overflow: visible;
  }
  .mint-header .mint-button {
    color: $mainColor;
  }
  .slide-enter-active,.slide-leave-active {
    transition: transform .5s;
  }
  .slide-enter,.slide-leave-active {
    transform: translateY(-100%);
  }
</style>