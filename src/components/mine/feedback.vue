<template>
  <transition name='slideIn' tag='div'>
    <div class="slideIn feedback">
      <textarea placeholder="请写下您的宝贵意见和建议"></textarea>
      <input type="text" placeholder="请留下您的联系方式">
      <button>提交</button>
    </div>
  </transition>
</template>
<script>
  export default {
    data () {
      return {
        auth: 'zhowiny'
      }
    },
    created () {
      this.$store.dispatch('setHeader', {show: true, background: '#fff', title: '意见反馈'})
      this.$store.dispatch('hideFooter')
    },
    destroyed () {
      this.$store.dispatch('setHeader', {show: false})
      this.$store.dispatch('showFooter')
    }
  }
</script>
<style scoped lang='scss'>
  @import "./../../assets/css/common/config";
  .feedback {
    border-top: 1px solid $bodycolor;
    padding: $big-space * 2;
    textarea, input, button {
      width: 100%;
      border: 1px solid $bodycolor;
      padding: $middle-space $big-space;
      border-radius: 5px;
      font-size: 0.32rem;
      &:focus {
        outline: $mainColor auto 3px;
      }
    }
    textarea {
      min-height: 3rem;
      resize: none;
    }
    input {
      margin-top: $middle-space * 2;
      padding: $big-space;
    }
    button {
      border: none;
      margin-top: 1rem;
      color:#fff;
      font-size: 0.36rem;
      padding: $big-space 0;
      background: $mainColor;
      &:focus {
        outline: none;
      }
    }
  }
</style>