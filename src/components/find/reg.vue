<template>
  <div class="titleHeight help noviceRead">
    <div :class='{active:status[0]}'>
      <h3 @click="toggle($event, 0)">注册后如何进行身份验证并绑定银行卡？</h3>
      <div class="question">
        <p>未进行身份认证及未绑定银行卡的用户，可进入账户中心，点击账户设置，分别选择实名认证或我的银行卡，进行认证以及绑定操作。</p>
      </div>
    </div>
    <div :class='{active:status[1]}'>
      <h3 @click="toggle($event, 1)">身份验证环节提示“用户姓名与身份证信息不匹配”如何解决？</h3>
      <div class="question">
        <p>如果确认本人身份信息无误后，可将身份证正反面扫描件或者清晰的彩色照片发送至富通贷邮箱：service@ofim.com.cn并附上注册电话， 客服人员收到邮件后，会在1-3个工作日完成人工身份验证，并且联系用户告知处理结果。</p>
      </div>
    </div>
    <div :class='{active:status[2]}'>
      <h3 @click="toggle($event, 2)">是否可以绑定他人的银行卡？</h3>
      <div class="question">
        <p>不可以，绑定的银行卡开户人信息，必须和您在富通贷平台上的认证的身份信息一致。</p>
      </div>
    </div>
    <div :class='{active:status[3]}'>
      <h3 @click="toggle($event, 3)">设置密码时需要什么格式？</h3>
      <div class="question">
        <p>登录密码需要6-18位字母数字组合，交易密码不能与登录密码相同。</p>
      </div>
    </div>
    <div :class='{active:status[4]}'>
      <h3 @click="toggle($event, 4)">交易密码是否需要跟银行卡密码一致？和登录密码是否可以一致？</h3>
      <div class="question">
        <p>富通贷平台上的交易密码不需要和银行卡密码一致，且交易密码不能和登录密码一致。</p>
      </div>
    </div>
    <div :class='{active:status[5]}'>
      <h3 @click="toggle($event, 5)">忘记了登录密码怎么办？</h3>
      <div class="question">
        <p>可在登录页面下方点击忘记密码重置，或者在账户中心的密码管理中找回重置密码。</p>
      </div>
    </div>
    <div :class='{active:status[6]}'>
      <h3 @click="toggle($event, 6)">忘记了交易密码怎么办？</h3>
      <div class="question">
        <p>如果您忘记了交易密码，可登录富通贷APP平台后，进入账户中心，点击账户设置，选择密码管理页面，进行交易密码的重置。</p>
      </div>
    </div>
    <div :class='{active:status[7]}'>
      <h3 @click="toggle($event, 7)">是否可以绑定信用卡？</h3>
      <div class="question">
        <p>不可以，只支持开通网银的储蓄卡。</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        status: [],
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
        this.status.push(false)
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
      this.$store.dispatch('setHeader', {show: true, background: '#fff', title: '注册绑卡'})
      this.$store.dispatch('hideFooter')
    }
  }
</script>