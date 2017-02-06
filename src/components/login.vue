<template>
  <div class="box">
    <header class="mint-header is-fixed" style='background:transparent;color:#fff;'>
      <div class="mint-header-button is-left">
        <mt-button icon="back" @click='toPage(-1)' style='color:#fff;'></mt-button>
      </div>
      <h1 class="mint-header-title">{{tag == 0 ? '登录' : '注册'}}</h1>
      <div class="mint-header-button is-right">
        <mt-button icon="back" style='color:transparent;'></mt-button>
      </div>
    </header>
    <div class="login">
      <div class="line">
        <span>手机号码</span>
        <input type="text" v-model="phone" />
      </div>
      <div class="line">
        <span>登录密码</span>
        <input type="password" v-model="pwd" @keydown.enter="login(tag)"/>
      </div>
      <transition-group name='scale' tag='div'>
        <div class="verify" v-show="tag == 1" key='0'>
          <div class="line">
            <span>验证码</span>
            <input type="text" v-model="verify"/>
          </div>
          <button class="btn" @click="getVerifyCode">{{countText}}</button>
        </div>
        <button class="btn" key='1' @click="login(tag)">下一步</button>

        <router-link :to="{ name: 'password', params: { type: 0, tag:1 }}" tag='span' v-show="tag == 0" key='2'>忘记登录密码?</router-link>
        <p v-show="tag == 1" @click="toggleTag(0)" key='3'>已有账户　<span>登录</span></p>
        <p v-show="tag == 0" @click="toggleTag(1)" key='4'>新用户?　<span>立即注册</span></p>
      </transition-group>
    </div>
  </div>
</template>
<script>
  import {Button} from 'mint-ui'
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        tag: 0, // 0登录 1注册
        phone: '',
        pwd: '',
        verify: '',
        inviter: '', // 邀请人
        countText: '获取',
        time: '',
        clickable: true
      }
    },
    computed: {
      ...mapState(['pkey', 'isLogin', 'userInfo'])
    },
    methods: {
      toggleTag (tag) {
        this.tag = tag
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
        if (!this.phone) {
          this.toast('手机号不能为空!')
          this.clickable = true
          return
        }
        this.$POST('/sendmsg.json', {
          uid: this.userInfo.uid || '',
          uphone: this.phone,
          type: 0,
          pkey: this.pkey,
          md5str: this.md5(this.pkey + (this.userInfo.uid || '') + this.phone)
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
      },
      login (type) {
        if (!this.phone || !this.pwd) {
          this.toast('账号和密码不能为空!')
          return
        }
        if (!/^1\d{10}$/.test(this.phone)) {
          this.toast('手机号格式不正确!请重新输入!')
          return
        }
        if (~~type === 0) {
          this.$POST('/ulog.json', {uphone: this.phone, upwd: this.pwd, md5str: this.md5(this.pkey + this.phone)}).then(res => {
            if (~~res.code === 200) {
              this.$store.dispatch('login')
              this.session({isLogin: true})
              this.session({userInfo: res.data})
              this.$store.dispatch('setUserInfo', res.data)
              this.$router.replace({path: '/'})
            } else {
              this.toast(res.msg)
            }
          }).catch(err => {
            this.toast(err.toString())
          })
        } else if (~~type === 1) {
          if (!this.verify) {
            this.toast('验证码不能为空!')
            return
          }
          this.$POST('/reg.json', {
            uphone: this.phone,
            upwd: this.pwd,
            verifyCode: this.verify,
            inviterPhone: this.inviter || '',
            md5str: this.md5(this.pkey + this.phone + this.pwd)
          }).then(res => {
            if (~~res.code === 200) {
              this.toast('注册成功!请重新登录!')
              this.tag = 0
            } else {
              this.toast(res.msg)
            }
          }).catch(err => {
            this.toast(err.toString())
          })
        }
      }
    },
    created () {
      if (this.isLogin) {
        // 如果已经登录,则访问此页面时跳转到首页
        this.$router.replace({path: '/'})
        return
      }
      if (this.$route.query.tag) {
        this.tag = this.$route.query.tag
      }
      if (this.$route.query.inviter) {
        this.inviter = this.$route.query.inviter
      }
      this.$store.dispatch('hideFooter')
    },
    beforeDestroy () {
      if (!~this.$route.path.indexOf('/password/change')) {
        this.$store && this.$store.dispatch('showFooter')
      }
    },
    components: {
      [Button.name]: Button
    }
  }
</script>
<style scoped lang='scss'>
  @import "./../assets/css/common/config";
  .box {
    width: 7.5rem;
    height: 13.34rem;
    background: url("./../assets/images/login.png")no-repeat top center;
    background-size: 100% auto;
    padding-top: 3.5rem;
    display: flex;
    justify-content: center;
  }
  .line, .verify {
    width: 6.4rem;
    margin: $big-space * 4 auto;
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid #fff;
    padding: $big-space 0;
    span {
      display: block;
      width: 1.4rem;
      text-align: left;
      color: #fff;
      align-self: center;
    }
    input {
      background: transparent;
      outline: none;
      border: none;
      color: #fff;
    }
  }
  .login {
    p {
      color:#fff;
      padding-top: .5rem;
      margin-top: 1rem;
    }
     span {
      color:#fff;
      margin-top: $big-space;
      display: inline-block;
    }
    .btn {
      margin-top: 1rem;
    }
  }
  .verify  {
    border-bottom: none;
    margin-top: - $middle-space * 2;
    .line {
      margin: 0;
      padding: 0;
      width: 4.5rem;
    }
    .btn {
      width: 1.5rem;
      margin-left: 0.4rem;
      margin-top: 0;
    }
  }
  .btn {
    background: transparent;
    border: 1px solid #fff;
    color: #fff;
    outline: none;
    display: block;
    margin: 0 auto;
    padding: $middle-space * 2 0;
    width: 6.4rem;
    border-radius: 8px;
  }
  .mint-header-button {
    flex: 0;
  }
  .scale-move {
    transition: all 1s;
  }
  .scale-enter-active,.scale-leave-active {
    position: absolute;
    opacity: 1;
  }
  .scale-enter,.scale-leave-active {
    opacity: 0;
  }
</style>