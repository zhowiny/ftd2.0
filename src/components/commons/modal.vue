<template>
  <div class="mask" v-show="value">
    <div class="modal">
      <span @click="hide">&times;</span>
      <h3>{{title}}</h3>
      <div class="content" v-html="content">
      </div>
      <div class="modal-btn">
        <div class="cancel" @click="hide">取消</div>
        <div class="confirme" @click='toPage()'>确定</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: '',
      title: '',
      content: '',
      path: ''
    }
  },
  methods: {
    hide () {
      this.value = false
    },
    toPage () {
      this.hide()
      if (!this.path) return
      window.location.hash = this.path
    }
  }
}
</script>
<style scoped lang='scss'>
  @import "./../../assets/css/common/config";
  .mask {
    position: fixed;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0,0,0,.5);
    z-index: 100;
  }
  .modal {
    position: fixed;
    top:25%;
    left:50%;
    transform: translate(-50%);
    width: 6.8rem;
    z-index: 101;
    background: rgba(255,255,255,1);
    border-radius: 0.3rem;
    text-align: center;
    >span {
      display: block;
      position: absolute;
      width: 0.5rem;
      height: 0.5rem;
      right: 0.3rem;
      top: -0.3rem;
      border-radius: 50%;
      font-size: 0.6rem;
      line-height: 0.5rem;
      border: 1px solid $lightColor;
      background: #fff;
      color: darken($lightColor, 20%);
    }
    >h3 {
      padding: $big-space 0;
      border-bottom: 1px dashed $lightColor;
      margin-bottom: $big-space * 3;
      color:#444;
      font-size: 0.36rem;
      font-weight: normal;
    }
  }
  .content {
    padding: 0 0.8rem;
    text-align: left;
    font-size: 0.32rem;
    color: $mainColor;
  }
  .modal-btn {
    display: flex;
    margin-top: $big-space * 3;
    margin-bottom: $big-space * 3;
    justify-content: center;
    >div {
      width: 2rem;
      margin: 0 $big-space * 2;
      padding: $big-space 0;
      border-radius: 8px;
      background: $lightColor;
      color:#fff;
      font-size: 0.32rem;
    }
    div.confirme {
      background: $mainColor;
    }
  }
</style>