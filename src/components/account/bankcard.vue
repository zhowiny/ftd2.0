<template>
  <transition name='slideIn'>
    <div class="slideIn set">
      <div class="container" :class='active'>
        <div class="set">
          <p>仅允许绑定与实名认证身份一致的银行卡</p>
          <mt-cell title="真实姓名" >
            <span style="color:#ff4e00;">{{account.realName}}</span>
          </mt-cell>
          <div class="space"></div>
          <mt-cell title="选择银行" >
            <div class="selected" @click.self="toggleSelected" :class='{active:selected}'>
              <i v-text="selectedVal.value" :class='{bank: selectedVal.key}' @click.self="toggleSelected"></i>
              <ul :class='{active:selected}'>
                <li v-for="i in account.bankList" :class='{active: i.key==selectedVal.key}' @click.self="selecte(i)">{{i.value}}</li>
              </ul>
            </div>
          </mt-cell>
          <mt-cell title="银行卡号" >
            <input type="text" v-model="data.bankNum" placeholder="请输入储蓄卡卡号" />
          </mt-cell>
          <mt-cell title="开户地址" >
            <input type="text" v-model="data.bankAddress" placeholder="请输入开户行地址" />
          </mt-cell>
          <div class="space"></div>
          <mt-cell title="支付密码" >
            <input type="password" v-model="data.payPwd" placeholder="请输入您的支付密码" />
          </mt-cell>
          <router-link to=''>
            <button class="ftd-btn" @click="hasData">下一步</button>
          </router-link>
        </div>
        <div class="verify">
          <p>我们已经发送验证致您的手机{{userInfo.phone}}</p>
          <div class="space"></div>
          <mt-cell title="开户银行" >
            <div class="cell">
              <input type="text" :value="selectedVal.value + '　' + data.bankNum.slice(-4)" disabled/>
              <a class="btn" @click="nextstep('active')">更改</a>
            </div>
          </mt-cell>
          <div class="space"></div>
          <mt-cell title="验证码" >
            <div class="cell">
              <input type="text" v-model="data.verifyCode" placeholder="请输入短信验证码"/>
              <a class="btn" @click="getVerifyCode">{{countText}}</a>
            </div>
          </mt-cell>
          <button class="ftd-btn" @click="bindCard">下一步</button>
        </div>
        <div class="card">
          <div class="bank" :style='{backgroundImage: account.logoBg}'>
            <div class="logo">
              <img :src="account.logoRound">
            </div>
            <div class="name">
              <p>{{account.bankName}}</p>
              <p>储蓄卡</p>
              <p>{{account.bankNo}}</p>
            </div>
          </div>
          <div class='tip'>
            <h4>温馨提示</h4>
            <p>为了保证您的资金安全,请使用绑定的银行卡进行充值和提现,如果您要修改已绑定过的银行卡,可在"我的银行卡"中,更换银行卡</p>
          </div>
          <!--<router-link to=''>
            <button class="ftd-btn">更换银行卡</button>
          </router-link>-->
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import {Cell} from 'mint-ui'
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        selected: false,
        selectedVal: {
          value: '请选择发卡银行'
        },
        active: false,
        countText: '获取',
        time: '',
        clickable: true,
        data: {
          bankNum: '',
          bankAddress: '',
          payPwd: '',
          verifyCode: ''
        }
      }
    },
    computed: mapState(['pkey', 'account', 'userInfo']),
    methods: {
      toggleSelected () {
        this.selected = !this.selected
      },
      selecte (val) {
        this.selectedVal = val
        this.selected = false  // 选择之后直接隐藏
      },
      slideToggle (index) {
        this.status.splice(index, 1, !this.status[index])
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
          md5str: this.md5(this.pkey + this.userInfo.uid + this.userInfo.phone)
        }).then(res => {
          if (parseInt(res.code) === 200) {
            this.toast('发送成功!')
            this.countdown()
          } else {
            this.toast(res.msg)
          }
        }).catch(err => {
          this.toast(err.toString())
        })
      },
      bindCard () {
        if (!this.$store.state.isLogin) return
        if (!this.data.verifyCode) {
          this.toast('验证码不能为空!')
          return
        }
        // todo 省市联动后期加上
        this.$POST('/ua/ubindcard.json', {
          uid: this.userInfo.uid,
          bankId: this.selectedVal.key,
          bankNum: this.data.bankNum,
          bankAddress: this.data.bankAddress,
          payPwd: this.data.payPwd,
          province: '',
          city: '',
          verifyCode: this.data.verifyCode,
          md5str: this.md5(this.pkey + this.userInfo.uid + this.data.bankNum)
        }).then(res => {
          if (parseInt(res.code) === 200) {
            this.toast('绑定银行卡成功!')
            this.$router.replace({path: '/mine'})
          } else {
            this.toast(res.msg)
          }
        }).catch(err => {
          this.toast(err.toString())
        })
      },
      hasData () {
        if (~~this.userInfo.payPwdStatus === 0) {
          this.toast('您还未设置交易密码!请先设置交易密码!')
          return
        }
        if (!this.selectedVal.key) {
          this.toast('请选择银行!')
          return
        }
        if (!this.data.bankNum || this.data.bankNum.length < 10) {
          this.toast('请输入正确的银行卡号!!')
          return
        }
        if (!this.data.bankAddress) {
          this.toast('请输入开户银行地址!')
          return
        }
        if (!this.data.payPwd) {
          this.toast('请输入交易密码!')
          return
        }
        this.getVerifyCode()
        this.nextstep('active1')
      },
      nextstep (name) {
        this.active = name
        this.$store.dispatch('setHeader', {title: name === 'active1' ? '短信验证' : '我的银行卡'})
      }
    },
    beforeRouteLeave (to, from, next) {
      if (!~to.path.indexOf('/set')) {
        this.$store.dispatch('setHeader', {show: false, title: '富通贷', background: '#fff'})
        this.$store.dispatch('showFooter')
      }
      next()
    },
    created () {
      this.$store.dispatch('setHeader', {show: true, background: '#fff', title: '我的银行卡'})
      this.$store.dispatch('hideFooter')
      !!this.account.bankNum && this.nextstep('active2')
    },
    components: {
      [Cell.name]: Cell
    }
  }
</script>
<style lang='scss'scoped>
  @import "./../../assets/css/common/config";
  .container {
    width: 22.5rem;
    transition: transform .5s;
    @include clearfix()
  }
  .container.active1 {
    transform: translate3d(-7.5rem,0,0);
  }
  .container.active2 {
    transform: translate3d(-15rem,0,0);
  }
  .slideIn.set {
    width: 7.5rem;
    overflow-x: hidden;
  }
  .set,.verify,.card {
    width: 7.5rem;
    float: left;
  }
  .mint-cell {
    overflow: visible;
  }
  .set input {
    width: 5rem;
    color: $mainColor;
    border: none;
    outline: none;
  }
  .set>p,.verify>p {
    text-align: left;
    background: $mainColor;
    color: #fff;
    padding: $big-space * 2;
  }
  .set span {
    width: 5rem;
    text-align: left;
  }
  .selected.active:before {
    background: $mainColor;
    transform: rotate3d(1, 0, 0, 180deg);
  }

  .selected {
    position: relative;
    min-width: 2.4rem;
    width: 5rem;
    height: 40px;
    text-align: left;
    i {
      font-style: normal;
      line-height: 40px;
    }
    i.bank {
      color: $mainColor;
    }
    ul {
      position: absolute;
      z-index: 1000;
      top: 100%;
      left: 0;
      width: 100%;
      height: 3rem;
      overflow-y: scroll;
      overflow-x: hidden;
      background: rgba(222, 222, 222, .8);
      text-align: left;
      border-radius: 10px;
      transition: transform .5s;
      transform: scale3d(1, 0, 0);
      transform-origin: top center;
      li {
        padding: $big-space $big-space * 2;
        border-bottom: 1px solid #fff;
        box-sizing: border-box;
        overflow: hidden;
      }
      li:last-child {
        border: none;
        border-radius: 0 0 10px 10px;
      }
      li:first-child {
        border-radius:10px 10px 0 0 ;
      }
    }
    ul.active {
      transform: scale3d(1, 1, 1);
    }
    li.active {
      background: rgba(255, 111, 33, .8);
      color: #fff;
    }
  }
  .cell {
    color: $deepColor;
    display: flex;
    width: 5rem;
    align-items: stretch;
    line-height: $titleHeight - 2px;
    justify-content: space-between;
    input {
      /*width: auto;*/
      border: none;
      outline: none;
      color: $mainColor;
      text-align: left;
      padding-right: $big-space;
      width: 3rem;
    }
    input:disabled {
      background: transparent;
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
  .card {
    .bank {
      margin: $middle-space * 2;
      background: url("./../../assets/images/account/bg2.png")no-repeat center;
      background-size: 100%;
      height: 2.2rem;
      display: flex;
      padding: $big-space * 2;
    }
    .logo {
      width:0.9rem;
      height: 0.9rem;
      img {
        width: 100%;
      }
    }
    .name {
      color: #fff;
      text-align: left;
      margin-left: $big-space * 2;
      p:first-child {
        font-size: 0.36rem;
      }
      p:last-child {
        margin-top: $middle-space * 3;
      }
    }
    .tip {
      margin: $big-space * 2;
      text-align: left;
      h4 {
        font-weight: normal;
        color: $mainColor;
      }
    }
  }
</style>