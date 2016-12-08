<template>
  <div class="titleHeight noviceRead">
    <div>
      <h3>1.如何成为富通贷用户?</h3>
      <div class="question">
        <p>(1)进入富通贷首页，点击右上方的注册按钮或者banner图右侧的注册按钮；</p>
        <p>(2)填写您的手机号码，获取验证码并验证，点击立即注册即可成功。</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  beforeRouteLeave (to, from, next) {
    if (to.path.indexOf('/help') < 0) {
      this.$store.dispatch('setHeader', {show: false, title: '富通贷', background: '#fff'})
      this.$store.dispatch('showFooter')
    }
    next()
  },
  created () {
    this.$store.dispatch('setHeader', {show: true, background: '#fff', title: '新手必读'})
    this.$store.dispatch('hideFooter')
  }
}
</script>
<style scoped lang='scss'>
</style>