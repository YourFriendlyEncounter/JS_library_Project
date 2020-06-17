<template>
  <div id="app">
    <div v-if="!isLoading" id="main-content">
      <Header />
      <div id="content-center">
        <LeftSideBar />
        <router-view :key="$route.fullpath" style="background-color: white; width: 62vw; margin-left: 19vw; padding-top: 3.5rem;"/>
        <div />
      </div>
      <!-- 
        Icons made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> 
        from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
      -->
    </div>
    <Loading v-else />
    <a href="#top">
      <img id="go-top" src="./assets/up.png" width="64">
    </a>
  </div>
</template>

<script>
import Header from './components/Header'
import Loading from './components/Loading'
import LeftSideBar from './components/LeftSideBar'

export default {
  components: {
    Header,
    Loading,
    LeftSideBar
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLogging || this.$store.getters.isLoadingUsers
    }
  }
}
</script>

<style>
body{
  background-color:rgb(231, 231, 231);
}

body, h1, h2, h3, h4, h5, h6, p{
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}

#go-top {
  position: fixed; 
  right: 4rem; 
  bottom: 4rem; 
  opacity: 0.8;
}

#content-center{
  display: flex;
  justify-content: space-between;
}

.flex{
  display: flex;
  align-items: center;
}

.input-text{
  display: inline-block;
  box-sizing: border-box;
  height: 34px;
  padding: 6px 30px;
  padding-left: 10px;
  font-size: 14px;
  line-height: 1.4;
  color: #555;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
}

.custom-button{
  display:inline-block;
  padding:0.4em 1em;
  border-width: 1px;
  box-sizing: border-box;
  text-decoration:none;
  font-family:'Roboto Slab', serif;
  font-size: 1rem;
  font-weight:400;
  color:#FFFFFF;
  background-color:#3369ff;
  box-shadow:inset 0 -0.6em 1em -0.35em rgba(0,0,0,0.17),inset 0 0.6em 2em -0.3em rgba(255,255,255,0.15),inset 0 0 0em 0.05em rgba(255,255,255,0.12);
  text-align:center;
  position:relative;
  cursor: pointer;
}

.custom-button:hover{
  text-shadow: 0 0 2em rgba(255,255,255,1);
  color:#FFFFFF;
  border-color:#FFFFFF;
  background-color:#eecd14;
  transition: background-color .2s;
}

.custom-button:active{
  box-shadow:inset 0 0.6em 2em -0.3em rgba(0,0,0,0.15),inset 0 0 0em 0.05em rgba(255,255,255,0.12);
}

.container-generic{
  box-shadow: 0 1px 0 0 #d7d8db, 0 0 0 1px #e3e4e8;
}

.small-separator{
  border: 1px solid rgb(231, 231, 231);
  margin: 0.5rem 0;
}

.form-generic {
    display: flex;
    flex-direction: column;
}

/* Article preview layout */
.article-preview{
	border: 1px #ccc solid; 
	box-shadow: 0 0 8px #ccc;
	background: white;
    width: 16rem;
    height: 21rem;
}
.article-title{
    margin: 0.5rem 0;
    font-weight: bold;
    font-family: 'Roboto Slab';
}
.article-main-info{
    height: 12rem;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 80%;
    text-align: left;
    padding: 0 0.5rem;    
}
.preview-image{
    width: 100%;
    height: 9rem;
    margin-bottom: -4px;
}
.article-textdata{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
    height: 12rem;
}
.article-bottom-info{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.5rem;
}
.article-publish-date{
    text-align: right;
    color: gray;
    font-size: 80%;
}

.underline-text{
  text-decoration: underline;
}
</style>
