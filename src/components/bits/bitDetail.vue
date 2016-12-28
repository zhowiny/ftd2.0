<template>
  <div class="detail">
    <div class="bit-info">
      <div>
        <span class="status">进行中</span>
        <h3>新手标-201605期</h3>
        <div class="bit-data">
          <div class="row">
            <p><span class="rate">9.80</span><br>年化利率</p>
            <p><span>18</span><br>期限 (天)</p>
          </div>
          <div class="row">
            <p class="progress">
              <span></span>
            </p>
            <p><b>已加入30%</b></p>
          </div>
          <div class="row">
            <p><span>150,0000</span><br>产品总额</p>
            <p><span>1000</span><b>元</b><br>起投金额</p>
            <p><b>预计:</b> <span>T+1</span><br>回款日期</p>
          </div>
        </div>
      </div>
    </div>
    <div class="operate">
      <div class="form-row">
        <span>购　　买:</span>
        <div>
          <input placeholder="输入购买金额"/>
        </div>
      </div>
      <div class="form-row">
        <span>预期收益:</span>
        <div class="disabled">
          <input disabled value="0.00"/>
        </div>
      </div>
      <div class="form-row">
        <span>优　　惠:</span>
        <div class="selected" @click.self="toggleSelected" :class='{active:selected}'>
          <i v-text="selectedVal"></i>
          <ul :class='{active:selected}'>
            <li v-for="i in mockData" :class='{active: i==selectedVal}' @click.self="selecte(i)">{{i}}</li>
          </ul>
        </div>
      </div>
      <div class="form-row">
        <span>账户余额:</span>
        <div class="disabled">
          <input disabled value="0.00"/>
        </div>
      </div>
    </div>
    <div class="information">
      <h3 @click="slideToggle(0)" :class='{active:status[0]}'><span/>产品介绍</h3>
      <transition name='slideToggle'>
        <div class="content" v-show="status[0]">
          债权转让运作模式，多重保障安全;<br>
          一次性投资，到期回收本金和收益;<br>
          投资起步低，100元即可加入，每次100元递增;<br>
          投资回本期限短，到帐快。
        </div>
      </transition>
      <h3 @click="slideToggle(1)" :class='{active:status[1]}'><span/>借款企业基本信息</h3>
      <transition name='slideToggle'>
        <div class="content" v-show="status[1]">
          <ul>
            <li>
              <div>企业名</div>
              <div>娄底市青艺文化传媒有限公司</div>
            </li>
            <li>
              <div>营业执照号码</div>
              <div>431300000131131121</div>
            </li>
            <li>
              <div>注册资本</div>
              <div>50万</div>
            </li>
            <li>
              <div>代表人</div>
              <div>陈晓泉</div>
            </li>
            <li>
              <div>组织机构代码</div>
              <div>59104166-X</div>
            </li>
            <li>
              <div>成立日期</div>
              <div>2012年3月20日</div>
            </li>
          </ul>
        </div>
      </transition>
      <h3 @click="slideToggle(2)" :class='{active:status[2]}'><span/>投资记录</h3>
      <transition name='slideToggle'>
        <div class="content annal" v-show="status[2]">
          <ul>
            <li>
              <div>投资人</div>
              <div>投标金额 (元)</div>
              <div>时间</div>
            </li>
            <li>
              <div>187****9131</div>
              <div>100,000,000.00</div>
              <div>2015.06.30 10:15:12</div>
            </li>
            <li>
              <div>187****9131</div>
              <div>100,000,000.00</div>
              <div>2015.06.30 10:15:12</div>
            </li>
            <li>
              <div>187****9131</div>
              <div>100,000,000.00</div>
              <div>2015.06.30 10:15:12</div>
            </li>
            <li>
              <div>187****9131</div>
              <div>100,000,000.00</div>
              <div>2015.06.30 10:15:12</div>
            </li>
            <li>
              <div>187****9131</div>
              <div>100,000,000.00</div>
              <div>2015.06.30 10:15:12</div>
            </li>
            <li>
              <div>187****9131</div>
              <div>100,000,000.00</div>
              <div>2015.06.30 10:15:12</div>
            </li>

          </ul>
        </div>
      </transition>
    </div>
    <div class="buy" @click='modal'>立即抢购</div>
    <!--密码框-->
    <div class="mask" v-show="passwordBox">
      <div class="modal">
        <span @click="hidePasswordBox">&times;</span>
        <h3>短信验证码</h3>
        <div class="password-content">
          <div>
            <span>交易密码:</span>
            <input type="text" placeholder="请输入交易密码">
          </div>
          <div>
            <input type="password" placeholder="请输入短信验证码">
            <span @click="countdown">{{countText}}</span>
          </div>
        </div>
        <div class="modal-btn">
          <div class="confirme" >确定</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {showModal} from './../commons/modal.js'
  export default {
    data () {
      return {
        selected: false,
        selectedVal: '代金券抵扣',
        mockData: ['5%加息券', '5块钱代金券', '2%加息券', '10%加息券(7天)'],
        status: [false, false, false],
        passwordBox: false,
        countText: '获取',
        time: '',
        clickable: true
      }
    },
    methods: {
      toggleSelected () {
        this.selected = !this.selected
      },
      selecte (val) {
        this.selectedVal = val
      },
      slideToggle (index) {
        this.status.splice(index, 1, !this.status[index])
      },
      modal () {
//        showModal({content: '为了保障您的资金安全,购买前请实名认证.', title: '实名认证'})
        showModal({content: '您当前购买产品的账户余额不足,请先充值!', title: '充值'})
      },
      hidePasswordBox () {
        this.passwordBox = false
      },
      countdown () {
        // 获取验证倒计时
        if (!this.clickable) return
        this.clickable = false
        this.countText = 10
        this.time = setInterval(() => {
          if (this.countText <= 0) {
            this.countText = '获取'
            clearInterval(this.time)
            this.clickable = true
            return
          }
          this.countText --
        }, 1000)
      }
    },
    created () {
      this.$store.dispatch('setHeader', {show: true, fixed: false, background: 'transparent', title: '标详情', color: '#fff'})
      this.$store.dispatch('hideFooter')
    }
  }
</script>
<style scoped lang='scss'>
  @import "./../../assets/css/common/config";

  .detail {
    margin-top: -48px;
  }

  .bit-info {
    width: 7.5rem;
    height: 5.6rem;
    background: url("../../assets/images/bits/bitInfo.png") no-repeat center;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 1.7rem 0.6rem 0.3rem 0.6rem;
    > div {
      position: relative;
    }
    h3 {
      font-weight: normal;
      padding: $big-space 0;
    }
  }

  .status {
    position: absolute;
    left: -0.06rem;
    top: 0.15rem;
    font-size: 0.24rem;
    color: #fff;
    transform: rotate(-45deg);
  }

  .bit-data {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .row {
    width: 80%;
    display: flex;
    align-items: flex-end;
    p {
      flex: 0 1 33%;
      color: $colors;
    }
    span {
      color: $mainColor;
    }
    b {
      font-weight: normal;
      color: $deepColor;
    }
    .progress {
      flex: 1 1 66%;
      height: 5px;
      background: $colors;
      align-self: center;
      border-radius: 5px;
      position: relative;
      overflow: hidden;
      span {
        position: absolute;
        width: 30%;
        height: 5px;
        border-radius: 5px;
        background: $mainColor;
        left: 0;
      }
    }
  }

  .row:first-child p:last-child span {
    color: #28518F;
  }

  .row:nth-child(2) {
    padding: $big-space 0;
  }

  .rate {
    font-size: 0.4rem;
    color: $mainColor;
    font-weight: bold;
    &:after {
      content: '%';
      font-size: 0.12rem;
    }
  }

  .operate {
    background: #fff;
    input {
      background: transparent;
      outline: none;
      border: none;
      color: $mainColor;
    }
  }

  .form-row {
    display: flex;
    align-items: center;
    height: 1.2rem;
    border-bottom: 1px solid $bodycolor;
    span {
      flex: 1 1 25%;
      font-size: 0.32rem;
    }
    > div {
      flex: 1 1 75%;
      display: flex;
      margin-right: $big-space * 2;
      align-items: center;
      border: 1px solid $colors;
      height: 0.88rem;
      border-radius: 5px;
      padding: 0 $big-space;
      &:before {
        content: '¥';
        font-size: 0.36rem;
        margin-right: $big-space;
      }
    }
    .disabled {
      border: none;
    }
    .selected:before {
      content: '▲';
      color: #fff;
      font-size: 0.4rem;
      position: absolute;
      background: $lightColor + #333;
      height: 0.88rem;
      width: 0.88rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all .5s;
      right: -0.16rem;
      top: 0;
      border-radius: 5px;
    }
  }

  .selected.active:before {
    background: $mainColor;
    transform: rotate3d(1, 0, 0, 180deg);
  }

  .selected {
    position: relative;
    i {
      font-style: normal;
    }
    ul {
      position: absolute;
      z-index: 1000;
      top: 100%;
      left: 0;
      width: 100%;
      background: rgba(222, 222, 222, .8);
      text-align: left;
      border-radius: 10px;
      transition: transform .5s;
      transform: scale3d(1, 0, 0);
      transform-origin: top center;
      li {
        padding: $big-space $big-space * 2;
        border-bottom: 1px solid #fff;
        box-sizing: border-box;
      }
      li:last-child {
        border: none;
      }
    }
    ul.active {
      transform: scale3d(1, 1, 1);
    }
    li.active {
      background: rgba(255, 111, 33, .8);
      color: #fff;
    }
  }

  .information {
    margin-top: $big-space;
    margin-bottom: 48px;
    background: #fff;
    padding: $big-space;
    h3 {
      font-weight: normal;
      display: flex;
      align-items: center;
      position: relative;
      padding-top: $big-space;
      &:after {
        content: '';
        display: inline-block;
        position: absolute;
        right: 0;
        width: 0.4rem;
        height: 0.4rem;
        transition: transform .3s;
        background-image: url("./../../assets/images/bits/arrow.png");
        background-size: 100%;
      }
    }
    span {
      display: inline-block;
      width: 0.65rem;
      height: 0.65rem;
      background-image: url("../../assets/images/bits/introduction.png");
      background-size: cover;
      margin-right: $big-space * 2;
    }
    h3:nth-of-type(2) span {
      background-image: url("./../../assets/images/bits/material.png");
    }
    h3:nth-of-type(3) span {
      background-image: url("./../../assets/images/bits/recording.png");
    }
    h3.active:after {
      transform: rotate3d(0, 0, 1, 180deg);
    }
  }

  .content {
    box-sizing: border-box;
    text-align: left;
    padding: $big-space;
    padding-left: 0.95rem;
    border-bottom: 1px solid $bodycolor;
    transition: all .3s;
    transform-origin: top center;
    overflow: hidden;
    > ul {
      border: 1px solid $lightColor;
      border-bottom: none;
      li {
        border-bottom: 1px solid $lightColor;
        display: flex;
      }
      div {
        padding: $middle-space;
      }
      div:first-child {
        width: 33%;
        border-right: 1px solid $lightColor;
      }
    }
  }

  .content.annal {
    padding: $big-space;
    > ul {
      border: none;
      li {
        border: none;
        display: flex;
        align-items: center;
        &:first-child div {
          font-size: 0.32rem;
        }
        div:first-child {
          width: 22%;
          flex: none;
        }
        div:last-child {
          width: 35%;
          flex: none;
        }
      }
      div {
        padding: $middle-space 0;
        text-align: center;
        flex: auto;
        width: auto;
        border: none;
        font-size: 0.24rem;
      }
    }
  }

  .buy {
    position: fixed;
    bottom: 0;
    width: 7.5rem;
    line-height: 48px;
    background: $mainColor;
    color: #fff;
    text-align: center;
    font-size: 0.4rem;
  }

  .slideToggle-enter, .slideToggle-leave-active {
    transform: scale3d(1, 0, 1);
  }
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
  .password-content {
    padding: 0 0.8rem;
    text-align: left;
    font-size: 0.32rem;
    color: $mainColor;
    >div {
      display: flex;
      border-bottom: 1px solid $mainColor;
      height: 0.8rem;
      align-items: stretch;
      input {
        border: none;
        outline: none;
        width: 70%;
      }
      span {
        display: block;
        width: 30%;
        text-align: center;
        align-self: center;
      }
    }
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
      width: 80%;
    }
  }
</style>