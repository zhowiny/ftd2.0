<template>
  <transition name='slideIn' tag='div'>
    <div class="detail slideIn">
      <h1>新手标购买{{$route.params.id}}</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi blanditiis debitis delectus dolore ducimus, enim esse ex exercitationem incidunt inventore ipsam iusto laborum, molestias nam, natus nemo nihil perspiciatis quasi?</p>
    </div>
  </transition>
</template>
<script>
  export default {
    created () {
      this.$store.dispatch('setHeader', {show: true, background: '#fff', title: '消息详情'})
      this.$store.dispatch('hideFooter')
    }
  }
</script>
<style scoped lang='scss'>
  @import "./../../assets/css/common/config";
  .detail {
    border-top: 1px solid $bodycolor;
    padding: $big-space * 2;
    p {
      text-align: left;
      text-indent: 2em;
    }
  }
</style>