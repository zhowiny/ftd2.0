<template>
  <div>
    <div class="tab active" >
      <mt-tabbar v-model="type">
        <mt-tab-item id="新手标">新手标</mt-tab-item>
        <mt-tab-item id="转贷项目">转贷项目</mt-tab-item>
        <mt-tab-item id="定存通">定存通</mt-tab-item>
      </mt-tabbar>
    </div>
    <div class="bitList"></div>
  </div>
</template>

<script>
  import {Tabbar, TabItem} from 'mint-ui'
  export default {
    data () {
      return {
        type: '新手标'
      }
    },
    created () {
      this.$store.dispatch('setHeader', {show: true, background: '#fff'})
    },
    destroyed () {
      this.$store.dispatch('setHeader', {show: false})
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

  .tab{
    height: 40px;
    position: relative;
    background: #fff;
    color: #ff4e00;
  }
  .tab.active {
    margin-top: 48px;
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
      border-left:1px solid #ff4e00;
      border-right:1px solid #ff4e00;
    }
    > .mint-tab-item.is-selected {
      background: #ff4e00;
      color: #fff;
    }
  }
</style>
