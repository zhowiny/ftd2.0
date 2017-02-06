<template>
  <div class="titleHeight help noviceRead">
    <div :class='{active:status[0]}'>
      <h3 @click="toggle($event, 0)">用户购买产品时如何支付？</h3>
      <div class="question">
        <p>用户下单购买产品时，正确输入验证码和支付密码后，富通贷平台会直接在您的账户余额中扣除相应的款项。</p>
      </div>
    </div>
    <div :class='{active:status[1]}'>
      <h3 @click="toggle($event, 1)">产品列表页购买时页面上显示“已完成”表示什么意思？</h3>
      <div class="question">
        <p>“已完成”表示这个标的已经满标，请选择其他进行中的标的进行购买。</p>
      </div>
    </div>
    <div :class='{active:status[2]}'>
      <h3 @click="toggle($event, 2)">未支付完成的订单在哪里支付?</h3>
      <div class="question">
        <p>进入“我的帐户”，点击“我的资产”，在对应的产品中找到未支付的订单，点击支付完成交易。</p>
      </div>
    </div>
    <div :class='{active:status[3]}'>
      <h3 @click="toggle($event, 3)">投资完成的记录在哪里看？</h3>
      <div class="question">
        <p>登陆富通贷平台后，进入账户中心，点击“我的资产”进入“交易记录”页面可以查看您自己的投资记录信息。</p>
      </div>
    </div>
    <div :class='{active:status[4]}'>
      <h3 @click="toggle($event, 4)">投资到期后，回款资金在哪里查看？</h3>
      <div class="question">
        <p>投资到期后，进入账户中心，点击“我的资产”，在“下期回款”中进行查看。</p>
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
      this.$store.dispatch('setHeader', {show: true, background: '#fff', title: '投资操作'})
      this.$store.dispatch('hideFooter')
    }
  }
</script>