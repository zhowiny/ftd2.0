<template>
  <transition name='slideIn' tag='div'>
    <div class="slideIn feedback">
      <textarea placeholder="请写下您的宝贵意见和建议" v-model="message"></textarea>
      <input type="text" placeholder="请留下您的联系方式" v-model="contactInfo">
      <button @click="commit">提交</button>
    </div>
  </transition>
</template>
<script>
  export default {
    data () {
      return {
        message: '',
        contactInfo: ''
      }
    },
    computed: {
      pkey () {
        return this.$store.state.pkey
      }
    },
    methods: {
      commit () {
        if (this.session('isLogin')) {
//         如果登录了,请求实名认证接口
          if (!this.message || !this.contactInfo) {
            this.toast('建议和联系方式不能为空!')
            return
          }
          if (!/^1\d{10}$/.test(this.contactInfo)) {
            this.toast('手机号格式不正确!请重新输入!')
            return
          }
          this.$POST('/ua/feedback.json', {message: this.message, contactInfo: this.contactInfo, md5str: this.md5(this.pkey + this.contactInfo)}).then(res => {
            if (parseInt(res.code) === 200) {
              this.message = ''
              this.contactInfo = ''
              this.toast('反馈成功!谢谢您的建议!')
            } else {
              this.toast(res.msg)
            }
          }).catch(err => {
            console.log(err.toString())
            this.toast('网络请求异常!请重试!')
          })
        }
      }
    },
    created () {
      this.$store.dispatch('setHeader', {show: true, background: '#fff', title: '意见反馈'})
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
  .feedback {
    border-top: 1px solid $bodycolor;
    padding: $big-space * 2;
    textarea, input, button {
      width: 100%;
      border: 1px solid $bodycolor;
      padding: $middle-space $big-space;
      border-radius: 5px;
      font-size: 0.32rem;
      &:focus {
        outline: $mainColor auto 3px;
      }
    }
    textarea {
      min-height: 3rem;
      resize: none;
    }
    input {
      margin-top: $middle-space * 2;
      padding: $big-space;
    }
    button {
      border: none;
      margin-top: 1rem;
      color:#fff;
      font-size: 0.36rem;
      padding: $big-space 0;
      background: $mainColor;
      &:focus {
        outline: none;
      }
    }
  }
</style>