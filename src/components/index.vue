<template>
  <div>
    <div class="swiper-container" v-show="picList.length>0">
      <mt-swipe>
        <mt-swipe-item v-for='s in picList'>
          <img :src="s.picurl" @click='toUrl(s.jumpurl)'>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <router-link tag='div' to='/proclamation' class="announcement">
      <i></i>
      <p :class="{'current': scroll}" v-text="firstPageData.bordMessages[currentNews]"></p>
      <span></span>
      <p :class="{'next': scroll}" v-text="firstPageData.bordMessages[currentNews]"></p>
    </router-link>
    <div class="bit" :class="'type'+(index+1)" v-for="(bit, index) in firstPageData.borrows">
      <h2>{{bit.name}} <span><i></i>{{bit.des}}</span></h2>
      <div class="cnt">
        <p>·{{bit.describe}}</p>
        <p>·投资期限:　<span>{{bit.term}}</span></p>
        <div>
          <span>{{bit.rate}}</span>
          <br>
          <i>预期年化收益</i>
        </div>
      </div>
      <div class="btn" @click='toPage({path:"bits"})'>
        <mt-button size="large" type='primary' plain>购买</mt-button>
      </div>
    </div>
    <div class="data">
      <div class="line"></div>
      <p>截止目前，富通贷累计投资金额（元）</p>
      <h1>{{firstPageData.zongzichan}}</h1>
      <p>为投资人创造收益<span>{{firstPageData.zongshouyi}}</span>亿元</p>
      <ul>
        <li><i></i>收益可观</li>
        <li><i></i>安全稳健</li>
        <li><i></i>灵活便捷</li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {Swipe, SwipeItem, Button} from 'mint-ui'
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        scroll: false,
        currentNews: 0
      }
    },
    computed: mapState(['firstPageData', 'picList', 'pkey', 'userInfo']),
    methods: {
      toUrl (url) {
        window.location.href = url + (this.userInfo ? '?uid=' + this.userInfo.uid : '')
      },
      getParams () {
        let params = window.location.search.slice(1)
        let obj = {}
        params.split('&').map((param) => {
          obj[param.split('=')[0]] = param.split('=')[1]
        })
        return obj
      }
    },
    created () {
      if (this.getParams().inviter) {
        window.location.href = window.location.origin + window.location.pathname + '#/login?tag=1&inviter=' + this.getParams().inviter
      }
      setInterval(() => {
        this.scroll = !this.scroll
        this.currentNews++
        if (this.currentNews >= this.firstPageData.bordMessages.length) {
          this.currentNews = 0
        }
      }, 2000)
    },
    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [Button.name]: Button
    }
  }
</script>
<style lang="scss" scoped>
  @import "../assets/css/common/config";

  .announcement {
    color: $lightColor;
    background: $bgcolors;
    margin: $middle-space * 2 $big-space 0 $big-space;
    height: 0.6rem;
    overflow: hidden;
    @include clearfix;
    i, span {
      display: inline-block;
      width: 0.4rem;
      height: 0.4rem;
      margin-top: 0.1rem;
      background-image: url("./../assets/images/index/horn.png");
      background-size: 100% 100%;
      float: left;
    }
    span {
      background-image: url("./../assets/images/index/rightArrow.png");
    }
    p {
      float: left;
      text-align: left;
      font-size: 0.32rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 0.6rem;
      width: 6.7rem - $big-space *2;
      padding: 0 0.05rem;
      transition: all .5s;
    }
    .current {
      transform: translate(-0.4rem, 100%);
    }
    .next {
      transform: translate(0.4rem, -100%);
    }
  }

  .bit {
    margin: $middle-space * 2 $big-space 0 $big-space;
    background-image: url("./../assets/images/index/bit1.png");
    background-size: 100% 100%;
    padding: $big-space * 2;
    text-align: left;
    h2 {
      font-size: 0.36rem;
      font-weight: normal;
      span {
        display: inline-block;
        width: 100px;
        height: 24px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        font-size: 12px;
        background-image: url("./../assets/images/index/bg2.png");
        background-size: 100% 100%;
        vertical-align: middle;
      }
    }
    .cnt {
      position: relative;
      margin: 0.3rem 0;
      color: $lightColor;
      p {
        font-size: 0.24rem;
      }
      div {
        position: absolute;
        right: 0;
        top: -0.4rem;
        text-align: right;
        i {
          font-style: normal;
          font-size: 0.24rem;
        }
        span {
          font-size: 0.5rem;
          font-weight: bold;
          padding-right: 0.2rem;
          &:after {
            content: '%';
            position: absolute;
            right: 0;
            font-size: 0.4rem;
            top: 0.15rem;
            text-shadow: 0 0 5px #fff;
          }
        }
      }
      span {
        color: $mainColor;
      }
    }
  }

  .bit.type1 {
    h2 {
      span {
        text-indent: 10px;
      }
    }
  }

  .bit.type2 {
    background-image: url("./../assets/images/index/bit2.png");
    h2 span {
      background-image: url("./../assets/images/index/bg1.png");
    }
  }

  .bit.type3 {
    background-image: url("./../assets/images/index/bit3.png");
    h2 span {
      background-image: url("./../assets/images/index/bg1.png");
    }
  }

  .data {
    color: $lightColor;
    margin: 0.5rem auto calc(55px + 0.5rem) auto;
    width: 90%;
    > div {
      width: 100%;
      height: 1px;
      background: $lightColor;
      position: relative;
      top: 0.2rem;
    }
    p {
      font-size: 0.28rem;
      background: $bodycolor;
      padding: 0 5px;
      position: relative;
      z-index: 1;
      width: 80%;
      margin: 0 auto;
      span {
        color: $mainColor;
      }
    }
    h1 {
      font-size: 0.8rem;
    }
    ul {
      margin-top: $big-space * 3;
      font-size: 0;
      li {
        display: inline-block;
        width: 32.6%;
        text-align: left;
        font-size: 0.24rem;
        i {
          display: inline-block;
          width: 0.5rem;
          height: 0.5rem;
          vertical-align: middle;
          background-image: url("./../assets/images/index/income.png");
          background-size: 100% 100%;
        }
        &:nth-of-type(2) {
          text-align: center;
          i {
            background-image: url("./../assets/images/index/safe.png");
          }
        }
        &:nth-of-type(3) {
          text-align: right;
          i {
            background-image: url("./../assets/images/index/convenient.png");
          }
        }
      }
    }
  }

  .swiper-container {
    width: 7.5rem;
    height: 3.328125rem;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .btn {
    width: 50%;
    margin: 0 auto;
    button {
      height: 0.55rem;
      line-height: 0.45rem;
      font-size: 0.22rem;
      border-radius: 0.1rem;
    }
  }

  .mint-swipe, .mint-swipe-items-wrap {
    overflow: visible;
    width: 7.5rem;
    height: 3.328125rem;
  }
</style>
