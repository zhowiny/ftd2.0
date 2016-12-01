<template>
  <div>
    <div class="account">
      <header class="mint-header" style="background:transparent;color:#fff;border:none;">
        <div class="mint-header-button is-left">
          <router-link tag='span' to='/' />
        </div>
        <h1 class="mint-header-title" >账户</h1>
        <div class="mint-header-button is-right">
          <router-link tag='span' to='/'>签到</router-link>
        </div>
      </header>
      <img src="./../assets/images/mine/user.png">
      <p class="money">
        <span>账户总资产(元)</span><br>
        <b>0.00</b>
      </p>
      <div>
        <p class="money">
          <span>账户总资产(元)</span><br>
          <b>0.00</b>
        </p>
        <p class="money">
          <span>账户总资产(元)</span><br>
          <b>0.00</b>
        </p>
      </div>
      <div>
        <div class="btn">
          <router-link tag='button' to='/'>充值</router-link>
        </div>
        <div class="btn">
          <router-link tag='button' to='/'>提现</router-link>
        </div>
      </div>
    </div>
    <ul class="list" v-pre>
      <router-link tag='li' to='/'>
        <span class="icon assets"></span>
        <span>我的资产</span>
        <i class="leftArrow"></i>
      </router-link>
      <router-link tag='li' to='/bits'>
        <span class="icon welfare"></span>
        <span>我的福利</span>
        <i class="leftArrow"></i>
      </router-link>
      <router-link tag='li' to='/bits'>
        <span class="icon inviteFriend"></span>
        <span>邀请好友</span>
        <i class="leftArrow"></i>
      </router-link>
      <router-link tag='li' to='/bits'>
        <span class="icon activity"></span>
        <span>特权活动</span>
        <i class="leftArrow"></i>
      </router-link>
      <router-link tag='li' to='/bits'>
        <span class="icon accountSet"></span>
        <span>账户设置</span>
        <i class="leftArrow"></i>
      </router-link>
      <router-link tag='li' to='/bits'>
        <span class="icon message"></span>
        <span>信息中心</span>
        <i class="leftArrow"></i>
      </router-link>
      <router-link tag='li' to='/bits'>
        <span class="icon suggestion"></span>
        <span>意见反馈</span>
        <i class="leftArrow"></i>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      auth: 'zhowiny'
    }
  },
  components: {
  }
}
</script>
<style scoped lang='scss'>
  @import "./../assets/css/common/config";
  .account {
    background: linear-gradient(to bottom, #F37227, #EC5629);
    color: #fff;
    padding-bottom: $big-space * 2;
    font-family: '方正兰亭超细黑简体';
    .is-left span{
      display: inline-block;
      width: 0.45rem;
      height:0.45rem;
      background-image: url("./../assets/images/mine/setting.png");
      background-size: 100% 100%;
    }
    .is-right span {
      display: inline-block;
      padding: 5px 15px;
      border: 1px solid #fff;
      border-radius: 5px;
      font-size: 12px;
    }
    img {
      border-radius: 50%;
      width: 1.2rem;
      height: 1.2rem;
    }
    .money {
      color: #f1f1f1;
      span,b {font-size: 0.28rem;}
      b {font-size: 0.52rem;}
    }
    >div {
      font-size: 0;
      .money {
        text-align: right;
        display: inline-block;
        width: 50%;
        padding-right: $big-space * 2;
      }
      .money:last-child {
        text-align: left;
        border-left: 1px solid #fff;
        padding-left: $big-space * 2;
      }
    }
    .btn {
      width: 50%;
      display: inline-block;
      font-size: 0.32rem;
      margin-top: $big-space;
      button {
        background: transparent;
        outline: none;
        border: 1px solid #fff;
        border-radius: 5px;
        width: $big-space * 10;
        padding: $small-space 0;
      }
    }
  }
  .list {
    margin-bottom: 55px;
  }
  .list li .icon.assets {background-image: url("./../assets/images/mine/assets.png");}
  .list li .icon.welfare {background-image: url("./../assets/images/mine/welfare.png");}
  .list li .icon.inviteFriend {background-image: url("./../assets/images/mine/inviteFriend.png");}
  .list li .icon.accountSet {background-image: url("./../assets/images/mine/accountSet.png");}
  .list li .icon.message {background-image: url("./../assets/images/mine/message.png");}
  .list li .icon.suggestion {background-image: url("./../assets/images/mine/suggestion.png");}
</style>