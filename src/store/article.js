import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import firebase from 'firebase/app'
import Message from 'vue-m-message'

export default {
  state: {
      articles: [],
      loadingFullArticle: false,
      loadingArticles: false
  },
  mutations: {
    addArticleToLoaded(state, payload ){
      state.articles.push(payload)
    },
    setLoadingFullArticle(state, payload) {
      state.loadingFullArticle = payload
    },
    sortArticles(state) {
      state.articles = state.articles.sort((a, b) => b.dateTimeAdded - a.dateTimeAdded)
    },
    setLoadingArticles(state, payload) {
      state.loadingArticles = payload;
    },
    updateArticle(state, payload) {
      state.articles.find(a => a.id === payload.id).text = payload.text;
    }
  },
  actions: {
    async loadArticles({commit, getters, dispatch}, {field, page, itemsPerPage}) {
        commit('setLoadingArticles', true)
        try{
            const article = firebase.database().ref('articles/'+field)
            .limitToLast(page * itemsPerPage + itemsPerPage)
            
            article.on('child_added', async (snap) => {
                if(!getters.getLoadedArticles.find(a => a.id === snap.key)){
                  commit('setLoadingArticles', true)
                  let article = snap.val()
                  article.id = snap.key;
                  if (!article.views) {
                    article.views = 0;
                  }

                  let URL = await dispatch('getImageDownloadURL', {
                    division: "articlePreviews", 
                    field: article.field, 
                    id: article.id 
                  });

                  article.image = URL.downloadURL
                  commit('addArticleToLoaded', article)
                  commit('setLoadingArticles', false)
                }
            })

            article.on('child_changed', (snap) => {
                commit('updateArticle', snap.val())
            })

            commit('sortArticles')
            commit('setLoadingArticles', false)
            return getters.getLoadedArticles
        }
        catch(error){
            commit('setLoadingArticles', false)
            Message.error(error.message)
            throw error
        }
    },
    async newArticle({commit}, payload) {
      try{
        let article = await firebase.database()
        .ref('articles/'+payload.field)
        .push(payload)

        payload.id = article.key;

        commit('addArticleToLoaded', payload)

        return payload;
      }
      catch(error){
          Message.error(error.message)
          throw error
      }
    },
    async loadSingleArticle({commit, getters}, {field, id}){
      commit('setLoadingFullArticle', true)
      let alreadyLoadedArticle = getters.getLoadedArticles.filter(a => a.id === id)
      if(alreadyLoadedArticle.length > 0){
        commit('setLoadingFullArticle', false)

        alreadyLoadedArticle[0].views++;
        await firebase.database()
        .ref('articles/'+field).child(id)
        .set(alreadyLoadedArticle[0])

        return alreadyLoadedArticle[0];
      }
      try {
        const article = await firebase.database()
        .ref('articles/'+field).child(id).once('value')
        
        let articleVal = article.val()
        commit('setLoadingFullArticle', false)
        if(!articleVal.views)
          articleVal.views = 1;
        console.log(articleVal)

        await firebase.database()
        .ref('articles/'+field).child(id)
        .set(articleVal)

        return articleVal
      }
      catch(error) {
        commit('setLoadingFullArticle', false)
        Message.error(error.message)
        throw error
      }
    }
  },
  getters: {
    getLoadedArticles(state) {
      return state.articles
    },
    isLoadingFullArticle(state) {
      return state.loadingFullArticle
    },
    isLoadingArticles(state) {
      return state.loadingArticles
    }
  } 
}
