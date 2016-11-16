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
      title: '理财产品',
      show: false
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
    }
  }
}
