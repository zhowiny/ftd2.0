<template>
  <div>
    <header class="mint-header is-fixed" style='background:transparent;color:#fff;'>
      <div class="mint-header-button is-left">
        <router-link to='/mine'>
          <mt-button icon="back"></mt-button>
        </router-link>
      </div>
      <h1 class="mint-header-title" >签到记录</h1>
      <div class="mint-header-button is-right">
        <mt-button class='guide' @click='guide'>签到攻略</mt-button>
      </div>
    </header>
    <div class='wrap'>
      <img src="./../../assets/images/mine/user.png">
      <p>100积分</p>
      <div>签到成功,今天已领取3积分!</div>
    </div>
    <div class="check-in">
      <div v-for="i in 7">
        <p :class='{active: i<=3}'>积分 +{{i == 6?i * 2:i * 2 - 1}}</p>
        <span>第{{i}}天</span>
      </div>
    </div>
  </div>
</template>
<script>
  import {Button} from 'mint-ui'
  import {showModal} from './../commons/modal'
  export default {
    methods: {
      guide () {
        showModal({
          title: '签到攻略',
          content: `<p>1.每日签到积分逐渐递增2积分;</p>
                    <p>2.连续签到5天额外奖励5积分;</p>
                    <p>3.连续签到7天额外奖励10积分;</p>
                    <p>4.积分可兑换代金券投资抵扣使用;</p>
                    <p>5.代金券在我的福利中查看, 并使用!</p>`
        })
      }
    },
    created () {
      this.$store.dispatch('hideFooter')
    },
    destroyed () {
      this.$store.dispatch('showFooter')
    },
    components: {
      [Button.name]: Button
    }
  }
</script>
<style scoped lang='scss'>
  @import "./../../assets/css/common/config";
  .mint-header .mint-header-button  .mint-button{
    color:#fff;
  }
  .guide {
    border: 1px solid #fff;
    height: 24px;
    padding: 0 5px;
    font-size: 0.24rem;
  }
  .wrap {
    width: 7.5rem;
    height: 4.56rem;
    background: url("./../../assets/images/mine/banner-checkIn.png") no-repeat center;
    background-size: 100%;
    padding-top: 48px;
    color: #0871B6;
    font-size: 0.32rem;
    img {
      width: 1.2rem;
      height: 1.2rem;
    }
    p {
      font-weight: bold;
      padding: $big-space 0;
      margin-bottom: $big-space;
    }
    div {
      display: inline-block;
      margin: 0 auto;
      padding: $small-space $big-space;
      border: 1px solid #0871B6;
      border-radius: 2rem;
    }
  }
  .check-in {
    width: 7rem;
    height: 6.85rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    /*justify-content: space-around;*/
    margin: 0 auto;
    margin-top: -0.6rem;
    padding: 1.5rem $big-space * 3;
    background: url("./../../assets/images/mine/background-checkIn.png")no-repeat center;
    background-size: 100%;
    div {
      padding: 0 ((7rem - $big-space * 3 * 2) / 4 - 1.12rem) /2; /*0.2025*/
    }
    p {
      border-radius: 5px;
      width: 1.12rem;
      height: 1.12rem;
      font-size: 0.24rem;
      padding-top: 0.75rem;
      color: $lightColor;
      background: url("./../../assets/images/mine/checkIn.png");
      background-size: 100%;
    }
    p.active {
      color: $mainColor;
      background-image: url("./../../assets/images/mine/checkIn-active.png");
    }
  }
</style>