<template>
    <header>
        <router-link :to="'/'">
            <div class="flex">
                <img src="../assets/js_logo.png" width="96" height="54">
                <h1>Программирование на JavaScript</h1>
            </div>
        </router-link>
        <div id="authorization">
            <router-link v-if="!checkUser" :to="'/auth'" style="margin: 0 0.5rem;">Войти / Зарегистрироваться</router-link>
            <div v-else style="display: flex;">
                <h4>Добро пожаловать, {{ getUser.nickname }}</h4>
                <a href="#" style="margin: 0 0.5rem;" @click="unlogUser">Выйти</a>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    computed: {
        checkUser() {
            return this.$store.getters.checkUser
        },
        getUser() {
            return this.$store.getters.getUser
        }
    },
    methods: {
        unlogUser() {
            this.$store.dispatch('unlogUser')
        }
    }
}
</script>

<style scoped>
header{
    display: flex;
    justify-content: space-between;
    background-color: orange;
    box-shadow: 0px 2px 4px rgba(0,0,0,0.4);
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 3.5rem;
}
#authorization{
    display: flex;
    align-items: center;
}
a{
    color: white;
    text-decoration: none;
}
h1 {
    color: white;
    text-shadow: 1px 1px 2px rgb(48, 48, 48); 
    font-family: 'Roboto Slab';
    margin-bottom: .2rem;
}
@media screen and (max-width: 1200px){
    h1{
        font-size: 130%;
    }
}
</style>