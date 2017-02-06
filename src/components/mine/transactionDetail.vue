<template>
  <transition name='slideIn'>
    <div class="slideIn">
      <ul>
        <li>
          <p>交易记录/时间</p>
          <span>金额(元)</span>
          <p>可用余额</p>
        </li>
        <li v-for="data in detail">
          <p><b>{{data.type}}</b><br><i>{{data.date}}</i></p>
          <!--正数plus 负数minus-->
          <span :class='~~data.affect >= 0 ? "plus" : "minus"'>{{data.affect}}</span>
          <p>{{data.money}}</p>
        </li>
      </ul>
    </div>
  </transition>
</template>
<script>
  export default {
    data () {
      return {
        detail: ''
      }
    },
    beforeRouteLeave (to, from, next) {
      if (!~to.path.indexOf('/assets')) {
        this.$store.dispatch('setHeader', {show: false, title: '富通贷', background: '#fff'})
        this.$store.dispatch('showFooter')
      }
      next()
    },
    created () {
      this.$store.dispatch('setHeader', {show: true, background: '#fff', title: '交易记录'})
      this.$store.dispatch('hideFooter')
      if (this.session('isLogin')) {
//         如果登录了,请求交易记录
        let uid = this.$store.state.userInfo.uid
        let pkey = this.$store.state.pkey
         // 用户uid,请求第几页数据pageNum(默认每一页10条数据)
        this.$POST('/ua/ubits.json', {uid: uid, pageNum: 1, md5str: this.md5(pkey + uid)}).then(res => {
          if (parseInt(res.code) === 200) {
            this.$nextTick(() => {
              this.detail = res.data.data
            })
          } else {
            this.toast(res.msg)
          }
        }).catch(err => {
          this.toast(err.toString())
        })
      }
    }
  }
</script>
<style scoped lang='scss'>
  @import "./../../assets/css/common/config";
  ul {
    border-top: 1px solid $bodycolor - #111;
    li {
      display: flex;
      height: 1rem;
      padding-left: $big-space * 2;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid $bodycolor;
      p {
        width: 25%;
        &:first-child {
          width: 33%;
          display: flex;
          flex-wrap: wrap;
        }
        b {
          font-weight: normal;
        }
        i {
          font-style: normal;
          font-size: 0.24rem;
        }
      }
      span.plus {
        color: $mainColor;
      }
      span.minus {
        color: #1F3F70;
      }
    }
  }
</style>