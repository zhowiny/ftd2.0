<template>
  <div class='annal' :class='type'>
    <div class="shouyi">
      <p>待收金额</p>
      <h3>{{shouyi || 0}}</h3>
    </div>
    <ul v-show="data">
      <li v-for='i in data'>
        <router-link tag='div' :to="{ name: 'recordDetail', params: { id: JSON.stringify(i) }}">
          <p>{{new Date(i.add_time * 1000).toLocaleDateString().replace(/\//ig,'-')}}至{{new Date(i.deadline * 1000).toLocaleDateString().replace(/\//ig,'-')}}到期</p>
          <a>{{i.status == 1 ? '进行中': i.status == 0 ? '已完成' : '还款中'}}</a>
        </router-link>
        <div>
          <p><span>{{i.investor_capital}}</span><br>购买金额 (元)</p>
          <p><span>{{i.investor_interest}}</span><br>收益 (元)</p>
          <p><i>{{i.borrow_interest_rate}}</i><br>年化收益率</p>
        </div>
      </li>
    </ul>
    <div v-show="!data" class="empty">暂无记录</div>
    <router-link class='touzi' tag='a' to='/bits'>我要投资</router-link>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        type: '',
        shouyi: '',
        data: ''
      }
    },
    created () {
      this.type = this.$route.query.type
      this.$store.dispatch('setHeader', {show: true, fixed: false, background: 'transparent', color: '#fff', title: this.type})
      this.$store.dispatch('hideFooter')
      if (this.session('isLogin')) {
//         如果登录了,请求交易记录
        let uid = this.$store.state.userInfo.uid
        let pkey = this.$store.state.pkey
        // 用户uid,请求第几页数据pageNum(默认每一页10条数据)
        this.$POST('/ua/uby/' + this.$route.query.id + '.json', {uid: uid, pageNum: 1, pkey: pkey, md5str: this.md5(pkey + uid)}).then(res => {
          if (parseInt(res.code) === 200) {
            this.$nextTick(() => {
              this.shouyi = res.data.totalSum
              switch (~~this.$route.query.id) {
                case 1:
                  this.data = res.data.dingcuntong.length > 0 ? res.data.dingcuntong : ''
                  break
                case 11:
                  this.data = res.data.zhuandai.length > 0 ? res.data.zhuandai : ''
                  break
                case 12:
                  this.data = res.data.xinshou.length > 0 ? res.data.xinshou : ''
                  break
                default:
                  break
              }
            })
          } else {
            this.toast(res.msg)
          }
        }).catch(err => {
          this.toast(err.toString())
        })
      }
    },
    beforeRouteLeave (to, from, next) {
      if (!~to.path.indexOf('/assets')) {
        this.$store.dispatch('setHeader', {show: false, fixed: true, title: '富通贷', background: '#fff', color: ''})
        this.$store.dispatch('showFooter')
      } else {
        this.$store.dispatch('setHeader', {color: '', fixed: true})
      }
      next()
    }
  }
</script>
<style scoped lang='scss'>
  @import "./../../assets/css/common/config";

  .shouyi {
    width: 7.5rem;
    height: 3.15rem;
    padding-top: 1.3rem;
    color: #fff;
    background: linear-gradient(to bottom, #F37227, #EC5629);
    h3 {
      margin: 0.5rem 0;
      font-weight: normal;
      font-size: 0.4rem;
    }
  }

  .annal {
    margin-bottom: 1rem + $big-space;
    margin-top: -48px;
  }

  li {
    box-sizing: border-box;
    width: 7.5rem - $middle-space * 2;
    height: 2.44rem;
    margin: $big-space $middle-space;
    background: #fff;
    background: url("./../../assets/images/mine/xsb.png") no-repeat center;
    background-size: 100%;
    padding: $big-space * 2 $big-space * 3;
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;
    > div {
      flex: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:first-child {
        margin-bottom: $big-space;
      }
      &:last-child p {
        color: $lightColor;
      }
      a {
        display: inline-block;
        padding: $middle-space $big-space * 2;
        color: #fff;
        background: $mainColor;
        border-radius: 5px;
      }
      p span, p i {
        font-size: 0.36rem;
        color: $mainColor;
      }
      p i {
        font-style: normal;
        color: $deepColor;
        &:after {
          content: '%';
          font-size: 0.24rem;
        }
      }
    }
  }

  .新手标 li {
    background-image: url("./../../assets/images/mine/xsb.png");
  }

  .定存通 li {
    background-image: url("./../../assets/images/mine/dct.png");
  }

  .转贷项目 li {
    background-image: url("./../../assets/images/mine/zdxm.png");
  }

  .touzi {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 7.5rem;
    height: 1rem;
    background: $mainColor;
    color: #fff;
    font-size: 0.36rem;
    line-height: 1rem;
  }

  .empty {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 1.6rem;
    height: 2rem;
    margin: 1rem auto;
    background: url("./../../assets/images/mine/empty.png") no-repeat top center;
    background-size: 100%;
  }
</style>