<template>
  <transition name='slideIn'>
    <div class="view slideIn">
      <div class="tab active">
        <mt-tabbar v-model="type">
          <mt-tab-item id="红包">红包</mt-tab-item>
          <mt-tab-item id="代金券">代金券</mt-tab-item>
          <mt-tab-item id="加息券">加息券</mt-tab-item>
        </mt-tabbar>
      </div>
      <div class="bitList" :class='type' :style='{height: height+"px"}'>
        <div class="xsb">
          <div class="item" :class='{unavailable: i.isDisable!=0}' :data-id='i.id' v-for="i in hongbao">
            <div class="tag">{{i.money}}</div>
            <div class="discription">
              <p>{{i.activityName}}</p>
              <p>{{i.redRule}}</p>
              <p>{{i.borrowType}}</p>
              <p>有效时间{{i.startTime}}-{{i.endTime}}</p>
            </div>
          </div>
        </div>
        <div class="zdxm">
          <div class="item" :class='{unavailable: i.isDisable!=0}' :data-id='i.id' v-for="i in daijinquan">
            <div class="tag">{{i.money}}</div>
            <div class="discription">
              <p>{{i.activityName}}</p>
              <p>{{i.redRule}}</p>
              <p>{{i.borrowType}}</p>
              <p>有效时间{{i.startTime}}-{{i.endTime}}</p>
            </div>
          </div>
        </div>
        <div class="dct">
          <div class="item" :class='{unavailable: i.isDisable!=0}' :data-id='i.id' v-for="i in jiaxiquan">
            <div class="tag">{{i.money.slice(0,i.money.length-1)}}</div>
            <div class="discription">
              <p>{{i.activityName}}</p>
              <p>{{i.redRule}}</p>
              <p>{{i.borrowType}}</p>
              <p>有效时间{{i.startTime}}-{{i.endTime}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {Tabbar, TabItem} from 'mint-ui'
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        type: '红包',
        height: '',
        jiaxiquan: '',
        hongbao: '',
        daijinquan: ''
      }
    },
    computed: mapState(['pkey']),
    watch: {
      type (v) {
        this.height = v === '红包' ? document.querySelector('.xsb').clientHeight : v === '代金券' ? document.querySelector('.zdxm').clientHeight : document.querySelector('.dct').clientHeight
      },
      xsb (v) {
        setTimeout(() => {
          this.height = document.querySelector('.xsb').clientHeight
        }, 10)
      }
    },
    created () {
      this.$store.dispatch('setHeader', {show: true, fixed: true, background: '#fff', title: '我的福利', color: ''})
      this.$store.dispatch('hideFooter')
      if (this.session('isLogin')) {
        // 如果登录了,请求用户账户信息
        let user = this.session('userInfo')
        this.$POST('/ua/ured.json', {uid: user.uid, pkey: this.pkey, md5str: this.md5(this.pkey + user.uid)}).then(res => {
          if (parseInt(res.code) === 200) {
            this.$nextTick(() => {
              this.hongbao = res.redPackets
              this.daijinquan = res.vouchers
              this.jiaxiquan = res.rateCoupons
            })
          } else {
            this.toast(res.msg)
          }
        }).catch(err => {
          console.log(err.toString())
          this.toast('网络请求错误!请重试!')
        })
      }
    },
    beforeRouteLeave (to, from, next) {
      this.$store.dispatch('setHeader', {show: false, title: '富通贷', background: '#fff'})
      this.$store.dispatch('showFooter')
      next()
    },
    mounted () {
      if (this.xsb) {
        this.height = document.querySelector('.xsb').clientHeight
      }
    },
    components: {
      [Tabbar.name]: Tabbar,
      [TabItem.name]: TabItem
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "./../../assets/css/common/config";

  .view {
    width: 7.5rem;
    overflow-x: hidden;
    background: transparent;
  }
  .tab {
    height: 40px;
    position: relative;
    background: #fff;
    color: #ff4e00;
    margin-bottom: 10px;
  }

  .mint-tabbar {
    height: 96%;
    background: #fff;
    width: 90%;
    margin: 0 auto;
    border: 1px solid #ff4e00;
    border-radius: 30px;
    overflow: hidden;
    .mint-tab-item:nth-of-type(2) {
      border-left: 1px solid #ff4e00;
      border-right: 1px solid #ff4e00;
    }
    > .mint-tab-item.is-selected {
      background: #ff4e00;
      color: #fff;
    }
  }

  .bitList {
    width: 303%;
    transition: transform .8s;
    overflow: hidden;
    text-align: left;
    min-height: 10.5rem;
    .xsb, .dct, .zdxm {
      width: 7.5rem;
      display: inline-block;
      vertical-align: top;
      background: #fff;
      color:#fff;
      font-weight: lighter;
      .item {
        display: flex;
        margin: $big-space * 2;
        margin-top: 0;
        &:first-child {
          margin-top: $big-space * 2;
        }
        width: 6.9rem;
        height: 2.4rem;
        background: url("./../../assets/images/mine/background-hb.png")no-repeat center;
        background-size: 100%;
        .tag {
          flex: 1 1 30%;
          text-align: center;
          align-self: center;
          font-size: 0.8rem;
          &:after {
            content: '元';
            font-size: 0.28rem;
          }
        }
        .discription {
          flex: 1 1 70%;
          align-self: center;
          padding: 0 $big-space * 2;
          p {
            font-size: 0.24rem;
          }
          p:first-child {
            font-size: 0.32rem;
            margin-bottom: $big-space;
          }
        }
        &.unavailable {
          background-image: url("./../../assets/images/mine/background-sx.png");
          position: relative;
          &:after {
            content: '';
            display: block;
            position: absolute;
            width: 2rem;
            right: 0.5rem;
            align-self: center;
            height: 1.8rem;
            background: url("./../../assets/images/mine/icon-sx.png")no-repeat center;
            background-size: 100%;
          }
        }
      }
    }
    .zdxm .item {
      background-image: url("./../../assets/images/mine/background-djq.png");
    }
    .dct .item {
      background-image: url("./../../assets/images/mine/background-jxq.png");
      .tag:after {
        content: '%';
      }
    }
    &.代金券 {
      transform: translate3d(-33.33333%,0,0);
    }
    &.加息券 {
      transform: translate3d(-66.666667%,0,0);
    }
  }
</style>
