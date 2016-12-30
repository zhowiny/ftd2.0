<template>
  <transition name='slideIn'>
    <div class="slideIn">
      <div class="withdraw" :class='{active:active}'>
        <div class="apply">
          <mt-cell title="可用余额" >
            <div class="cell"><span>¥0.00</span>元</div>
          </mt-cell>
          <mt-cell title="免费提现次数" >
            <div class="cell">1</div>
          </mt-cell>
          <mt-cell title="提现银行卡" >
            <div class="cell">中国工商银行 (*9999)</div>
          </mt-cell>
          <div class="space"></div>
          <mt-cell title="提现金额" >
            <div class="cell">
              <input type="text" placeholder="请输入提现金额"/>元
            </div>
          </mt-cell>
          <mt-cell title="提现手续费" >
            <div class="cell"><span>0.00</span>元</div>
          </mt-cell>
          <mt-cell title="实际到账金额" >
            <div class="cell"><span>0.00</span>元</div>
          </mt-cell>
          <div class="space"></div>
          <mt-cell title="支付密码" >
            <div class="cell">
              <input type="password" placeholder="请输入支付密码"/>
            </div>
          </mt-cell>
          <mt-cell title="验证码" >
            <div class="cell">
              <input type="password" placeholder="请输入短信验证码"/>
              <a class="btn" @click="countdown">{{countText}}</a>
            </div>
          </mt-cell>
          <button class="withdraw" @click="widthdraw">提现申请</button>
        </div>
        <div class="success">
          <div class="tip">
            <img src="./../../assets/images/account/success.png">
            <p>您的提现申请已成功提交</p>
          </div>
          <mt-cell title="提现至" >
            <div class="cell">中国工商银行 (*9999)</div>
          </mt-cell>
          <mt-cell title="提现金额" >
            <div class="cell"><span>0.00</span>元</div>
          </mt-cell>
          <mt-cell title="预计到账时间" >
            <div class="cell">1-3个工作日</div>
          </mt-cell>
          <router-link to='/mine'>
            <button class="withdraw">完成</button>
          </router-link>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import {Cell} from 'mint-ui'
  export default {
    data () {
      return {
        active: false,
        countText: '获取',
        time: '',
        clickable: true
      }
    },
    methods: {
      widthdraw () {
        this.active = true
        this.$store.dispatch('setHeader', {title: '完成提现'})
      },
      countdown () {
        // 获取验证倒计时
        if (!this.clickable) return
        this.clickable = false
        this.countText = 6
        this.time = setInterval(() => {
          if (this.countText <= 0) {
            this.countText = '重新获取'
            clearInterval(this.time)
            this.clickable = true
            return
          }
          this.countText --
        }, 1000)
      }
    },
    beforeRouteLeave (to, from, next) {
      this.$store.dispatch('setHeader', {show: false, title: '富通贷', background: '#fff'})
      this.$store.dispatch('showFooter')
      next()
    },
    created () {
      this.$store.dispatch('setHeader', {show: true, background: '#fff', title: '提现'})
      this.$store.dispatch('hideFooter')
    },
    components: {
      [Cell.name]: Cell
    }
  }
</script>
<style scoped lang='scss'>
  @import "./../../assets/css/common/config";
  .slideIn {
    background: transparent;
    width: 7.5rem;
    overflow-x: hidden;
  }
  .withdraw {
    width: 15rem;
    @include clearfix();
    transition: transform .5s;
  }
  .withdraw.active {
    transform: translate3d(-7.5rem,0,0);
  }
  .success,.apply {
    float: left;
    width: 7.5rem;
  }
  .cell {
    color: $deepColor;
    display: flex;
    align-items: stretch;
    line-height: $titleHeight - 2px;
    input {
      border: none;
      outline: none;
      color: $mainColor;
      text-align: right;
      padding-right: $big-space;
    }
    span {
      color: $mainColor;
      margin-right: $big-space;
    }
    .btn {
      box-sizing: border-box;
      width: 2rem;
      display: inline-block;
      background: $mainColor;
      margin-right: -10px;
      color: #fff;
      padding: 0 $big-space * 2;
    }
  }
  button.withdraw {
    background: $mainColor;
    color:#fff;
    border: none;
    outline: none;
    width: 6.5rem;
    margin-top: 1rem;
    padding: $middle-space * 2 0;
    font-size: 0.4rem;
    border-radius: 5px;
  }
  .tip {
    background: #fff;
    color: $mainColor;
    font-size: 0.36rem;
    padding: $big-space * 2 0;
    border-top: 1px solid $bodycolor;
    img {
      width: 1.3rem;
      height: 1.3rem;
    }
  }
</style>