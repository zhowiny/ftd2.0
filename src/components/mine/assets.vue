<template>
  <transition name='slideIn'>
    <div class="slideIn">
      <ul class="list" >
        <router-link tag='li' :to="{ path: '/assets/annal', query: { type: '新手标' }}">
          <span class="icon icon1" />
          <span>新手标</span>
          <i class="leftArrow" />
        </router-link>
        <router-link tag='li' :to="{ path: '/assets/annal', query: { type: '转贷项目' }}">
          <span class="icon icon2" />
          <span>转贷项目</span>
          <i class="leftArrow" />
        </router-link>
        <router-link tag='li' :to="{ path: '/assets/annal', query: { type: '定存通' }}">
          <span class="icon icon3" />
          <span>定存通</span>
          <i class="leftArrow" />
        </router-link>
        <router-link tag='li' to='/assets/transaction' class='space'>
          <span class="icon icon4" />
          <span>交易记录</span>
          <i class="leftArrow" />
        </router-link>
        <router-link tag='li' to='/assets/funds'>
          <span class="icon icon5" />
          <span>下期回款</span>
          <i class="leftArrow" />
        </router-link>
      </ul>
    </div>
  </transition>
</template>
<script>
  export default {
    beforeRouteLeave (to, from, next) {
      if (!~to.path.indexOf('/assets')) {
        this.$store.dispatch('setHeader', {show: false, title: '富通贷', background: '#fff'})
        this.$store.dispatch('showFooter')
      }
      next()
    },
    created () {
      this.$store.dispatch('setHeader', {show: true, background: '#fff', title: '我的资产'})
      this.$store.dispatch('hideFooter')
    }
  }
</script>
<style scoped lang='scss'>
  @import "./../../assets/css/common/config";
  @for $i from 1 through 5 {
    .icon.icon#{$i} {
      background-image: url("./../../assets/images/mine/icon-#{$i}.png");
    }
  }
  .space{
    margin-top: $big-space;
    &:before {
      content: '';
      display: block;
      width: 7.5rem;
      margin-left: -$middle-space * 2;
      margin-top: -($middle-space * 2 + $big-space);
      margin-bottom: $big-space;
      height: $big-space;
      background: $bodycolor;
    }
  }
</style>