<template>
  <transition name='slideIn' tag='div'>
    <div class="safe slideIn" v-pre>
      <img src="./../../assets/images/find/safeBanner.jpg">
      <div class="cnt">
        <h3>01.投资安全</h3>
        <ul>
          <li>借款人与富通贷签订合同，受法律保护</li>
          <li>如发生逾期，专业的律师团队业务人员及时进行收回</li>
          <li>严格的核查制度，资金变动进行监测与确认</li>
          <li>政策层面强力保障，多项措施并举，提高投资者资金的安全系数</li>
        </ul>
        <h3>02.资金安全</h3>
        <ul>
          <li>安全、正规、专业</li>
          <li>资金交易的真实和资金安全</li>
          <li>资金变动进行监测与确认</li>
          <li>政策层面强力保障，多项措施并举</li>
          <li>提高投资者资金的安全系数</li>
          <li>关键环节强化管理，资金的流转过程清</li>
          <li>第三方存管</li>
        </ul>
        <h3>03.技术安全</h3>
        <ul>
          <li>拥有独立的网站服务器</li>
          <li>更具安全优势的Linux操作系统</li>
          <li>专人维护、定期安检升级</li>
          <li>配以先进的软硬件防火墙设备</li>
          <li>确保网站被攻击几率最低</li>
          <li>有效防止来自外部的安全威胁</li>
          <li>所有的隐私信息都经过MD5加密处理</li>
          <li>防止任何人包括公司员工获取用户信息</li>
          <li>法律形式保证用户信息绝密</li>
        </ul>
        <h3>04.合法合规</h3>
        <ul>
          <li>法律方面保障措施多样</li>
          <li>有强大的律师服务机构</li>
          <li>政策多方支持</li>
          <li>政府作为坚强的后盾</li>
          <li>有良好的背景支持</li>
          <li>遵循行业内的规则</li>
          <li>提供高质量的互联网金融服务</li>
        </ul>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  created () {
    this.$store.dispatch('setHeader', {show: true, background: '#fff', title: '安全保障'})
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
  .safe {
    text-align: left;
    background: #fff;
    >img {
      width: 7.5rem;
      height: 2.3rem;
    }
  }
  .cnt {
    padding: $big-space * 4 $big-space * 2;
    h3 {
      font-size: 0.3rem;
      color: #fff;
      display: inline-block;
      width: 2.4rem;
      height: 0.5rem;
      line-height: 0.5rem;
      background: #608dd0;
      border-radius: 0.25rem;
      font-weight: normal;
      padding-left: 0.2rem;
      margin-top: $big-space * 2;
      position: relative;
      &:first-child {
        margin-top: 0;
      }
      &:after {
        content: '';
        display: inline-block;
        position: absolute;
        right: -0.25rem;
        width: 0.5rem;
        height: 0.5rem;
        background: #fff;
        transform: skew(18deg);
      }
    }
    ul li {
      font-size: 0.26rem;
      line-height: 0.5rem;
      padding-left: 0.6rem;
      background: url("./../../assets/images/find/gou.jpg") no-repeat 0.15rem 0.1rem;
      background-size: 0.3rem 0.3rem;
    }
  }
</style>