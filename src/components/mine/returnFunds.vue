<template>
  <div>
    <header class="mint-header is-fixed" style='background:#fff;'>
      <div class="mint-header-button is-left">
        <mt-button icon="back" @click.native='toPage(-1)'></mt-button>
      </div>
      <h1 class="mint-header-title" >下期回款</h1>
      <div class="mint-header-button is-right">
        <mt-button icon="more"></mt-button>
      </div>
    </header>
    <div class="container" v-show="data">
      <p>0.00 <br><span>合计金额(元)</span></p>
      <ul>
        <li>
          <div>购买项目</div>
          <div>回款日期</div>
          <div>金额(元)</div>
        </li>
        <li>
          <div>转贷项目2016期</div>
          <div>2016-05-20 9:00</div>
          <div>100</div>
        </li>
      </ul>
    </div>
    <div class="null" v-show="!data">暂无记录</div>
  </div>
</template>
<script>
  import {Button} from 'mint-ui'
  export default {
    data () {
      return {
        data: ''
      }
    },
    created () {
      this.$store.dispatch('setHeader', {show: false, title: '富通贷', background: '#fff'})
      this.$store.dispatch('hideFooter')
    },
    components: {
      [Button.name]: Button
    }
  }
</script>
<style scoped lang='scss'>
  @import "./../../assets/css/common/config";
  .guide {
    border: 1px solid #fff;
    height: 24px;
    padding: 0 5px;
    font-size: 0.24rem;
  }
  .container {
    margin-top: $titleHeight;
  }
  .null {
    margin-top: $titleHeight;
  }
</style>