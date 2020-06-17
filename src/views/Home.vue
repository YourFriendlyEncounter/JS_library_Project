<template>
  <div id="home">
    <DisplayArticles :field="'mainPage'" />
  </div>
</template>

<script>
// @ is an alias to /src
import DisplayArticles from '../components/DisplayArticles'
export default {
  name: 'Home',
  components: {
    DisplayArticles
  }
}
</script>

<style scoped>
#home {
  min-height: 100vh;
}
</style>