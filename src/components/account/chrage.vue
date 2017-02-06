<template>
  <transition name='slideIn' tag='div'>
    <div class="slideIn chrage">
      <div class="cell step">
        <span>实名认证</span>
        <span>设置密码</span>
        <span>充值</span>
      </div>
      <div class="cell bank">
        <div>
          <img :src="account.logoSquare">
        </div>
        <div>
          <p>{{account.bankName}}</p>
          <p>卡号{{account.bankNo}}</p>
        </div>
      </div>
      <div class="cell">
        <p>充值金额</p>
        <input type="text" placeholder="请输入充值金额" v-model="money">
      </div>
      <div class="cell">
        <p>充值后的账户总金额(元)</p>
        <p class="color">{{total}}</p>
      </div>
      <!--<div class="cell">
        <p>交易密码</p>
        <input type="password" placeholder="请输入交易密码">
      </div>-->
      <button class='chrage' @click="chrage">立即充值</button>
      <!--弹出框-->
      <!--<div class="mask" v-show="confirme">
        <div class="modal">
          <span @click="hideBox">&times;</span>
          <h3>确认充值</h3>
          <div class="password-content">
            <div>
              <p>¥1000</p>
              <p>验证码已发送您注册时的手机上182****9211</p>
            </div>
            <div>
              <input type="text" placeholder="请输入短信验证码">
              <span @click="getVerifyCode">{{countText}}</span>
            </div>
          </div>
          <div class="modal-btn">
            <div class="confirme" @click="hideBox">确定</div>
          </div>
        </div>
      </div>-->
    </div>
  </transition>
</template>
<script>
//  import {showModal} from './../commons/modal'
  import {mapState} from 'vuex'
//  import axios from 'axios'
  export default {
    data () {
      return {
        confirme: false,
        countText: '获取',
        time: '',
        clickable: true,
        money: ''
      }
    },
    computed: {
      ...mapState(['pkey', 'account', 'userInfo']),
      total () {
        let m
        m = parseFloat(this.money || 0)
        m = (this.account.acountAmount * 100 + m * 100) / 100
        return Number(m).toFixed(2)
      }
    },
    methods: {
      chrage () {
        if (!/^\d+(\.[\d]{1,2})?$/.test(this.money)) {
          this.toast('请输入正确的金额!')
          return
        }
        // todo 上线前改成正确的充值地址
        let url = 'http://www.futongdai.com'
//        let url = 'http://test.futongdai.com:38022/FTD'
        this.$POST(url + '/chargeH5API.htm?payFlg=6&chargeMoney=' + this.money + '&userId=' + this.userInfo.uid, {}).then((res) => {
          window.location.href = res
        }).catch((err) => {
          this.toast(err.toString())
        })
      },
      hideBox () {
        this.confirme = false
//        clearInterval(this.time)
      },
      countdown () {
        // 获取验证倒计时
        this.countText = 60
        this.time = setInterval(() => {
          if (this.countText <= 0) {
            this.countText = '获取'
            clearInterval(this.time)
            this.clickable = true
            return
          }
          this.countText --
        }, 1000)
      },
      getVerifyCode () {
        // 获取验证码
        if (!this.clickable) return
        this.clickable = false
        this.$POST('/sendmsg.json', {
          uid: this.userInfo.uid || '',
          uphone: this.userInfo.phone,
          type: 0,
          pkey: this.pkey,
          md5str: this.md5(this.pkey + (this.userInfo.uid || '') + this.userInfo.phone)
        }).then(res => {
          if (parseInt(res.code) === 200) {
            this.toast('发送成功!')
            this.countdown()
          } else {
            this.toast(res.msg)
            this.clickable = true
          }
        }).catch(err => {
          this.toast(err.toString())
          this.clickable = true
        })
      }
    },
    created () {
      this.$store.dispatch('setHeader', {show: true, background: '#fff', title: '充值'})
      this.$store.dispatch('hideFooter')
    },
    destroyed () {
      this.$store.dispatch('setHeader', {show: false})
      this.$store.dispatch('showFooter')
    }
  }
</script>
<style scoped lang='scss'>
  @import "./../../assets/css/common/config";
  .chrage {
    background: transparent;
    .cell {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      margin-top: $middle-space;
      height: 1rem;
      padding: 0 $big-space * 2;
      input {
        border: none;
        text-align: right;
        outline: none;
        color: $mainColor;
      }
      .color {
        color: $mainColor;
      }
    }
    .step,.bank {
      justify-content: flex-start;
    }
    .bank {
      div {
        text-align: left;
        p {
          font-size: 0.24rem;
          &:first-child {
            font-size: 0.32rem;
          }
        }
      }
      div:first-child {
        height: 0.8rem;
        width: 2rem;
        img {
          height: 100%;
        }
      }
    }
    .step {
      background: $mainColor;
      color:#fff;
      span {
        width: 1.8rem;
        &:before {
          content: '1';
          display: inline-block;
          width: 0.4rem;
          height: 0.4rem;
          border-radius: 50%;
          background: #fff;
          color: $mainColor;
          margin-right: $middle-space;
        }
        &:nth-of-type(2):before {
          content: '2';
        }
        &:nth-of-type(3):before {
          content: '3';
        }
      }
    }
  }
  button.chrage {
    background: $mainColor;
    color: #fff;
    border: none;
    border-radius: 5px;
    margin: 1rem $big-space * 2 0 $big-space * 2;
    padding: $big-space * 2 0;
    width: 6.9rem;
    font-size: 0.32rem;
  }
  .mask {
    position: fixed;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0,0,0,.5);
    z-index: 100;
  }
  .modal {
    position: fixed;
    top:25%;
    left:50%;
    transform: translate(-50%);
    width: 6.8rem;
    z-index: 101;
    background: rgba(255,255,255,1);
    border-radius: 0.3rem;
    text-align: center;
    >span {
      display: block;
      position: absolute;
      width: 0.5rem;
      height: 0.5rem;
      right: 0.3rem;
      top: -0.3rem;
      border-radius: 50%;
      font-size: 0.6rem;
      line-height: 0.5rem;
      border: 1px solid $lightColor;
      background: #fff;
      color: darken($lightColor, 20%);
    }
    >h3 {
      padding: $big-space 0;
      border-bottom: 1px dashed $lightColor;
      margin-bottom: $big-space * 3;
      color:#444;
      font-size: 0.36rem;
      font-weight: normal;
    }
  }
  .password-content {
    padding: 0 0.8rem;
    text-align: left;
    font-size: 0.32rem;
    color: $mainColor;
    >div {
      display: flex;
      height: 0.8rem;
      align-items: stretch;
      flex-wrap: wrap;
      &:first-child {
        margin-bottom: $big-space * 2;
      }
      p {
        flex: 1 1 100%;
        align-self: center;
        text-align: center;
        font-size: 0.36rem;
        &:last-child {
          font-size: 0.24rem;
          color: $lightColor;
        }
      }
      input {
        border: none;
        border-bottom: 1px solid $mainColor;
        outline: none;
        flex: 1 1 3.6rem;
      }
      span {
        display: block;
        flex: 1 1 1.5rem;
        padding: $big-space 0;
        border-radius: 8px;
        margin-left: calc(0.1rem - 2px);
        border: 1px solid $mainColor;
        text-align: center;
        align-self: center;
      }
    }
  }
  .modal-btn {
    display: flex;
    margin-top: $big-space * 3;
    margin-bottom: $big-space * 3;
    justify-content: center;
    >div {
      width: 2rem;
      margin: 0 $big-space * 2;
      padding: $big-space 0;
      border-radius: 8px;
      background: $lightColor;
      color:#fff;
      font-size: 0.32rem;
    }
    div.confirme {
      background: $mainColor;
      width: 80%;
    }
  }
</style>