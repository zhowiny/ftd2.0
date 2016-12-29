<template>
  <transition name='slideIn' tag='div'>
    <div class="slideIn charge">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet dignissimos ducimus eaque enim, expedita fugit ipsam labore laudantium libero maiores nemo omnis perspiciatis, quibusdam ratione reprehenderit sapiente sed soluta veniam.
    </div>
  </transition>
</template>
<script>
  export default {
    data () {
      return {
        auth: 'zhowiny'
      }
    },
    created () {
      this.$store.dispatch('setHeader', {show: true, background: '#fff', title: '充值'})
      this.$store.dispatch('hideFooter')
    },
    destroyed () {
      this.$store.dispatch('setHeader', {show: false})
      this.$store.dispatch('showFooter')
    }
  }
</script>
<style scoped lang='scss'>
  @import "./../../assets/css/common/config";
</style>