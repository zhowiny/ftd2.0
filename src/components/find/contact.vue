<template>
  <transition name='slideIn' tag='div'>
    <div class="slideIn">
      <ul>
        <li><span>微信公众号</span><i>富通贷</i></li>
        <li><span>官方微博</span><i>富通贷</i></li>
        <li><span>客服邮箱</span><i>service@ofim.com.cn</i></li>
        <li><span>官方QQ</span><i>4000000303</i></li>
        <li><span>客服热线</span><i>400-000-0303</i></li>
        <li><span>地址1</span><i>北京市朝阳区东三环中路7号北京财富中心A座10层(深圳市富通贷金融服务有限公司北京分公司)</i></li>
        <li><span>地址2</span><i>深圳市福田中心区福华三路卓越世纪中心4号楼2208单元</i></li>
      </ul>
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
    this.$store.dispatch('setHeader', {show: true, background: '#fff', title: '联系我们'})
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
  ul>li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1rem;
    border-top: 1px solid $bodycolor;
    padding: 0 $big-space * 2;
    color: $colorl;
    font-size: 0.32rem;
    span {
      min-width: 1.745rem;
      text-align: left;
    }
    i {
      font-style: normal;
      font-size: 0.24rem;
      text-align: left;
    }
  }
</style>