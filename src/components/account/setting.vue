<template>
  <transition name='slideIn'>
    <div class="slideIn set">
      <mt-cell title="实名认证" is-link to='/set/authenticate'/>
      <mt-cell title="我的银行卡" is-link to='/set/bankcard'/>
      <div class="space"></div>
      <mt-cell title="密码管理" is-link to='/set/password'/>
      <div class="space"></div>
      <mt-cell title="绑定邮箱" is-link to='/set/email'/>
      <!--@click="loginout({path:'/find',query:{a:1,b:2}})"-->
      <button class="ftd-btn" @click="loginout()">安全退出</button>
    </div>
  </transition>
</template>
<script>
  import {Cell} from 'mint-ui'
  export default {
    methods: {
      aaa () {
        this.$router.replace({path: '/find', query: {'asd': 'qwe', 'zxc': '123'}})
      }
    },
    beforeRouteLeave (to, from, next) {
      if (!~to.path.indexOf('/set')) {
        this.$store.dispatch('setHeader', {show: false, title: '富通贷', background: '#fff'})
        this.$store.dispatch('showFooter')
      }
      next()
    },
    created () {
      this.$store.dispatch('setHeader', {show: true, background: '#fff', title: '账户设置'})
      this.$store.dispatch('hideFooter')
    },
    components: {
      [Cell.name]: Cell
    }
  }
</script>
<style lang='scss'>
</style>