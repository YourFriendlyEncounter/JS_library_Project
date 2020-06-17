import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import Message from 'vue-m-message'
import 'vue-m-message/dist/index.css'

Vue.use(Message) // will mount `Vue.prototype.$message`

import firebase from 'firebase/app'
import 'firebase/auth' 
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/storage'   
import 'firebase/analytics'   
import 'firebase/remote-config'

new Vue({
  router,
  store,
  created(){
    var firebaseConfig = {
      apiKey: "AIzaSyC-yo-21XzuTov1ruTtveE5ZQVD3r4ORpA",
      authDomain: "library-930a7.firebaseapp.com",
      databaseURL: "https://library-930a7.firebaseio.com",
      projectId: "library-930a7",
      storageBucket: "library-930a7.appspot.com",
      messagingSenderId: "457668259072",
      appId: "1:457668259072:web:cdef40fe9568c9d1e6d7e5",
      measurementId: "G-3FYWDV8HD5"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    this.$store.dispatch('loadAllUsers')
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.$store.dispatch('loggedUser', user)
      }
      else this.$store.commit('setLogging', false)
    })
  },
  render: h => h(App)
}).$mount('#app')
