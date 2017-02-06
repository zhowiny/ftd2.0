<template>
  <div class="titleHeight help noviceRead">
    <div :class='{active:status[0]}'>
      <h3 @click="toggle($event, 0)">1.如何成为富通贷用户?</h3>
      <div class="question">
        <p>(1)进入富通贷首页，点击右上方的注册按钮或者banner图右侧的注册按钮；</p>
        <p>(2)填写您的手机号码，获取验证码并验证，点击立即注册即可成功。</p>
      </div>
    </div>
    <div :class='{active:status[1]}'>
      <h3 @click="toggle($event, 1)">2.什么是邀请返利，如何邀请朋友？</h3>
      <div class="question">
        <p>邀请返利是邀请投资的一种形式，可进入我的账户中，点击邀请返利，复制连接发送给您的好友，点击链接完成注册即可。</p>
      </div>
    </div>
    <div :class='{active:status[2]}'>
      <h3 @click="toggle($event, 2)">3.如何实名认证及修改银行卡？</h3>
      <div class="question">
        <p>未实名认证的用户，可进入账户中心点击实名认证，填写个人信息完成认证。如您已认证绑卡，可在实名认证页面，点击“修改按钮”进行修改。</p>
      </div>
    </div>
    <div :class='{active:status[3]}'>
      <h3 @click="toggle($event, 3)">4.为什么不能登录？</h3>
      <div class="question">
        <p>首先，请检查您的用户名和密码是否正确。请注意输入用户名或密码时，是否有空格；如果忘记密码，可以重置密码。如果使用以上方法仍无法登录，请拨打客服电话<span>400-000-0303</span>与我们联系。</p>
      </div>
    </div>
    <div :class='{active:status[4]}'>
      <h3 @click="toggle($event, 4)">5.用户在注册、实名认证、提现时收不到验证码怎么办？</h3>
      <div class="question">
        <p>可尝试重新获取验证码，或重新注册、认证、提现等。如以上操作后还无法成功收取，请拨打客服电话<span>400-000-0303</span>。需要查询具体原因后，再进行操作。</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      status: [false, false, false, false, false],
      height: []
    }
  },
  methods: {
    toggle (e, index) {
      this.status.splice(index, 1, !this.status[index])
      this.animate(e.target.nextSibling, index)
    },
    animate (el, index) {
      let question = el
      while (question && question.nodeName !== 'DIV') {
        question = question.nextSibling
      }
      if (this.status[index]) {
        question.style.height = '0'
        setTimeout(() => {
          question.style.position = 'static'
          question.style.visibility = 'visible'
          question.style.height = this.height[index]
          question.style.padding = '0.15rem 0.3rem'
        }, 0)
      } else {
        question.style.height = '0'
        question.style.padding = '0 0.3rem'
      }
    }
  },
  mounted () {
    Array.from(document.querySelectorAll('.question')).map(node => {
      this.height.push(node.offsetHeight + 'px')
    })
  },
  beforeRouteLeave (to, from, next) {
    if (to.path.indexOf('/help') < 0) {
      this.$store.dispatch('setHeader', {show: false, title: '富通贷', background: '#fff'})
      this.$store.dispatch('showFooter')
    }
    next()
  },
  created () {
    this.$store.dispatch('setHeader', {show: true, background: '#fff', title: '新手必读'})
    this.$store.dispatch('hideFooter')
  }
}
</script>
<style lang='scss'>
  @import "./../../assets/css/common/config";
  .help.noviceRead {
    background: #fff;
    text-align: left;
    border-top: 1px solid $colors;
    color:#333;
    padding-bottom: 55px;
    > div {
      border: 1px solid $colors;
      border-radius: $default-border-radius;
      width: 7.1rem - $big-space * 2;
      margin: $big-space * 2 auto 0 auto;
    }
    .question {
      background: #F0EFF5;
      padding: $big-space $big-space * 2;
      font-size: 0.28rem;
      transition: all .3s;
      overflow: hidden;
      visibility: hidden;
      position: absolute;
      span {
        color: $mainColor;
      }
    }

    h3 {
      padding: $big-space $big-space * 2;
      font-weight: normal;
      font-size: 0.32rem;
      position: relative;
      padding-right: 1rem;
      &:after {
        content: '>';
        display: inline-block;
        width: 0.4rem;
        height: 0.4rem;
        font-size: 0.4rem;
        line-height: 0.36rem;
        background: $bodycolor - #111;
        border-radius: 50%;
        text-align: center;
        transform: rotate(-90deg);
        transition: transform .3s;
        color: #fff;
        position: absolute;
        right: $big-space * 2;
        top: 30%;
      }
    }
    .active h3:after {
      transform: rotate(90deg);
    }
  }
</style>