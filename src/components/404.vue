<template>
  <div class="not-found">
    <p>您访问的页面不存在! <br><strong>404!</strong></p>
    <button class='ftd-btn' @click="toPage(-1)">返回</button>
  </div>
</template>
<script>
export default {
  created () {
    this.$store.dispatch('hideFooter')
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('showFooter')
    next()
  }
}
</script>
<style scoped>
  .not-found {
    margin-top: 1.5rem;
  }
</style>