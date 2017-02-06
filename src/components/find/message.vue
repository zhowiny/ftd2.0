<template>
  <transition name='slideIn'>
    <div class="slideIn">
      <router-link v-for='data in lists' :to='{path: "/proclamation/detail", query:{title:data.title,cnt:data.content}}'>
        <mt-cell is-link ><span slot='title'>{{data.title}}</span></mt-cell>
      </router-link>
    </div>
  </transition>
</template>
<script>
  import {Cell} from 'mint-ui'
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        lists: ''
      }
    },
    computed: mapState(['pkey']),
    beforeRouteLeave (to, from, next) {
      if (!~to.path.indexOf('/proclamation')) {
        this.$store.dispatch('setHeader', {show: false, title: '富通贷', background: '#fff'})
        this.$store.dispatch('showFooter')
      }
      next()
    },
    created () {
      this.$store.dispatch('setHeader', {show: true, background: '#fff', title: '公告'})
      this.$store.dispatch('hideFooter')
//         请求站内信
      this.$POST('/board.json', {pkey: this.pkey, md5str: this.md5(this.pkey)}).then(res => {
        if (parseInt(res.code) === 200) {
          this.lists = res.data
        } else {
          this.toast(res.msg)
        }
      }).catch(err => {
        console.log(err.toString())
        this.toast('网络请求异常!请重试!')
      })
    },
    components: {
      [Cell.name]: Cell
    }
  }
</script>
<style scoped lang='scss'>
</style>