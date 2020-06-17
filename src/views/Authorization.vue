<template>
    <div id="div-auth">
        <div id="auth-forms">
            <h2>Регистрация</h2>
            <form @submit.prevent="registerUser" class="form-generic">
                <input type="text" class="input-text" placeholder="Псевдоним" required minlength="3" maxlength="32" v-model="nickname"/>
                <p class="small-hint">Виден всем пользователям.</p>
                <hr class="small-separator">
                <input type="email" class="input-text" placeholder="Email" required v-model="email"/>
                <p class="small-hint">Будет использован для авторизации.</p>
                <hr class="small-separator">
                <input type="password" class="input-text" placeholder="Пароль" required minlength="6" v-model="password" />
                <hr class="small-separator">
                <input 
                id="confirm-password" 
                type="password" 
                class="input-text" 
                placeholder="Повторите пароль" 
                required 
                minlength="6" 
                @change="validatePasswords"
                v-model="confirmPassword" />
                <hr class="small-separator">
                <input type="submit" class="custom-button" value="Зарегистрироваться" style="background-color:#42cc8c;">
            </form>
            <hr>
            <h2>Уже есть аккаунт?</h2>
            <form @submit.prevent="loginUser" class="form-generic">
                <input type="email" class="input-text" placeholder="Email" required v-model="loginEmail" />
                <hr class="small-separator">
                <input type="password" class="input-text" placeholder="Пароль" required minlength="6" v-model="loginPassword" />
                <hr class="small-separator">
                <input type="submit" class="custom-button" value="Продолжить">
            </form>
        </div>
        <div id="div-ad">

        </div>
    </div>
</template>
<script>
import Message from 'vue-m-message'
export default {
    methods: {
        validatePasswords(){
            if(this.password !== this.confirmPassword){
                (document.getElementById("confirm-password")).setCustomValidity('Пароли не совпадают.');
            }else{
                (document.getElementById("confirm-password")).setCustomValidity('');
            }
        },
        registerUser() {
            if(this.nickname.length < 3 || this.nickname.length > 32 || this.email.length < 3 || this.password.length < 6 ){
                Message.error('Неверная длина данных')
                return;
            }
            this.$store.dispatch('registerUser', {nickname: this.nickname, email: this.email, password: this.password})
            this.$router.push('/')
        },
        loginUser() {
            this.$store.dispatch('loginUser', {email: this.loginEmail, password: this.loginPassword})
            this.$router.push('/')
        }
    },
    data() {
        return {
            nickname: "",
            email: "",
            password: "",
            confirmPassword: "",
            loginEmail: "",
            loginPassword: ""
        }
    }
}
</script>
<style scoped>
h2 {
    margin: .5rem 0 1rem 0;
    text-align: left;
    color: gray;
    font-family: 'Roboto Slab', Helvetica, sans-serif;
    font-weight: 100;
}

#div-auth {
    padding: 1rem 2rem;
    display: flex;
    justify-content: center;
}

#auth-forms {
    margin-top: 1rem;
    padding: 0.5rem 1rem 1rem 1rem;
    box-shadow: 0 0 4px #aaa inset;
    border-radius: 5px;
    background-color: rgb(250, 250, 250);
}

.input-text {
    max-width: 14rem;
}

.custom-button {
    max-width: 14rem;
}

.small-hint{
    color: gray;
    text-align: left;
    font-size: 70%;
    margin-top: 0.25rem;
}
</style>