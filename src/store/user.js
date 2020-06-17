import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import firebase from 'firebase/app'
import Message from 'vue-m-message'
import router from '../router'


export default {
  state: {
      user: null,
      logging: true,
      loadingUsers: false,
      userList: []
  },
  mutations: {
      setUser(state, payload) {
        state.user = payload;
      },
      setLogging(state, payload) {
          state.logging = payload;
      },
      addUser(state, payload) {
          if(state.userList.filter(u => u.id == payload.id).length == 0)
            state.userList.push(payload)
      },
      setLoadingUsers(state, payload) {
        state.loadingUsers = payload;
      },
      updateUser(state, payload) {
          for(let i = 0; i < state.userList.length; i++) {
              if(state.userList[i].id == payload.id) {
                  state.userList[i].nickname = payload.nickname;
                  break;
              }
          }
      }
  },
  actions: {
      async registerUser({commit}, {nickname, email, password}) {
          commit('setLogging', true)
          try{
            const user = await firebase.auth()
            .createUserWithEmailAndPassword(email, password)

            const userInfo = {
                id: user.user.uid,
                email: email,
                nickname: nickname,
                dateJoined: (new Date()).toString(),
            }
            await firebase.database()
            .ref('users/' + userInfo.id)
            .set(userInfo)
            
            commit('setUser', userInfo)
        }
        catch(error){
            Message.error(error.message)
            throw error
        }
        finally {
            commit('setLogging', false)
        }
      },
      
      async loginUser({commit}, {email, password}){
        commit('setLogging', true)
        try {
            const user = await firebase.auth()
            .signInWithEmailAndPassword(email, password)

            const userInfo = firebase.database()
            .ref('users/'+user.user.uid)

            userInfo.on("value", (snap) => {
                const user = snap.val()
                commit('setUser', user)
                commit('addUser', user)
            });

            userInfo.on("child_changed", (snap) => {
                const user = snap.val()
                commit('updateUser', user)
            })
        }
        catch(error) {
            Message.error(error.message)
            throw error
        }
        finally {
            commit('setLogging', false)
        }
      },

      async loggedUser ({commit}, payload){
        commit('setLogging', true)
        try{
            let userInfo = firebase.database()
            .ref('users/' + payload.uid)

            userInfo.on("value", (snap) => {
                const user = snap.val()
                commit('setUser', user)
                commit('addUser', user)
            });

            userInfo.on("child_changed", (snap) => {
                const user = snap.val()
                commit('updateUser', user)
            })
        }
        catch(error){
            Message.error(error.message);
            throw error
        }
        finally{
            commit('setLogging', false)
        }
      },

      async unlogUser({commit}){
        commit('setLogging', true)
        try{
            await firebase.auth().signOut()
            commit('setUser', null)
        }
        catch(error){
            Message.error(error.message);
            throw error
        }
        finally{
            commit('setLogging', false)
            router.push('/auth')
        }
      },

      async loadUser({commit, getters}, {userid}){
          try {
            const userInfo = firebase.database()
            .ref('users/'+userid)

            if(getters.getUserList.includes(u => u.id == userid))
                return;

            userInfo.on("value", (snap) => {
                const user = snap.val()
                commit('addUser', user)
            });

            userInfo.on("child_changed", (snap) => {
                const user = snap.val()
                commit('updateUser', user)
            })
        }
        catch(error) {
            Message.error(error.message)
            throw error
        }
      },

      async loadAllUsers({commit, dispatch}){
          try {
            commit('setLoadingUsers', true)
            let users = await firebase.database().ref().child('users').once('value');
            let userVals = await users.val()

            Object.keys(userVals).forEach(async (key) => {
                await dispatch('loadUser', { userid: key })
            })
            commit('setLoadingUsers', false)
          }
          catch(error) {
            Message.error(error.message)
            commit('setLoadingUsers', false)
            throw error
          }
      }
  },
  getters: {
      getUser(state) {
          return state.user
      },
      checkUser(state) {
          return state.user !== null
      },
      isLogging(state) {
          return state.logging
      },
      isLoadingUsers(state) {
        return state.loadingUsers
      },
      getUserList(state) {
          return state.userList
      }
  }
}
