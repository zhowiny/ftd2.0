<template>
  <div class="titleHeight help noviceRead">
    <div :class='{active:status[0]}'>
      <h3 @click="toggle($event, 0)">什么是新手标产品？</h3>
      <div class="question">
        <p>新手标产品是富通贷专为刚注册的新人用户设置的一款投资门槛低，投资收益丰厚的理财产品，起投金额100元，先行赔付，一次性还款的标的。</p>
      </div>
    </div>
    <div :class='{active:status[1]}'>
      <h3 @click="toggle($event, 1)">什么是转贷项目产品？</h3>
      <div class="question">
        <p>转贷项目产品，又称转贷引导项目，是指政府为了扶持本地优质中小微企业，为其提供偿还银行贷款并续贷款的服务而设立的理财产品。</p>
      </div>
    </div>
    <div :class='{active:status[2]}'>
      <h3 @click="toggle($event, 2)">什么是定存通产品？</h3>
      <div class="question">
        <p>定存通理财产品是以房产抵押作为资产的互联网金融理财产品，定存通产品投资期限一般为6到12个月， 计息天数固定，与银行定存类似。在还款方式上，定存通每月返还利息，到期返还本金和最后一月的利息。</p>
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
      this.$store.dispatch('setHeader', {show: true, background: '#fff', title: '产品介绍'})
      this.$store.dispatch('hideFooter')
    }
  }
</script>