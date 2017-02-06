<template>
  <div>
    <header class="mint-header is-fixed" style='background:#fff;'>
      <div class="mint-header-button is-left">
        <mt-button icon="back" @click.native='toPage(-1)'></mt-button>
      </div>
      <h1 class="mint-header-title" >下期回款</h1>
      <div class="mint-header-button is-right">
        <mt-button icon="more" @click='toggleCondition'></mt-button>
      </div>
    </header>
    <div class="container" v-show="data">
      <p><span>{{money}}</span><span>合计金额(元)</span></p>
      <ul>
        <li>
          <div>购买项目</div>
          <div>回款日期</div>
          <div>金额(元)</div>
        </li>
        <li v-for="i in data">
          <div>{{i.borrowName}}</div>
          <div>{{i.repaymentTime}}</div>
          <div>{{i.interest}}</div>
        </li>
      </ul>
    </div>
    <div v-show="!data" class="empty">暂无记录</div>
    <div class="condition" v-show="condition" @click.self='toggleCondition'>
      <ul>
        <li @click="detail(1)">未来全部回款</li>
        <li @click="detail(2)">未来15日回款</li>
        <li @click="detail(3)">未来1个月回款</li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {Button} from 'mint-ui'
  export default {
    data () {
      return {
        data: '',
        condition: false,
        money: '0.00'
      }
    },
    methods: {
      toggleCondition () {
        this.condition = !this.condition
      },
      detail (type) {
        if (this.session('isLogin')) {
//         如果登录了,请求下期回款
          let uid = this.$store.state.userInfo.uid
          let pkey = this.$store.state.pkey
          // 用户uid,请求第几页数据pageNum(默认每一页10条数据) type 筛选 1全部, 2半个月, 3一个月
          this.$POST('/ua/uprebits.json', {uid: uid, pageNum: 1, type: type, pkey: pkey, md5str: this.md5(pkey + uid)}).then(res => {
            if (parseInt(res.code) === 200) {
              this.data = res.data.data.length > 0 ? res.data.data : ''
              this.money = res.totalSum
            } else {
              this.toast(res.msg)
            }
            this.condition = false
          }).catch(err => {
            this.toast(err.toString())
          })
        }
      }
    },
    created () {
      this.$store.dispatch('setHeader', {show: false, title: '富通贷', background: '#fff'})
      this.$store.dispatch('hideFooter')
      this.detail(1)
    },
    components: {
      [Button.name]: Button
    }
  }
</script>
<style scoped lang='scss'>
  @import "./../../assets/css/common/config";
  .guide {
    border: 1px solid #fff;
    height: 24px;
    padding: 0 5px;
    font-size: 0.24rem;
  }
  .container {
    margin-top: $titleHeight;
    >p {
      height: 2.8rem;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      background: linear-gradient(to bottom, #F26B27, #EC5829);
      span {
        flex: 0 0 100%;
        color: #fff;
        &:first-child {
          margin-top: 0.8rem;
          margin-bottom: -0.8rem;
          font-size: 0.52rem;
        }
      }
    }
    ul {
      margin-top: $middle-space;
      background: #fff;
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 $big-space * 2;
        height: 1rem;
        border-bottom: 1px solid $bodycolor;
        font-size: 0.24rem;
        div {
          &:first-child {
            flex: 0 0 31%;
            text-align: left;
          }
          &:nth-of-type(2) {
            flex-grow: 2;
          }
          &:last-child {
            width: 20%;
          }
        }
        &:first-child div:first-child {
          text-indent: 1.5em;
        }
      }
    }
  }
  .condition {
    background: rgba(0,0,0,.5);
    position: fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
    z-index: 1;
    ul {
      position: absolute;
      right: $middle-space;
      top: $titleHeight + 10px;
      background: #fff;
      border-radius: 5px;
      width: 2.4rem;
      &:before {
        content: '';
        display: block;
        position: absolute;
        top: -0.4rem;
        right: $big-space;
        width: 0;
        height: 0;
        border: 10px solid transparent;
        border-bottom-color: #fff;
      }
      li {
        padding: $big-space 0;
        border-bottom: 1px solid $bodycolor;
        &:last-child {
          border: none;
        }
      }
    }
  }
  .empty {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 1.6rem;
    height: 2rem;
    margin: 3rem auto;
    background: url("./../../assets/images/mine/empty.png")no-repeat top center;
    background-size: 100%;
  }
</style>