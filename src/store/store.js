import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	url1: "" ,//返回的导航栏链接
	show: false,//修改商品
	name:'huanxi'
  },
  mutations: {
	  setValue( state , url1){
	     state.url1 = url1
	    },
	  setValue1( state , show){
	     state.show = show
	    },
	  setName( state , name){
	     state.name = name
	    }

  },
  actions: {

  }
})
