<template>
  <transition name='slideIn'>
    <div class="slideIn">
      <ul class="list" >
        <router-link tag='li' to='/helpCenter/noviceRead'>
          <span class="icon noviceRead" />
          <span>新手必读</span>
          <i class="leftArrow" />
        </router-link>
        <!--<router-link tag='li' to='/activity'>
          <span class="icon register" />
          <span>注册绑卡</span>
          <i class="leftArrow" />
        </router-link>
        <router-link tag='li' to='/invite'>
          <span class="icon operation" />
          <span>投资操作</span>
          <i class="leftArrow" />
        </router-link>
        <router-link tag='li' to='/help'>
          <span class="icon income" />
          <span>收益保障</span>
          <i class="leftArrow" />
        </router-link>
        <router-link tag='li' to='/bits'>
          <span class="icon productInfo" />
          <span>产品介绍</span>
          <i class="leftArrow" />
        </router-link>-->
      </ul>
    </div>
  </transition>
</template>
<script>
export default {
  beforeRouteLeave (to, from, next) {
    if (to.path.indexOf('/helpCenter') < 0) {
      this.$store.dispatch('setHeader', {show: false, title: '富通贷', background: '#fff'})
      this.$store.dispatch('showFooter')
    }
    next()
  },
  created () {
    this.$store.dispatch('setHeader', {show: true, background: '#fff', title: '帮助中心'})
    this.$store.dispatch('hideFooter')
  }
}
</script>
<style scoped lang='scss'>
  .icon.noviceRead {
    background-image: url("./../../assets/images/find/noviceRead.png");
  }
  .icon.register {
    background-image: url("./../../assets/images/find/register.png");
  }
  .icon.operation {
    background-image: url("./../../assets/images/find/operation.png");
  }
  .icon.income {
    background-image: url("./../../assets/images/find/income.png");
  }
  .icon.productInfo {
    background-image: url("./../../assets/images/find/productInfo.png");
  }
</style>