<template>
  <transition name='slideIn'>
    <div class="slideIn">
      <router-link :to="{ name: 'messageDetail', params: { id: 2 }}">
        <mt-cell title="新手标购买" is-link />
      </router-link>
      <router-link :to="{ name: 'messageDetail', params: { id: 24 }}">
        <mt-cell title="活动信息--投资领大奖" is-link />
      </router-link>
      <router-link :to="{ name: 'messageDetail', params: { id: 0 }}">
        <mt-cell title="周末限时福利" is-link />
      </router-link>
      <router-link :to="{ name: 'messageDetail', params: { id: 5 }}">
        <mt-cell title="邀请好友--送红包" is-link />
      </router-link>
      <router-link :to="{ name: 'messageDetail', params: { id: 3 }}">
        <mt-cell title="5%的加息券已经到手" is-link />
      </router-link>
    </div>
  </transition>
</template>
<script>
  import {Cell} from 'mint-ui'
  export default {
    beforeRouteLeave (to, from, next) {
      if (!~to.path.indexOf('/message')) {
        this.$store.dispatch('setHeader', {show: false, title: '富通贷', background: '#fff'})
        this.$store.dispatch('showFooter')
      }
      next()
    },
    created () {
      this.$store.dispatch('setHeader', {show: true, background: '#fff', title: '我的消息'})
      this.$store.dispatch('hideFooter')
    },
    components: {
      [Cell.name]: Cell
    }
  }
</script>
<style scoped lang='scss'>
</style>