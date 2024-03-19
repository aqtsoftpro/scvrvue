import Vue from 'vue'
import Vuex from 'vuex'

import app from '../main'
import menu from './modules/menu'
import user from './modules/user'
import axios from 'axios'
import { apiUrl } from '../constants/config'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roleOptions: [],
    searchMode: 'vehicle',
    searchResults: [],
  },
  getters: {
    roleOptions: state => state.roleOptions,
    searchResults: state => state.searchResults,
    searchMode: state => state.searchMode
  },
  mutations: {
    getRoleOptions(state, payload){
      state.roleOptions = payload
    },
    changeLang (state, payload) {
      app.$i18n.locale = payload
      localStorage.setItem('currentLanguage', payload)
    },
    setSearchResults (state, payload) {
      state.searchResults = payload
    },
    setSearchMode (state, payload) {
      state.searchMode = payload
    }
  },
  actions: {
    get_role_options(context, payload) {
      axios.get(apiUrl + '/role',{
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(response => {
        console.log(response.data)
        context.commit('getRoleOptions', response.data);
      });
    },
    setLang ({ commit }, payload) {
      commit('changeLang', payload)
    },
    setSearchMode(context, payload){
      context.commit('setSearchMode', payload)
    },
    searchVehicle(context, payload){
      axios.get(apiUrl + '/search?keyword=' + payload.keyword + '&mode=' + payload.mode, {
        headers:{
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(response => {
        context.commit('setSearchResults', response.data.results)
        router.push({path: '/app/search', query: { keyword: payload.keyword, mode: payload.mode }}).catch(()=>{})
        //this.results = response.data.results
      })
    },
    notify(context, payload){
      this.$notify(
        `${payload.status} filled`,
        `${payload.title}!`,
        `${payload.message}`,
        { duration: 3000, permanent: false });
    }
  },
  modules: {
    menu,
    user,
  }
})
