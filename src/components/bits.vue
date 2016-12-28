<template>
  <transition name='slideIn'>
    <div class="view slideIn">
      <div class="tab active">
        <mt-tabbar v-model="type">
          <mt-tab-item id="新手标">新手标</mt-tab-item>
          <mt-tab-item id="转贷项目">转贷项目</mt-tab-item>
          <mt-tab-item id="定存通">定存通</mt-tab-item>
        </mt-tabbar>
        <span :class='type'></span>
      </div>
      <div class="bitList" :class='type' :style='{height: height+"px"}'>
        <div class="xsb">
          <div class="allowBuy" v-for="b in xsb">
            <div class="rate">
              <h1>{{b.bRate}}%</h1>
              <p>预期年化收益</p>
            </div>
            <div class="bitName">
              <h2>{{b.bName}} 期</h2>
              <div>
                <span class="deadline"><span>投资期限 <b>{{b.bTerm}}</b> {{b.bTermType}}</span></span>
                <router-link :to="{ name: 'bitDetail', params: { bid: b.bId }}">
                  <a class="button" :data-id='b.bId'>立即购买</a>
                </router-link>
              </div>
            </div>
          </div>
          <div class="notAllow" :class='b.bStatus == "3" ? "type1":"type2"' v-for="b in xsb1">
            <h3>{{b.bName}} 期</h3>
            <div>
              <div class="rate">
                <h1>{{b.bRate}}%</h1>
                <p>预期年化收益</p>
              </div>
              <div class="deadline">
                <h2>{{b.bTerm}}</h2>
                <p>投资期限（{{b.bTermType}}）</p>
              </div>
              <div class="tag"></div>
            </div>
          </div>
        </div>
        <div class="zdxm">
          <div class="allowBuy" v-for="b in zdxm">
            <div class="rate">
              <h1>{{b.bRate}}%</h1>
              <p>预期年化收益</p>
            </div>
            <div class="bitName">
              <h2>{{b.bName}} 期</h2>
              <div>
                <span class="deadline"><span>投资期限 <b>{{b.bTerm}}</b> {{b.bTermType}}</span></span>
                <router-link :to="{ name: 'bitDetail', params: { bid: b.bId }}">
                  <a class="button" :data-id='b.bId'>立即购买</a>
                </router-link>
              </div>
            </div>
          </div>
          <div class="notAllow" :class='b.bStatus == "3" ? "type1":"type2"' v-for="b in zdxm1">
            <h3>{{b.bName}} 期</h3>
            <div>
              <div class="rate">
                <h1>{{b.bRate}}%</h1>
                <p>预期年化收益</p>
              </div>
              <div class="deadline">
                <h2>{{b.bTerm}}</h2>
                <p>投资期限（{{b.bTermType}}）</p>
              </div>
              <div class="tag"></div>
            </div>
          </div>
        </div>
        <div class="dct">
          <div class="allowBuy" v-for="b in dct">
            <div class="rate">
              <h1>{{b.bRate}}%</h1>
              <p>预期年化收益</p>
            </div>
            <div class="bitName">
              <h2>{{b.bName}} 期</h2>
              <div>
                <span class="deadline"><span>投资期限 <b>{{b.bTerm}}</b> {{b.bTermType}}</span></span>
                <router-link :to="{ name: 'bitDetail', params: { bid: b.bId }}">
                  <a class="button" :data-id='b.bId'>立即购买</a>
                </router-link>
              </div>
            </div>
          </div>
          <div class="notAllow type1" :class='b.bStatus == "3" ? "type1":"type2"' v-for="b in dct1">
            <h3>{{b.bName}} 期</h3>
            <div>
              <div class="rate">
                <h1>{{b.bRate}}%</h1>
                <p>预期年化收益</p>
              </div>
              <div class="deadline">
                <h2>{{b.bTerm}}</h2>
                <p>投资期限（{{b.bTermType}}）</p>
              </div>
              <div class="tag"></div>
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
        type: '新手标',
        height: ''
      }
    },
    watch: {
      type (v) {
        this.height = v === '新手标' ? document.querySelector('.xsb').clientHeight : v === '转贷项目' ? document.querySelector('.zdxm').clientHeight : document.querySelector('.dct').clientHeight
      },
      xsb (v) {
        setTimeout(() => {
          this.height = document.querySelector('.xsb').clientHeight
        }, 10)
      }
    },
    computed: {
      ...mapState(['bitLists']),
      zdxm () {
        if (!this.bitLists.type2) return ''
        return this.filter('type2')
      },
      zdxm1 () {
        if (!this.bitLists.type2) return ''
        return this.filter('type2', 1)
      },
      xsb () {
        if (!this.bitLists.type1) return ''
        return this.filter('type1')
      },
      xsb1 () {
        if (!this.bitLists.type1) return ''
        return this.filter('type1', 1)
      },
      dct () {
        if (!this.bitLists.type3) return ''
        return this.filter('type3')
      },
      dct1 () {
        if (!this.bitLists.type3) return ''
        return this.filter('type3', 1)
      }
    },
    methods: {
      filter (type, status) {
        return this.bitLists[type].filter(v => {
          if (status) return parseInt(v.bStatus) !== 1
          return parseInt(v.bStatus) === 1
        })
      }
    },
    created () {
      this.$store.dispatch('setHeader', {show: true, fixed: true, background: '#fff', title: '理财产品', color: ''})
      this.$store.dispatch('showFooter')
    },
    beforeRouteLeave (to, from, next) {
      if (to.path.indexOf('/bit') < 0) {
        this.$store.dispatch('setHeader', {show: false, title: '富通贷', background: '#fff'})
        this.$store.dispatch('showFooter')
      }
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
  @import "./../assets/css/common/config";

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
    > span {
      display: block;
      position: absolute;
      top: 42px;
      left: 1.25rem;
      width: 0;
      border: $middle-space * 2 solid transparent;
      border-bottom-color: #fff;
      transition: left .8s;
    }
    span.转贷项目 {
      left: 3.5rem;
    }
    span.定存通 {
      left: 5.75rem;
    }
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

  .bitList.转贷项目 {
    transform: translateX(-33.33333%);
  }

  .bitList.定存通 {
    transform: translateX(-66.666667%);
  }

  .bitList {
    width: 303%;
    transition: transform .8s;
    overflow: hidden;
    text-align: left;
    margin-bottom: calc(55px + 0.5rem);
    .xsb, .dct, .zdxm {
      width: 7.5rem;
      display: inline-block;
      vertical-align: top;
    }
    .allowBuy, .notAllow {
      margin: $middle-space * 2 $big-space 0 $big-space;
      padding: $big-space * 3 0;
    }
    .rate {
      color: $mainColor;
      text-align: center;
      h1 {
        font-size: 0.6rem;
        font-weight: normal;
        margin-bottom: $big-space;
      }
      p {
        font-size: 0.28rem;
      }
    }
    .allowBuy {
      background: #fff;
      > div {
        display: inline-block;
        width: 33%;
      }

      .bitName {
        width: 60%;
        text-align: left;
        h2 {
          margin-bottom: $big-space * 2;
          font-size: 0.32rem;
          font-weight: normal;
          span {
            color: $lightColor
          }
        }
        .deadline {
          background: #EBEFF3;
          color: #5B75A5;
          display: inline-block;
          padding: $middle-space 0.25rem;
          transform: skew(-15deg);
          width: 50%;
          span {
            display: inline-block;
            transform: skew(15deg);
          }
        }
        .button {
          margin-left: $middle-space;
          padding: $middle-space 0.25rem;
          border-radius: $middle-space;
          font-size: 0.28rem;
        }
      }
    }
    .notAllow {
      background: url("./../assets/images/bits/notAllow.png");
      background-size: 100% 100%;
      text-align: left;
      padding-left: 0.5rem;
      color: $lightColor;
      h3 {
        margin-top: -0.25rem;
        margin-bottom: 0.25rem;
        font-weight: normal;
        font-size: 0.32rem;
      }
      > div > div {
        display: inline-block;
        text-align: center;
        width: 30%;
      }
      .rate {
        text-align: left;
        color: $lightColor;
        h1 {
          margin-bottom: 0;
        }
      }
      .tag {
        height: 1.1rem;
        width: 1.1rem;
        margin-left: $big-space;
        background-image: url("./../assets/images/bits/unfinished.png");
        background-size: 100% 100%;
        transform: translateY($big-space);
      }
      .deadline {
        width: 40%;;
        h2 {
          font-weight: normal
        }
      }
    }
    .notAllow.type2 .tag {
      background-image: url("./../assets/images/bits/completed.png");
    }
  }
</style>
