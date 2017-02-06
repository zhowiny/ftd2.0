<template>
  <transition name='slideIn'>
    <div class="slideIn set">
      <p >请在绑定的邮箱中点击链接激活邮箱!</p>
      <div class="space"></div>
      <mt-cell title="邮箱地址" >
        <input type="text" v-model="email" :disabled='userInfo.emailStatus == 1' placeholder="请输入邮箱地址" />
      </mt-cell>
      <button @click='sendmail' class="ftd-btn">确定</button>
    </div>
  </transition>
</template>
<script>
  import {Cell} from 'mint-ui'
  export default {
    data () {
      return {
        email: ''
      }
    },
    computed: {
      userInfo () {
        return this.$store.state.userInfo
      },
      account () {
        return this.$store.state.account
      },
      pkey () {
        return this.$store.state.pkey
      }
    },
    methods: {
      sendmail () {
        if (~~this.userInfo.emailStatus === 1) {
          this.$router.back()
          return
        }
        if (!this.email) {
          this.toast('邮箱不能为空!!')
          return
        }
        if (!~this.email.indexOf('@')) {
          this.toast('邮箱格式不正确!')
          return
        }
        this.$POST('/verifyemail.json', {
          uid: this.userInfo.uid,
          uphone: this.userInfo.phone,
          uemail: this.email,
          pkey: this.pkey,
          md5str: this.md5(this.pkey + this.userInfo.uid + this.email)
        }).then(res => {
          if (parseInt(res.code) === 200) {
            this.toast('发送邮件成功!重新登录生效!')
            this.$router.replace({path: '/mine'})
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
      this.$store.dispatch('setHeader', {show: true, background: '#fff', title: '绑定邮箱'})
      this.$store.dispatch('hideFooter')
      !!this.account.email && (this.email = this.account.email)
    },
    components: {
      [Cell.name]: Cell
    }
  }
</script>
<style lang='scss'scoped>
  @import "./../../assets/css/common/config";
  .set input {
    width: 5rem;
    color: $mainColor;
    border: none;
    outline: none;
    &:disabled {
      background: transparent;
    }
  }
  .set>p {
    text-align: left;
    background: $mainColor;
    color: #fff;
    padding: $big-space * 2;
  }
</style>