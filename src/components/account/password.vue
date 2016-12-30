<template>
  <transition name='slideIn'>
    <div class="slideIn set">
      <mt-cell title="修改支付密码" is-link to=''/>
      <mt-cell title="忘记支付密码" is-link to=''/>
      <mt-cell title="修改登录密码" is-link />
      <mt-cell title="忘记登录密码" is-link />
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
      this.$store.dispatch('setHeader', {show: true, background: '#fff', title: '密码管理'})
      this.$store.dispatch('hideFooter')
    },
    components: {
      [Cell.name]: Cell
    }
  }
</script>
<style lang='scss'>
</style>