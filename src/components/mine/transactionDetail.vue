<template>
  <transition name='slideIn'>
    <div class="slideIn">
      <ul>
        <li>
          <p>交易记录/时间</p>
          <span>金额(元)</span>
          <p>可用余额</p>
        </li>
        <li v-for="i in 5">
          <p><b>充值</b><br><i>2016-05-20 09:00</i></p>
          <!--正数plus 负数minus-->
          <span class="plus">+100</span>
          <p>100</p>
        </li>
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
      this.$store.dispatch('setHeader', {show: true, background: '#fff', title: '交易记录'})
      this.$store.dispatch('hideFooter')
    }
  }
</script>
<style scoped lang='scss'>
  @import "./../../assets/css/common/config";
  ul {
    border-top: 1px solid $bodycolor - #111;
    li {
      display: flex;
      height: 1rem;
      padding-left: $big-space * 2;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid $bodycolor;
      p {
        width: 25%;
        &:first-child {
          width: 33%;
          display: flex;
          flex-wrap: wrap;
        }
        b {
          font-weight: normal;
        }
        i {
          font-style: normal;
          font-size: 0.24rem;
        }
      }
      span.plus {
        color: $mainColor;
      }
      span.minus {
        color: #1F3F70;
      }
    }
  }
</style>