<template>
  <div id="app">
    <ftd-header>
      <mt-button icon="back" @click='back' slot='left'></mt-button>
    </ftd-header>
    <transition-group tag='div' appear name='pageTransiton'>
      <router-view key='router-view'></router-view>
    </transition-group>
    <ftd-footer></ftd-footer>
  </div>
</template>

<script>
  import {Button} from 'mint-ui'
  import ftdFooter from './components/commons/footer.vue'
  import ftdHeader from './components/commons/header.vue'
  export default {
    data () {
      return {
      }
    },
    created () {
      this.initFontSize(document, window)
      this.$POST('/firstPage.json').then(res => {
        if (parseInt(res.code) === 200) {
          this.$store.dispatch('setFirstPageData', res)
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
    overflow: hidden;
  }
  @include MQ(pc) {
    #app {
      box-shadow: 1px -10px 10px $mainColor, -1px -10px 10px $mainColor;
    }
  }

  .pageTransiton-move {
    transition: all .8s;
  }

  .pageTransiton-enter-active, .pageTransiton-leave-active {
    transition: all .8s;
  }

  .pageTransiton-enter {
    opacity: 0;
    transform: translate(100%)scale(.5);
  }

  .pageTransiton-leave-active {
    transform: translate(-100%)scale(.5);
    opacity: 0;
  }
</style>
