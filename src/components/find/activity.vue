<template>
  <transition name='slideIn' tag='div'>
    <div class="activity slideIn">
      <div class="redBag">
        <div>
          <h2>邀请就送红包</h2>
          <p>好友投资，你拿红包，不停投，不停送</p>
        </div>
        <p>进行中</p>
      </div>
      <div class="qiandao">
        <div>
          <h2>连续签到赢大礼包</h2>
        </div>
        <p>进行中</p>
      </div>
      <div class="xinshou">
        <div>
          <h2>新手投资就送代金券</h2>
        </div>
        <p>进行中</p>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    created () {
      this.$store.dispatch('setHeader', {show: true, background: '#fff', title: '精彩活动'})
      this.$store.dispatch('hideFooter')
    },
    destroyed () {
      this.$store.dispatch('setHeader', {show: false, title: '富通贷'})
      this.$store.dispatch('showFooter')
    }
  }
</script>
<style scoped lang='scss'>
  @import "./../../assets/css/common/config";

  .activity {
    background: #fff;
    padding-bottom: $big-space * 2;
    > div {
      width: 7.5rem;
      height: 3.3rem;
      background-image: url("./../../assets/images/find/hbbg.jpg");
      background-size: 100% 100%;
      margin-bottom: $big-space * 2;
      position: relative;
      color:#fff;
      h2 {
        font-size: 0.5rem;
        text-shadow: 0 3px 3px #333;
      }
      p {
        font-size: 0.3rem;
      }
      > p {
        font-size: 0.4rem;
        position: absolute;
        bottom: $small-space * 3.5;
        width: 100%;
      }
      > div {
        position: absolute;
        width: 100%;
        top: 40%;
        transform: translateY(-50%);
      }
    }
    div.qiandao {
      background-image: url("./../../assets/images/find/qdbg.jpg");
    }
    div.xinshou {
      background-image: url("./../../assets/images/find/djqbg.jpg");
      margin-bottom: 0;
    }
  }
</style>