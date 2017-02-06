<template>
  <transition name='slideIn'>
    <div class="slideIn set">
      <mt-cell title="真实姓名" >
        <input type="text" placeholder="请输入您的真是姓名" v-model="realName" :disabled='!!account.realName' />
      </mt-cell>
      <div class="space"></div>
      <mt-cell title="身份证号" >
        <input type="text" placeholder="请输入您的身份证号码" v-model="idcard" :disabled='!!account.uidcard'/>
      </mt-cell>
        <button  v-if='!account.uidcard' class="ftd-btn" @click="approve">确定</button>
    </div>
  </transition>
</template>
<script>
  import {Cell} from 'mint-ui'
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        realName: '',
        idcard: ''
      }
    },
    computed: mapState(['userInfo', 'account', 'pkey', 'isLogin']),
    beforeRouteLeave (to, from, next) {
      if (!~to.path.indexOf('/set')) {
        this.$store.dispatch('setHeader', {show: false, title: '富通贷', background: '#fff'})
        this.$store.dispatch('showFooter')
      }
      next()
    },
    methods: {
      approve () {
        if (!this.isLogin) return
//         如果登录了,请求实名认证接口
        this.$POST('/ua/ureal.json', {
          uid: this.userInfo.uid,
          ureal: this.realName,
          uidcard: this.idcard,
          md5str: this.md5(this.pkey + this.userInfo.uid + this.idcard)
        }).then(res => {
          if (parseInt(res.code) === 200) {
            this.toast('实名认证成功!')
            this.$router.replace({path: '/mine'})
          } else {
            this.toast(res.msg)
          }
        }).catch(err => {
          this.toast(err.toString())
        })
      }
    },
    created () {
      this.$store.dispatch('setHeader', {show: true, background: '#fff', title: '实名认证'})
      this.$store.dispatch('hideFooter')
      !!this.account.realName && (this.realName = this.account.realName)
      !!this.account.uidcard && (this.idcard = this.account.uidcard)
    },
    components: {
      [Cell.name]: Cell
    }
  }
</script>
<style lang='scss'scoped>
  @import "./../../assets/css/common/config";
  .set input {
    width: 4.5rem;
    color: $mainColor;
    border: none;
    outline: none;
    &:disabled {
      background: transparent;
    }
  }
</style>