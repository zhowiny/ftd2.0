<template>
  <div class="invite">
    <img src="./../../assets/images/find/inviteBanner.png" >
    <h1><span>方式一:</span>请分享链接到社交网络</h1>
    <div class="shareIcon">
      <a target="_blank" :href="'http://www.jiathis.com/send/?webid=weixin&url='+phone+'&title=富通贷--来自微信分享'">微信</a>
      <a target="_blank" :href="'http://www.jiathis.com/send/?webid=cqq&url='+phone+'&title=富通贷--来自QQ好友分享'">QQ好友</a>
      <a target="_blank" :href="'http://www.jiathis.com/send/?webid=qzone&url='+phone+'&title=富通贷--来自QQ空间分享'">QQ空间</a>
      <a target="_blank" :href="'http://www.jiathis.com/send/?webid=tsina&url='+phone+'&title=富通贷--来自微博分享'">微博</a>
    </div>
    <h1><span>方式二:</span>请让好友扫描下面二维码</h1>
    <div>
     <img :src='invite_link + phone'>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        invite_link: 'http://qr.liantu.com/api.php?w=250&text='
      }
    },
    computed: {
      phone () {
        return window.location.origin + window.location.pathname + '?inviter=' + this.$store.state.userInfo.phone
      }
    },
    created () {
      this.$store.dispatch('setHeader', {show: true, background: 'transparent', title: '邀请好友', color: '#fff'})
      this.$store.dispatch('hideFooter')
    },
    destroyed () {
      this.$store.dispatch('setHeader', {show: false, title: '富通贷', color: '', background: '#fff'})
      this.$store.dispatch('showFooter')
    }
  }
</script>
<style scoped lang='scss'>
  @import "./../../assets/css/common/config";
  .invite {
    background: #fff;
    color: #ff8825;
    padding-bottom: $big-space * 4;
    >img {
      width: 7.5rem;
    }
    h1 {
      font-size: 0.34rem;
      font-weight: normal;
      margin-bottom: $big-space * 3;
      span {
        font-size: 0.4rem;
        font-weight: bold;
      }
    }
    div img {
      width: 3rem;
    }
    .shareIcon a {
      display: inline-block;
      padding-top: 0.8rem;
      margin-bottom: $big-space * 4;
      min-width: 1.2rem;
      background-image: url("../../assets/images/find/wechat.png");
      background-size: 0.8rem 0.8rem;
      background-repeat: no-repeat;
      background-position: 50% 0;
      &:nth-of-type(2) {
        background-image: url("./../../assets/images/find/friendCircle.png");
      }
      &:nth-of-type(3) {
        background-image: url("./../../assets/images/find/qqzore.png");
      }
      &:nth-of-type(4) {
        background-image: url("./../../assets/images/find/weibo.png");
      }
    }
  }
</style>