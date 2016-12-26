<template>
  <div v-pre>
    <div class="findBanner">
      <img src="./../assets/images/find/banner.png">
    </div>
    <ul class="list" >
      <router-link tag='li' to='/safe'>
        <span class="icon" />
        <span>安全保障</span>
        <i class="leftArrow" />
      </router-link>
      <router-link tag='li' to='/about'>
        <span class="icon about" />
        <span>关于富通贷</span>
        <i class="leftArrow" />
      </router-link>
      <router-link tag='li' to='/activity'>
        <span class="icon activity" />
        <span>精彩活动</span>
        <i class="leftArrow" />
      </router-link>
      <router-link tag='li' to='/invite'>
        <span class="icon invite" />
        <span>邀请好友</span>
        <i class="leftArrow" />
      </router-link>
      <router-link tag='li' to='/help'>
        <span class="icon help" />
        <span>帮助中心</span>
        <i class="leftArrow" />
      </router-link>
      <router-link tag='li' to='/contact'>
        <span class="icon contact" />
        <span>联系我们</span>
        <i class="leftArrow" />
      </router-link>
    </ul>
    <div class="kefu">
      <h2>客服热线　<span>400-000-0303</span></h2>
      <p>工作日:09:00-21:00　周末:09:00-17:00</p>
    </div>
  </div>
</template>
<script>
</script>
<style lang="scss">
  @import "./../assets/css/common/config";
  .findBanner {
    width: 7.5rem;
    height: 3.58rem;
    img {width: 100%;}
  }
  .list {
    width: 7.5rem;
    margin-top: $middle-space;
    background: #fff;
    font-size: 0.36rem;
    li {
      height: 0.65rem;
      line-height: 0.65rem;
      padding: $middle-space * 2;
      border-top: 1px solid $bodycolor;
      text-align: left;
      span {
        display: inline-block;
        width: 5rem;
        margin-left: 0.5rem;
      }
      .icon {
        height: 0.65rem;
        width: 0.65rem;
        background-size: 100% 100%;
        vertical-align: middle;
        margin-left: 0;
      }
      .leftArrow {
        display: inline-block;
        width: 0.4rem;
        height: 0.4rem;
        background-image: url("./../assets/images/find/leftArrow.png");
        background-size: 100% 100%;
        vertical-align: middle;
        margin-left: $big-space;
      }
    }
  }
  .icon {
    background-image: url("./../assets/images/find/safe.png");
  }
  .icon.about {
    background-image: url("./../assets/images/find/about.png");
  }
  .icon.activity {
    background-image: url("./../assets/images/find/activity.png");
  }
  .icon.invite {
    background-image: url("./../assets/images/find/invite.png");
  }
  .icon.help {
    background-image: url("./../assets/images/find/help.png");
  }
  .icon.contact {
    background-image: url("./../assets/images/find/contact.png");
  }
  .kefu {
    margin-bottom: 55px;
    margin-top: $middle-space;
    background: #fff;
    padding: $big-space * 3;
    color: $lightColor;
    h2 {
      margin-bottom: $middle-space * 2;
      span {
        color: $mainColor;
      }
    }
  }
  .slideIn {
    transition: all .5s;
    margin-top: $titleHeight;
    background: #fff;
  }
  .slideIn-enter {
    margin-top:0;
  }
  .slideIn-leave-active {
    display: none;
  }
  .titleHeight {
    margin-top: $titleHeight;
  }
</style>
