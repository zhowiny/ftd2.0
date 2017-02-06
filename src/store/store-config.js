/**
 * Created by Administrator on 2016/11/17.
 */
export default {
  state: {
    isLogin: false,
    userInfo: '', // 用户信息
    account: '',  // 用户账户信息
    picList: '',  // 轮播图
    firstPageData: {  // 首屏数据
      bordMessages: '',
      borrows: ''
    },
    pkey: '',
    header: {  // 头部状态
      background: 'transparent',
      fixed: true,
      title: '富通贷',
      show: false,
      color: ''
    },
    showFooter: true,
    bitLists: {  // 标列表
      type1: '',
      type2: '',
      type3: ''
    }
  },
  mutations: {
    login (state) {
      state.isLogin = true
    },
    logout (state) {
      state.isLogin = false
    },
    setFirstPageData (state, data) {
      state.firstPageData = data
      state.pkey = data.pkey
    },
    setPicList (state, data) {
      state.picList = data
    },
    setHeader (state, data) {
      for (let key in data) {
        state.header[key] = data[key]
      }
    },
    setBitLists (state, data) {
      for (let key in data) {
        state.bitLists[key] = data[key]
      }
    },
    setUserInfo (state, data) {
      state.userInfo = data
    },
    setAccount (state, data) {
      state.account = data
    },
    showFooter (state) {
      state.showFooter = true
    },
    hideFooter (state) {
      state.showFooter = false
    }
  },
  actions: {
    // 设置用户信息
    setUserInfo (ctx, data) {
      ctx.commit('setUserInfo', data)
    },
    setAccount (ctx, data) {  // 设置用户账户信息
      ctx.commit('setAccount', data)
    },
    // 设置首页数据
    setFirstPageData (ctx, data) {
      ctx.commit('setFirstPageData', data)
    },
    // 设置轮播图
    setPicList (ctx, data) {
      ctx.commit('setPicList', data)
    },
    // 登录
    login (ctx) {
      ctx.commit('login')
    },
    // 退出登录
    logout (ctx) {
      ctx.commit('out')
    },
    // 设置头部状态
    setHeader (ctx, data) {
      ctx.commit('setHeader', data)
    },
    // 设置标列表
    setBitLists (ctx, data) {
      ctx.commit('setBitLists', data)
    },
    // 显示footer
    showFooter ({commit}) {
      commit('showFooter')
    },
    // 隐藏footer
    hideFooter ({commit}) {
      commit('hideFooter')
    }
  }
}
