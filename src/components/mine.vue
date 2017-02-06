<template>
  <div>
    <div class="account">
      <header class="mint-header" style="background:transparent;color:#fff;border:none;">
        <div class="mint-header-button is-left">
          <router-link tag='span' to='/set' />
        </div>
        <h1 class="mint-header-title" >账户</h1>
        <div class="mint-header-button is-right">
          <router-link tag='span' to='/checkIn'>签到</router-link>
        </div>
      </header>
      <img src="./../assets/images/mine/user.png">
      <p class="money">
        <span>账户总资产(元)</span><br>
        <b>{{account.totalAmount || '--.--'}}</b>
      </p>
      <div>
        <p class="money">
          <span>可用余额(元)</span><br>
          <b>{{account.acountAmount || '--.--'}}</b>
        </p>
        <p class="money">
          <span>今日收益(元)</span><br>
          <b>{{account.todayAmount || '--.--'}}</b>
        </p>
      </div>
      <div>
        <div class="btn">
          <button @click="chrage">充值</button>
        </div>
        <div class="btn">
          <button @click="withdraw">提现</button>
        </div>
      </div>
    </div>
    <ul class="list" v-pre>
      <router-link tag='li' to='/assets'>
        <span class="icon assets"></span>
        <span>我的资产</span>
        <i class="leftArrow"></i>
      </router-link>
      <router-link tag='li' to='/benefit'>
        <span class="icon welfare"></span>
        <span>我的福利</span>
        <i class="leftArrow"></i>
      </router-link>
      <router-link tag='li' to='/invite'>
        <span class="icon inviteFriend"></span>
        <span>邀请好友</span>
        <i class="leftArrow"></i>
      </router-link>
      <!--<router-link tag='li' to='/bits'>
        <span class="icon activity"></span>
        <span>特权活动</span>
        <i class="leftArrow"></i>
      </router-link>-->
      <router-link tag='li' to='/set'>
        <span class="icon accountSet"></span>
        <span>账户设置</span>
        <i class="leftArrow"></i>
      </router-link>
      <router-link tag='li' to='/message'>
        <span class="icon message"></span>
        <span>信息中心</span>
        <i class="leftArrow"></i>
      </router-link>
      <router-link tag='li' to='/feedback'>
        <span class="icon suggestion"></span>
        <span>意见反馈</span>
        <i class="leftArrow"></i>
      </router-link>
    </ul>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {showModal} from './commons/modal'
export default {
  computed: mapState(['account', 'pkey', 'userInfo']),
  methods: {
    withdraw () {
      if (!this.checkStatus()) return
      this.$router.push({path: '/withdraw'})
    },
    chrage () {
      if (!this.checkStatus()) return
      this.$router.push({path: '/chrage'})
    },
    checkStatus () {
      if (!this.account.idcard) {
        showModal({content: '为了保障您的资金安全,购买前请实名认证', title: '实名认证', path: '/set/authenticate'})
        return false
      } else if (~~this.account.isPayPwd === 0) {
        showModal({content: '为了您的资金安全,请设置交易密码!', title: '交易密码', path: '/set/password/change/1/1'})
        return false
      } else if (!this.account.bankName) {
        showModal({content: '您还未绑定银行卡!请绑定银行卡!', title: '绑定银行', path: '/set/bankcard'})
        return false
      } else {
        return true
      }
    }
  },
  created () {
    if (!this.session('isLogin')) return
      // 如果登录了,请求用户账户信息
//      this.indicator.open()
    let user = this.userInfo
    this.$POST('/ua/uacount.json', {uid: user.uid, phone: user.phone, md5str: this.md5(this.pkey + user.phone)}).then(res => {
      if (parseInt(res.code) === 200) {
        this.session({'account': res.data})
        this.$nextTick(() => {
          this.$store.dispatch('setAccount', res.data)
        })
      } else {
        this.toast(res.msg)
      }
    }).catch(err => {
      this.toast(err.toString())
    })
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