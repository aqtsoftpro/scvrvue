import firebase from 'firebase/app'
import 'firebase/auth'
import axios from 'axios'
import { currentUser, isAuthActive } from '../../constants/config'
import router from '../../router'
import {apiUrl} from '../../constants/config.js'

export default {
  state: {
    currentUser: isAuthActive ? currentUser : (localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : null),
    loginError: null,
    processing: false,
    forgotMailSuccess:null,
    resetPasswordSuccess:null
  },
  getters: {
    currentUser: state => state.currentUser,
    processing: state => state.processing,
    loginError: state => state.loginError,
    forgotMailSuccess: state => state.forgotMailSuccess,
    resetPasswordSuccess:state => state.resetPasswordSuccess,
  },
  mutations: {
    setUser(state, payload) {
      state.currentUser = payload
      state.processing = false
      state.loginError = null
    },
    setLogout(state) {
      state.currentUser = null
      state.processing = false
      state.loginError = null
    },
    setProcessing(state, payload) {
      state.processing = payload
      state.loginError = null
    },
    setError(state, payload) {
      state.loginError = payload
      state.currentUser = null
      state.processing = false
    },
    setForgotMailSuccess(state) {
      state.loginError = null
      state.currentUser = null
      state.processing = false
      state.forgotMailSuccess=true
    },
    setResetPasswordSuccess(state) {
      state.loginError = null
      state.currentUser = null
      state.processing = false
      state.resetPasswordSuccess=true
    },
    clearError(state) {
      state.loginError = null
    }
  },
  actions: {
    login({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)

      // axios request post request
      axios.post(apiUrl + '/login/token', {
        'email': payload.email,
        'password': payload.password,
        'device_name': 'scvr_web_app'
      }).then(response => {

        if(response.data.status == 'success') {
          //set the token in local storage
          localStorage.setItem('token', response.data.token)

            //Get the current user by token from api and set it to local storage
          axios.get(apiUrl + '/user',
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
            }
          )
          .then(response => {

            let user = {
              name: response.data.name,
              email: response.data.email,
              id: response.data.id,
              img: '/assets/img/profile-pic-l.jpg',
              role_id: response.data.roles[0].id,
              role_name: response.data.roles[0].name
            }

            //console.log(user);

            user = JSON.stringify(user);

            localStorage.setItem('user', user);
            commit('setUser', response.data)
            router.push('/app/dashboard');

          })

        } else {
          commit('setError', response.data.message)
          commit('setProcessing', false)
        }

      }).catch(error => {
        //console.log(error.response.data.message)
        commit('setError', error.response.data.message)
        this.$notify(
          'danger',
          'Access Denied!',
          error.response.data.message,
          { duration: 3000, permanent: false });
        commit('setProcessing', false)
      });

    },
    forgotPassword({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      firebase
        .auth()
        .sendPasswordResetEmail(payload.email)
        .then(
          user => {
            commit('clearError')
            commit('setForgotMailSuccess')
          },
          err => {
            commit('setError', err.message)
            setTimeout(() => {
              commit('clearError')
            }, 3000)
          }
        )
    },
    resetPassword({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      firebase
        .auth()
        .confirmPasswordReset(payload.resetPasswordCode,payload.newPassword)
        .then(
          user => {
            commit('clearError')
            commit('setResetPasswordSuccess')
          },
          err => {
            commit('setError', err.message)
            setTimeout(() => {
              commit('clearError')
            }, 3000)
          }
        )
    },



    /*
       return await auth.(resetPasswordCode, newPassword)
        .then(user => user)
        .catch(error => error);
    */
    signOut({ commit }) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
}
