//载入Vue
import Vue from 'vue';
//载入Vuex
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate"
//使用vuex
Vue.use(Vuex);

//创建store
let store=new Vuex.Store({
    //状态
    state:{
      name:''
    },
    //异步
    actions:{

    },
    //同步改变state的方法
    mutations:{
      user(state,v){
        state.name=v
      }
    },
    //计算属性
    getters:{

    },
    plugins: [createPersistedState()]
})
export default store;
