<template>
  <keep-alive>
    <mt-tabbar v-model="selectPath" fixed>
      <mt-tab-item id="index">
        <img slot="icon" :src="menu.index.src">
        首页
      </mt-tab-item>
      <mt-tab-item id="licai">
        <img slot="icon" :src="menu.licai.src">
        理财
      </mt-tab-item>
      <mt-tab-item id="find">
        <img slot="icon" :src="menu.find.src">
        发现
      </mt-tab-item>
      <mt-tab-item id="mine">
        <img slot="icon" :src='menu.mine.src'>
        我的
      </mt-tab-item>
    </mt-tabbar>
  </keep-alive>
</template>
<style>
</style>
<script>
  import {Tabbar, TabItem} from 'mint-ui'
  export default {
    data () {
      return {
        selectPath: 'index',
        menu: {
          index: {
            path: '/',
            src: require('./../../assets/images/tabbar/index-active.png')
          },
          licai: {
            path: '/bits',
            src: require('./../../assets/images/tabbar/licai.png')
          },
          find: {
            path: '/find',
            src: require('./../../assets/images/tabbar/find.png')
          },
          mine: {
            path: '/mine',
            src: require('./../../assets/images/tabbar/mine.png')
          }
        }
      }
    },
    watch: {
      'selectPath' (val) {
        this.$router.push(this.menu[val].path)
        for (let k in this.menu) {
          this.menu[k].src = require('./../../assets/images/tabbar/' + k + '.png')
        }
        this.menu[val].src = require('./../../assets/images/tabbar/' + val + '-active.png')
        this.checkRoute(this.$route.path)
      },
      '$route' (to, from) {
        this.checkRoute(to.path)
      }
    },
    created () {
      this.checkRoute(this.$route.path)
    },
    methods: {
      checkRoute (path) {
        for (let k in this.menu) {
          if (path === this.menu[k].path) {
            this.selectPath = k
          }
        }
      }
    },
    components: {
      [Tabbar.name]: Tabbar,
      [TabItem.name]: TabItem
    }
  }
</script>