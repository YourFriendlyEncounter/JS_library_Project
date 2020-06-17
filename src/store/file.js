import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import firebase from 'firebase/app'
import Message from 'vue-m-message'

export default {
  state: {
      loadedImageURLs: [],
      loadingImages: true
  },
  mutations: {
      addLoadedImage(state, payload) {
        state.loadedImageURLs.push(payload)
      },
      setLoadingImages(state, payload) {
        state.loadingImages = payload
      }
  },
  actions: {
      async uploadImage({commit}, { file, division, field, id }){
          commit('setLoadingImages', true)
          try {
            const link = division + '/' + field + '/' + id;
            const image = firebase.storage().ref(link)
            await image.put(file)

            let URL = {
                databaseLink: link,
                downloadURL: await image.getDownloadURL()
            }
            commit('addLoadedImage', URL)
          }
          catch(error) {
              Message.error(error.message)
              throw error
          }
          finally {
            commit('setLoadingImages', false)
          }
      },
      async getImageDownloadURL({commit, getters}, { division, field, id }){
        commit('setLoadingImages', true)
        const databaseLink = division + '/' + field + '/' + id;
        
        const alreadyLoadedImage = getters.getLoadedImages.filter(i => i.databaseLink === databaseLink);
        if(alreadyLoadedImage.length > 0){
            commit('setLoadingImages', false)
            return alreadyLoadedImage[0];
        }
        
        try {
          const image = firebase.storage()
          .ref(databaseLink)

          let URL = {
              databaseLink: databaseLink,
              downloadURL: await image.getDownloadURL()
          }
          commit('addLoadedImage', URL)
          return URL;
        }
        catch(error) {
            Message.error(error.message)
            throw error
        }
        finally {
          commit('setLoadingImages', false)
        }
      }
  },
  getters: {
    getLoadedImages(state) {
        return state.loadedImageURLs
    }
  }
}
