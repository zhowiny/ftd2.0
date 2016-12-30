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
          <img src="./../../assets/images/account/gs.png">
        </div>
        <div>
          <p>工商银行</p>
          <p>尾号****9999</p>
        </div>
      </div>
      <div class="cell">
        <p>充值金额</p>
        <input type="text" placeholder="请输入充值金额">
      </div>
      <div class="cell">
        <p>充值后的账户总金额(元)</p>
        <p class="color">0.00</p>
      </div>
      <div class="cell">
        <p>支付密码</p>
        <input type="password" placeholder="请输入支付密码">
      </div>
      <button class='chrage' @click="chrage">立即充值</button>
      <!--弹出框-->
      <div class="mask" v-show="confirme">
        <div class="modal">
          <span @click="hideBox">&times;</span>
          <h3>确认充值</h3>
          <div class="password-content">
            <div>
              <p>¥1000</p>
              <p>验证码已发送您注册时的手机上182****9211</p>
            </div>
            <div>
              <input type="password" placeholder="请输入短信验证码">
              <span @click="countdown">{{countText}}</span>
            </div>
          </div>
          <div class="modal-btn">
            <div class="confirme" @click="hideBox">确定</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import {showModal} from './../commons/modal'
  export default {
    data () {
      return {
        confirme: true,
        countText: '获取',
        time: '',
        clickable: true
      }
    },
    methods: {
      chrage () {
        showModal({
          title: '充值成功',
          content: `
          <div style="text-align:center">
            <img style="width:1.3rem;height:1.3rem;" src="${require('./../../assets/images/account/success.png')}" alt="">
            <p>充值金额(元): <span>100.00</span></p>
            <p>账户总额(元): <span>100.00</span></p>
          </div>`
        })
      },
      hideBox () {
        this.confirme = false
        clearInterval(this.time)
      },
      countdown () {
        // 获取验证倒计时
        if (!this.clickable) return
        this.clickable = false
        this.countText = 60
        this.time = setInterval(() => {
          if (this.countText <= 0) {
            this.countText = '重新发送'
            clearInterval(this.time)
            this.clickable = true
            return
          }
          this.countText --
        }, 1000)
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