<template>
  <div class="titleHeight help noviceRead">
    <div :class='{active:status[0]}'>
      <h3 @click="toggle($event, 0)">购买富通贷产品有合同保障吗？</h3>
      <div class="question">
        <p>用户成功投资后，系统会自动生成在线电子协议，用户登录后可在账户中心对应订单的详细页面查看。富通贷对于客户的收益进行全方位的保障，不仅有政府层面与银行方面完整的体制机制与管理模式， 更有科学的评估体系与法律法规整合，使收益的安全性充分得到保护，最大化地维护客户的利益。</p>
      </div>
    </div>
    <div :class='{active:status[1]}'>
      <h3 @click="toggle($event, 1)">产品期限和年化率，该怎么计算？ </h3>
      <div class="question">
        <p>以30天转贷产品为例，年化收益率 6% ，客户投资10万元，获得的收益按如下计算：<img src="./../../assets/images/find/formula.jpg"></p>
      </div>
    </div>
    <div :class='{active:status[2]}'>
      <h3 @click="toggle($event, 2)">投资后什么时候开始计算收益？</h3>
      <div class="question">
        <p>用户投资成功后，根据您当前投资的产品的不同，计息的方式也有所不同，详细请看产品说明。</p>
      </div>
    </div>
    <div :class='{active:status[3]}'>
      <h3 @click="toggle($event, 3)">产品到期后本金和收益如何返还，多久可以到账？</h3>
      <div class="question">
        <p>产品到期后本金和收益将自动返还至用户的个人账户中。用户申请提现后，为了确保资金安全，平台需进行审核， 无误后提现金额将返还至您绑定的银行卡中，到账时间一般在1-5个工作日内，实际到账时间还以具体的产品情况为准。</p>
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
      this.$store.dispatch('setHeader', {show: true, background: '#fff', title: '收益保障'})
      this.$store.dispatch('hideFooter')
    }
  }
</script>