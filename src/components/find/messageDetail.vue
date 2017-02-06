<template>
  <transition name='slideIn' tag='div'>
    <div class="detail slideIn">
      <h1>{{$route.query.title}}</h1>
      <p v-html="$route.query.cnt"></p>
    </div>
  </transition>
</template>
<script>
  export default {
    created () {
      this.$store.dispatch('setHeader', {show: true, background: '#fff', title: '公告详情'})
      this.$store.dispatch('hideFooter')
    }
  }
</script>
<style scoped lang='scss'>
  @import "./../../assets/css/common/config";
  .detail {
    border-top: 1px solid $bodycolor;
    padding: $big-space * 2;
    h1 {
      font-size: 0.36rem;
      margin-bottom: $big-space;
    }
    p {
      text-align: left;
      text-indent: 2em;
    }
  }
</style>