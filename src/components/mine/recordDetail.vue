<template>
  <div class='detail'>
    <div class="tag" :class='tag'>
      <div :class='status'>{{status}}</div>
      <h3>{{parseFloat(detail.investor_capital) + parseFloat(detail.investor_interest) || 0}}</h3>
      <p>到账金额(元)</p>
    </div>
    <ul>
      <li>
        <span>投资金额(元)</span>
        <span>{{parseFloat(detail.investor_capital) || 0}}</span>
      </li>
      <li>
        <span>累计收益(元)</span>
        <span>{{parseFloat(detail.investor_interest) || 0}}</span>
      </li>
      <li>
        <span>投资期限(天)</span>
        <span>{{detail.borrow_duration}}</span>
      </li>
      <li>
        <span>预期年化收益率</span>
        <span>{{detail.borrow_interest_rate}}%</span>
      </li>
      <li>
        <span>投资周期</span>
        <span>{{new Date(detail.add_time * 1000).toLocaleDateString().replace(/\//ig,'-')}}至{{new Date(detail.deadline * 1000).toLocaleDateString().replace(/\//ig,'-')}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      status: '已结清', // 3还款中,1进行中,2已结清
      tag: '',
      detail: ''
    }
  },
  computed: mapState(['header']),
  created () {
    this.detail = JSON.parse(this.$route.params.id)
    this.status = ~~this.detail.status === 1 ? '还款中' : '已结清'
    this.tag = this.header.title
    this.$store.dispatch('setHeader', {show: true, fixed: false, background: 'transparent', color: '#fff', title: this.header.title + '记录明细'})
    this.$store.dispatch('hideFooter')
  },
  beforeRouteLeave (to, from, next) {
    if (!~to.path.indexOf('/assets')) {
      this.$store.dispatch('setHeader', {show: false, fixed: true, title: '富通贷', background: '#fff', color: ''})
      this.$store.dispatch('showFooter')
    }
    next()
  }
}
</script>
<style scoped lang='scss'>
  @import "./../../assets/css/common/config";
  .detail {
    margin-top: -48px;
  }
  .tag {
    width: 7.5rem;
    height: 5.2rem;
    background: url("./../../assets/images/mine/background-xsb.png")no-repeat center 100%;
    background-size: 100%;
    padding-top: 1.3rem;
    >div {
      width: 1.3rem;
      height: 1.75rem;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      background: url("./../../assets/images/mine/icon-ok.png")no-repeat top center;
      background-size: 100%;
      margin: 0 auto;
    }
    div.已结清 {
      background-image: url("./../../assets/images/mine/icon-ok.png");
    }
    div.还款中 {
      background-image: url("./../../assets/images/mine/icon-ing2.png");
    }
    div.进行中 {
      background-image: url("./../../assets/images/mine/icon-ing.png");
    }
    >h3 {
      font-size: 0.6rem;
      color: $mainColor;
      margin-top: $big-space;
    }
  }
  .tag.新手标 {
    background-image: url("./../../assets/images/mine/background-xsb.png");
  }
  .tag.转贷项目 {
    background-image: url("./../../assets/images/mine/background-zdxm.png");
  }
  .tag.定存通 {
    background-image: url("./../../assets/images/mine/background-dct.png");
  }
  ul {
    margin-top: $middle-space;
    background: #fff;
    li {
      display: flex;
      justify-content: space-between;
      padding: $big-space * 2;
      font-size: 0.32rem;
      border-bottom: 1px solid $bodycolor;
    }
  }
</style>