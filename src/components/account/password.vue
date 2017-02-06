<template>
  <transition name='slideIn'>
    <div class="slideIn set">
      <router-link :to="{ name: 'password', params: { type: 1, tag:0 }}" >
        <mt-cell title="修改交易密码" is-link />
      </router-link>
      <router-link :to="{ name: 'password', params: { type: 1, tag:1 }}" >
        <mt-cell title="重置交易密码" is-link />
      </router-link>
      <router-link :to="{ name: 'password', params: { type: 0, tag:0 }}" >
        <mt-cell title="修改登录密码" is-link />
      </router-link>
      <router-link :to="{ name: 'password', params: { type: 0, tag:1 }}" >
        <mt-cell title="忘记登录密码" is-link />
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