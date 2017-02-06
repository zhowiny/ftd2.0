<template>
  <div id="app" class='app'>
    <ftd-header>
      <mt-button :style='{color: header.color}' icon="back" @click='back' slot='left'></mt-button>
    </ftd-header>
    <!--<transition-group tag='div' appear name='pageTransiton' >-->
    <router-view></router-view>
    <!--</transition-group>-->
    <transition name='slideDown' apper>
      <ftd-footer v-show='showFooter'></ftd-footer>
    </transition>
  </div>
</template>

<script>
  import {Button} from 'mint-ui'
  import ftdFooter from './components/commons/footer.vue'
  import ftdHeader from './components/commons/header.vue'
  import {mapState} from 'vuex'
  import axios from 'axios'
  export default {
    data () {
      return {}
    },
    computed: {
      ...mapState(['pkey', 'showFooter', 'header'])
    },
    created () {
      document.querySelector('#loading') ? document.body.removeChild(document.querySelector('#loading')) : ''// 删除加载中...
      this.initFontSize(document, window) // 初始化字体大小
        // 如果已经登录了,获取用户,账户信息
      this.session('isLogin') && this.$store.dispatch('login')
      this.session('userInfo') && this.$store.dispatch('setUserInfo', this.session('userInfo'))
      this.session('account') && this.$store.dispatch('setAccount', this.session('account'))
      if (this.session('firstPageData') && this.session('bitLists') && this.session('picList')) {
        // 如果sessionStorage里面有数据则直接用,不发起新请求
        this.$store.dispatch('setFirstPageData', this.session('firstPageData'))
        this.$store.dispatch('setBitLists', this.session('bitLists'))
        this.$store.dispatch('setPicList', this.session('picList'))
        return
      }
      this.$POST('/firstPage.json').then(res => {
        if (parseInt(res.code) === 200) {
          this.$store.dispatch('setFirstPageData', res)
          this.session({firstPageData: this.$store.state.firstPageData})
        }
      }).then(() => {
        // 所有标
        let arr = []
        for (let i = 1; i <= 3; i++) {
          arr.push(this.$POST('/bits.json', {type: i, pageSize: 30, md5str: this.md5(this.pkey + i)}))
        }
        axios.all(arr).then(axios.spread((...args) => {
          for (let i = 1, l = args.length; i <= l; i++) {
            if (~~args[i - 1].code === 200) {
              this.$store.dispatch('setBitLists', {['type' + i]: args[i - 1].data.data})
            }
          }
          this.session({bitLists: this.$store.state.bitLists})
        }))
      }).catch(err => {
        this.toast(err.toString())
      })
      this.$POST('/firstlink.json', {type: 3}).then(res => {
        if (parseInt(res.code) === 200) {
          this.$store.dispatch('setPicList', res.data.slice(1))
          this.session({picList: this.$store.state.picList})
        }
      }).catch(err => {
        this.toast(err.toString())
      })
    },
    methods: {
      initFontSize (e, t) {
        var maxWidth = 960 // 超过这个宽度不再改变font-size
        var defaultWidth = 750 // 当宽度为750px时,1rem = 100px
        var defaultSize = 100
        var d = e.documentElement
        var resize = 'orientationchange' in window ? 'orientationchange' : 'resize'
        var computedFontSize = function () {
          var clientWidth = d.clientWidth
          clientWidth > maxWidth && (clientWidth = maxWidth)
          d.style.fontSize = defaultSize * (clientWidth / defaultWidth) + 'px'
        }
        computedFontSize()
        e.addEventListener && t.addEventListener(resize, computedFontSize, !1)
      },
      back () {
        this.$router.go(-1)
      }
    },
    components: {
      ftdFooter,
      ftdHeader,
      [Button.name]: Button
    }
  }
</script>

<style lang="scss">
  @import '../node_modules/mint-ui/lib/style.min.css';
  @import "assets/css/common/_common";
  @import 'assets/css/ftd-ui';

  body {
    background: $bodycolor;
  }

  .app {
    // #app style
    font-size: 0.28rem;
    max-width: 960px;
    min-width: 320px;
    min-height: 100%;
    margin: 0 auto;
    text-align: center;
    overflow: auto;
  }

  @include MQ(pc) {
    .app {
      box-shadow: 1px -10px 10px $mainColor, -1px -10px 10px $mainColor;
    }
  }

  .pageTransiton-enter-active, .pageTransiton-leave-active {
    transition: all .5s;
    position: absolute;
    top: 0;
    width: 100%;
  }

  .pageTransiton-enter, .pageTransiton-leave-active {
    opacity: 0;
  }

  .slideDown-enter-active, .slideDown-leave-active {
    transition: transform .5s;
  }

  .slideDown-enter, .slideDown-leave-active {
    transform: translateY(100%);
  }
</style>
