<template>
    <div class="new-article">
        <div id="new-article-writing">
            <form class="form-generic" @submit.prevent="publishArticle"> 
                <input type="text" class="input-text" placeholder="Заголовок статьи" minlength="3" v-model="title">
                <input type="text" class="input-text" placeholder="Краткое описание" v-model="desc">
                <div id="html-panel">
                    <p>Форматирование: </p>
                    <button v-text="'Ж'" @click.prevent="addStyle('b')" style="font-weight: bold;"></button>
                    <button v-text="'К'" @click.prevent="addStyle('em')" style="font-style: oblique;"></button>
                    <button v-text="'Ч'" @click.prevent="addStyle('u')" style="text-decoration: underline;"></button>
                    <button v-text="'h1'" @click.prevent="addStyle('h1')"></button>
                    <button v-text="'h2'" @click.prevent="addStyle('h2')"></button>
                    <button v-text="'h3'" @click.prevent="addStyle('h3')"></button>
                    <button v-text="'ul'" @click.prevent="addStyle('ul')"></button>
                    <button v-text="'li'" @click.prevent="addStyle('li')"></button>
                    <button v-text="'<='" @click.prevent="addStyle('<=')"></button>
                    <button v-text="'=>'" @click.prevent="addStyle('=>')"></button>
                </div>
                <textarea 
                id="textarea-article-text" 
                style="min-height: 5.9rem; resize: vertical;" 
                class="input-text" 
                placeholder="Текст статьи" 
                v-model="text"></textarea>
                
                <input type="text" class="input-text" placeholder="Теги (разделять запятой)" v-model="tags">
                <div class="new-article-bottom">
                    <div class="flex">
                        <h3 style="margin-right: .5rem;">Превью статьи: </h3>
                        <input class="input-file" id="file" type="file" ref="file" accept="image/jpeg,image/jpg,image/png,image/gif" @change="handleFileUpload">
                        <label class="label-file" for="file"><img src="../assets/upload.png" height="32"> Выберите файл...</label>
                    </div>
                    <input type="submit" class="green-button" value="Отправить!">
                </div>
            </form>
            <ArticlePreview :article="{title: this.title, desc: this.desc, image: this.imageLink, dateTimeAdded: new Date(), author: getAuthor }" :noAnimations="true" />
        </div>
        <h2>Предварительный просмотр</h2>
        <hr>
        <ArticleText :text="text" />
    </div>
</template>

<script>
import Message from 'vue-m-message'
import DefaultImage from '../assets/js_logo.png'
import ArticleText from '../components/ArticleText'
import ArticlePreview from '../components/ArticlePreview'

export default {
    components: {
        ArticleText,
        ArticlePreview
    },
    computed: {
        getAuthor() {
            const user = this.$store.getters.getUser
            if(user)
                return user.id
            else return null
        }
    },
    methods: {
        async publishArticle() {
            let newArticle = {
                field: this.field,
                title: this.title,
                desc: this.desc,
                text: this.text,
                tags: this.tags.split(','),
                dateTimeAdded: (new Date()).getTime(),
                author: this.$store.getters.getUser.id
            }
            if(newArticle.title.length < 3){
                Message.error('Длина заголовка должна быть больше 3 символов.')
                return;
            }
            if(!this.image){
                Message.error('Выберите превью-картинку для вашей статьи.')
                return;
            }
            newArticle = await this.$store.dispatch('newArticle', newArticle)
            await this.$store.dispatch('uploadImage', { file: this.image, division: 'articlePreviews', field: this.field, id: newArticle.id })
            this.$router.push('/')
        },
        handleFileUpload() {
            let reader = new FileReader();
            this.image = this.$refs.file.files[0];

            let thisComp = this;

            reader.readAsDataURL(this.image);
            reader.onload = function() {
                let temp = this.result
                thisComp.imageLink = temp;
            }
        },
        addStyle(sym) {
            let symStart;
            let symEnd;

            switch(sym) {
                case "b":
                    symStart = "<b>"
                    symEnd = "</b>"
                    break;
                case "em":
                    symStart = "<em>"
                    symEnd = "</em>"
                    break;
                case "u":
                    symStart = "<u>";
                    symEnd = "</u>"
                    break
                case "h1":
                    symStart = "<h1>"
                    symEnd = "</h1>"
                    break;
                case "h2":
                    symStart = "<h2>"
                    symEnd = "</h2>"
                    break;
                case "h3":
                    symStart = "<h3>"
                    symEnd = "</h3>"
                    break;
                case "ul":
                    symStart = "<ul>"
                    symEnd = "</ul>"
                    break;
                case "li":
                    symStart = "<li>"
                    symEnd = "</li>"
                    break;
                case "<=":
                    symStart = "<p class='L'>"
                    symEnd = "</p>"
                    break;
                case "=>":
                    symStart = "<p class='R'>"
                    symEnd = "</p>"
                    break;
            }

            let textarea = document.getElementById('textarea-article-text')
            let selStart = textarea.selectionStart;
            let selEnd = textarea.selectionEnd;
            this.text = this.text.slice(0, selStart) 
                        + symStart + this.text.slice(selStart, selEnd)
                        + symEnd + this.text.slice(selEnd, this.text.length)
        }
    },
    data() {
        return {
            title: "Заголовок новой статьи",
            desc: "Краткое описание новой статьи",
            text: "",
            tags: "",
            field: "mainPage",
            image: null,
            imageLink: DefaultImage
        }
    },
    created() {
        if(!this.$store.getters.checkUser) {
            Message.warning('Авторизуйтесь, чтобы добавлять статьи.')
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
#article-text {
    white-space: pre-wrap;
}

.input-file {
    visibility: collapse;
    width: 0;
}

.label-file {
    background: linear-gradient(#cd4444, #cf5757);
    color: white;
    display: flex;
    align-items: center;
    padding: 4px 8px;
    cursor: pointer;
    font: normal normal 16px "Open Sans", sans-serif;
    border: 1px solid #ccc;
}

#new-article-writing {
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
}

.new-article-bottom {
    display: flex;
    justify-content: space-between;
}

#html-panel {
    display: flex;
    margin-bottom: 1rem;
}

#html-panel button{
    margin: 0 0.25rem;
    background: linear-gradient(#f6f6f6, #e2e2e2);
    border: 1px solid #ccc;
}

form { 
    width: -webkit-fill-available;
}

.article-wrapper {
    display: flex;
    justify-content: center;  
    width: 16rem;
    margin-left: 1rem;
}

.input-text {
    margin-bottom: 1rem;
}

span {
    width: 100%;
}

.green-button {
    background:    linear-gradient(#15d762, #79de8b);
    border: 1px solid #ccc;
    padding:       4px 12px;
    color:         #ffffff;
    display:       inline-block;
    font: normal normal 16px "Open Sans", sans-serif;
    text-align:    center;
}
</style>