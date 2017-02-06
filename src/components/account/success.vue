<template>
  <transition name='slideIn'>
    <div class="slideIn set">
      <div class="tip">
        <img src="./../../assets/images/account/success.png">
        <p>{{$route.query.tip}}</p>
      </div>
      <router-link :to='$route.query.link'>
        <button class="ftd-btn">{{$route.query.btn}}</button>
      </router-link>
    </div>
  </transition>
</template>
<script>
  import {Cell} from 'mint-ui'
  export default {
    beforeRouteLeave (to, from, next) {
      if (!~to.path.indexOf('/set')) {
        this.$store.dispatch('setHeader', {show: false, title: '富通贷', background: '#fff'})
        this.$store.dispatch('showFooter')
      }
      next()
    },
    created () {
      this.$store.dispatch('setHeader', {show: true, background: '#fff', title: this.$route.query.title})
      this.$store.dispatch('hideFooter')
    },
    components: {
      [Cell.name]: Cell
    }
  }
</script>
<style lang='scss' scoped>
  @import "./../../assets/css/common/config";
  .tip {
    margin-top: 2rem;
    color: $mainColor;
    font-size: 0.36rem;
    padding: $big-space * 2 0;
    border-top: 1px solid $bodycolor;
    img {
      width: 1.3rem;
      height: 1.3rem;
    }
  }
</style>