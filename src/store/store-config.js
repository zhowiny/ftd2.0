/**
 * Created by Administrator on 2016/11/17.
 */
export default {
  state: {
    isLogin: false,
    picList: '',
    firstPageData: {
      bordMessages: '',
      borrows: ''
    },
    pkey: '',
    header: {
      background: 'transparent',
      fixed: true,
      title: '富通贷',
      show: false
    },
    showFooter: true,
    bitLists: {
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
    showFooter (state) {
      state.showFooter = true
    },
    hideFooter (state) {
      state.showFooter = false
    }
  },
  actions: {
    setFirstPageData (ctx, data) {
      ctx.commit('setFirstPageData', data)
    },
    setPicList (ctx, data) {
      ctx.commit('setPicList', data)
    },
    login (ctx) {
      ctx.commit('login')
    },
    logout (ctx) {
      ctx.commit('out')
    },
    setHeader (ctx, data) {
      ctx.commit('setHeader', data)
    },
    setBitLists (ctx, data) {
      ctx.commit('setBitLists', data)
    },
    showFooter ({commit}) {
      commit('showFooter')
    },
    hideFooter ({commit}) {
      commit('hideFooter')
    }
  }
}
