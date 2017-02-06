<template>
  <transition name='slideIn'>
    <div class="slideIn set">
      <div class="container" :class='tag'>
        <div class="set">
          <p v-show="$route.params.type==1">交易密码不可与登录密码重复</p>
          <!--修改支付密码-->
          <div v-if='$route.params.type==1'>
            <div class="space"></div>
            <mt-cell title="旧 密 码" >
              <input type="password" v-model="data.oldPayPwd"  placeholder="请输入旧密码" />
            </mt-cell>
            <mt-cell title="新 密 码" >
              <input type="password" v-model="data.payPwd" placeholder="6-18位数字与字母组合密码" />
            </mt-cell>
            <button class="ftd-btn" @click="change(2)">完成</button>
          </div>
          <!--修改登录密码-->
          <div v-else="">
            <mt-cell title="当前密码" >
              <input type="password" v-model="data.upwd" placeholder="请输入旧密码" />
            </mt-cell>
            <mt-cell title="新密码" >
              <input type="password" v-model="data.unpwd" placeholder="6-18位字母与数字组合" />
            </mt-cell>
            <div class="space"></div>
            <mt-cell title="验证码" >
              <div class="cell">
                <input type="text" v-model="data.verifyCode" placeholder="请输入短信验证码"/>
                <a class="btn" @click="getVerifyCode">{{countText}}</a>
              </div>
            </mt-cell>
            <button class="ftd-btn" @click="change(0)">完成</button>
          </div>
        </div>
        <!--忘记支付/登录密码-->
        <div class="verify">
          <p>为了安全需要验证您的身份,如未认证可以不填</p>
          <div class="space"></div>
          <mt-cell title="手机号码" >
            <input type="text" v-model="data.uphone" placeholder="请输入您的手机号码" />
          </mt-cell>
          <mt-cell title="身份证号" >
            <input type="text" v-model="data.idCard" placeholder="请输入身份证后四位" />
          </mt-cell>
          <div class="space"></div>
          <!--新的交易密码-->
          <mt-cell title="新密码" v-if="$route.params.type == 1 && $route.params.tag == 1">
            <input type="password" v-model="data.payPwd" placeholder="请输入新密码" />
          </mt-cell>
          <!--新的登录密码-->
          <mt-cell title="新密码" v-if="$route.params.type == 0 && $route.params.tag == 1">
            <input type="password" v-model="data.unpwd" placeholder="请输入新密码" />
          </mt-cell>
          <mt-cell title="确认密码" >
            <input type="password" v-model="data.newpwd" placeholder="请确认新密码" />
          </mt-cell>
          <div class="space"></div>
          <mt-cell title="验证码" >
            <div class="cell">
              <input type="text" v-model="data.verifyCode" placeholder="请输入短信验证码"/>
              <a class="btn" @click="getVerifyCode">{{countText}}</a>
            </div>
          </mt-cell>
          <button class="ftd-btn" v-if="$route.params.type == 1 && $route.params.tag == 1" @click="change(1)">确定</button>
          <button class="ftd-btn" v-if="$route.params.type == 0 && $route.params.tag == 1" @click="findLoginPwd">确定</button>
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
        tag: '',
        title: '',
        countText: '获取',
        time: '',
        clickable: true,
        data: {
          oldPayPwd: '',
          payPwd: '',
          upwd: '',
          unpwd: '',
          verifyCode: '',
          uphone: '',
          idCard: '',
          newpwd: ''
        }
      }
    },
    computed: mapState(['isLogin', 'pkey', 'userInfo', 'account']),
    methods: {
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
      findLoginPwd () {
        if (!this.data.uphone) {
          this.toast('手机号不能为空!')
          return
        }
        if (!this.data.unpwd) {
          this.toast('新密码不能为空!')
          return
        }
        if (!!this.account.idcard && !this.data.idCard) {
          this.toast('您已实名认证!请填写您的身份证后4位!')
          return
        }
        if (this.data.unpwd !== this.data.newpwd) {
          this.toast('两次输入的密码不一致!!')
          return
        }
        if (!this.data.verifyCode) {
          this.toast('验证码不能为空!')
          return
        }
        this.$POST('/flpwd.json', {
          unpwd: this.data.unpwd || '',
          uphone: this.data.uphone,
          verifyCode: this.data.verifyCode || '0000',
          idCard: this.data.idCard || '',
          md5str: this.md5(this.pkey + this.data.uphone + (this.data.verifyCode || '0000'))
        }).then(res => {
          if (parseInt(res.code) === 200) {
            this.toast({message: res.msg, duration: 2000})
            setTimeout(() => {
              this.loginout({path: '/set/success', query: {tip: '重置密码成功!', link: '/login', btn: '重新登录'}})
            }, 2e3)
          } else {
            this.toast(res.msg)
          }
        }).catch(err => {
          this.toast(err.toString())
        })
      },
      change (syoriFlg) {
        if (!this.isLogin) return
        switch (syoriFlg) {
          case 0:
            if (!this.data.upwd) {
              this.toast('密码不能为空!')
              return
            }
            if (!this.data.unpwd) {
              this.toast('新密码不能为空!')
              return
            }
            if (!this.data.verifyCode) {
              this.toast('验证码不能为空!')
              return
            }
            break
          case 1:
            if (!this.data.uphone) {
              this.toast('手机号不能为空!')
              return
            }
            if (!this.data.payPwd) {
              this.toast('支付密码不能为空!')
              return
            }
            if (this.data.payPwd !== this.data.newpwd) {
              this.toast('两次输入的密码不一致!!')
              return
            }
            if (!!this.account.idcard && !this.data.idCard) {
              this.toast('您已实名认证!请填写您的身份证后4位!')
              return
            }
            if (!this.data.verifyCode) {
              this.toast('验证码不能为空!')
              return
            }
            break
          case 2:
            if (!this.data.oldPayPwd) {
              this.toast('旧的支付密码不能为空!')
              return
            }
            if (!this.data.payPwd) {
              this.toast('支付密码不能为空!')
              return
            }
            if (~~this.userInfo.payPwdStatus === 0) {
              this.toast('您还未设置交易密码!请先设置交易密码!')
              return
            }
            break
          default:
            return
        }
        // syoriFlg 0 修改登录密码, 1 忘记支付密码, 2 修改支付密码
        this.$POST('/ua/upwd.json', {
          upwd: this.data.upwd || '',
          unpwd: this.data.unpwd || '',
          uphone: this.data.uphone,
          verifyCode: this.data.verifyCode || '0000',
          syoriFlg: syoriFlg,
          oldPayPwd: this.data.oldPayPwd || '',
          payPwd: this.data.payPwd || '',
          idCard: this.data.idCard || '',
          md5str: this.md5(this.pkey + this.userInfo.phone + (this.data.verifyCode || '0000'))
        }).then(res => {
          if (parseInt(res.code) === 200) {
            this.toast(res.msg)
            this.$router.back()
          } else {
            this.toast(res.msg)
          }
        }).catch(err => {
          this.toast(err.toString())
        })
      },
      getVerifyCode () {
        if (!this.clickable) return
        this.clickable = false
        this.$POST('/sendmsg.json', {
          uid: this.userInfo.uid || '',
          uphone: this.data.uphone,
//          pkey: this.pkey,
          type: 0,
          md5str: this.md5(this.pkey + (this.userInfo.uid || '') + (this.userInfo.phone || this.data.uphone))
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
      this.title = ~~this.$route.params.type === 1 ? '支付密码' : '登录密码'
      this.tag = ~~this.$route.params.tag === 0 ? '修改' : '忘记'
      this.$store.dispatch('setHeader', {show: true, background: '#fff', title: this.tag + this.title})
      this.$store.dispatch('hideFooter')
      this.userInfo.phone && (this.data.uphone = this.userInfo.phone)
    },
    components: {
      [Cell.name]: Cell
    }
  }
</script>
<style lang='scss'scoped>
  @import "./../../assets/css/common/config";
  .container {
    width: 15rem;
    transition: transform .5s;
    @include clearfix()
  }
  .container.忘记 {
    transform: translate3d(-7.5rem,0,0);
  }
  .slideIn.set {
    width: 7.5rem;
    overflow-x: hidden;
  }
  .set,.verify {
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
  .cell {
    color: $deepColor;
    display: flex;
    width: 5rem;
    align-items: stretch;
    line-height: $titleHeight - 2px;
    justify-content: space-between;
    input {
      width: 3rem;
      border: none;
      outline: none;
      color: $mainColor;
      text-align: left;
      padding-right: $big-space;
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
</style>