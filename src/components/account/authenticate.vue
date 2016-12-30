<template>
  <transition name='slideIn'>
    <div class="slideIn set">
      <mt-cell title="真实姓名" >
        <input type="text" placeholder="请输入您的真是姓名" />
      </mt-cell>
      <div class="space"></div>
      <mt-cell title="身份证号" >
        <input type="text" placeholder="请输入您的身份证号码" />
      </mt-cell>
      <router-link to=''>
        <button class="ftd-btn">下一步</button>
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
      this.$store.dispatch('setHeader', {show: true, background: '#fff', title: '实名认证'})
      this.$store.dispatch('hideFooter')
    },
    components: {
      [Cell.name]: Cell
    }
  }
</script>
<style lang='scss'scoped>
  @import "./../../assets/css/common/config";
  .set input {
    width: 4.5rem;
    color: $mainColor;
    border: none;
    outline: none;
  }
</style>