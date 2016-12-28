<template>
  <div id="app">
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
  export default {
    data () {
      return {
      }
    },
    computed: {
      ...mapState(['pkey', 'showFooter', 'header'])
    },
    created () {
      this.initFontSize(document, window)
      this.$POST('/firstPage.json').then(res => {
        if (parseInt(res.code) === 200) {
          this.$store.dispatch('setFirstPageData', res)
        }
      }).then(() => {
        // 新手标
        for (let i = 1; i <= 3; i++) {
          this.$POST('/bits.json', {
            type: i,
            pageSize: 30,
            md5str: this.md5(this.pkey + i)
          }).then(res => {
            if (parseInt(res.code) === 200) {
              this.$store.dispatch('setBitLists', {['type' + i]: res.data.data})
            }
          })
        }
      }).catch(err => {
        console.log(err)
      })
      this.$POST('/firstlink.json', {type: 4}).then(res => {
        if (parseInt(res.code) === 200) {
          this.$store.dispatch('setPicList', res.data)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    methods: {
      initFontSize (e, t) {
        var maxWidth = 960 // 超过这个宽度不再改变font-size
        var defaultWidth = 750 // 当宽度为450px时,字体大小为10px
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

  #app {
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
    #app {
      box-shadow: 1px -10px 10px $mainColor, -1px -10px 10px $mainColor;
    }
  }

  .pageTransiton-enter-active, .pageTransiton-leave-active {
    transition: all .5s;
    position: absolute;
    top:0;
    width: 100%;
  }

  .pageTransiton-enter,.pageTransiton-leave-active  {
    opacity: 0;
  }
  .slideDown-enter-active, .slideDown-leave-active {
    transition: transform .5s;
  }
  .slideDown-enter, .slideDown-leave-active {
    transform: translateY(100%);
  }
</style>
