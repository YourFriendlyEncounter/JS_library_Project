<template>
    <article v-if="!isLoadingFullArticle">
        <div id="full-article-image" 
        :style="{ backgroundImage: 'url(' + articleImage + ')' }" class="article-full-image">
            <h1>{{ article.title }}</h1>
            <h6>{{ article.desc }}</h6>
        </div>
        <ArticleText :text="article.text" />
    </article>
    <Loading v-else />
</template>

<script>
import ArticleText from '../components/ArticleText'
import Loading from '../components/Loading'

export default {
    components: {
        Loading,
        ArticleText
    },
    data() {
        return {
            article: { title: "", text: ""},
            articleImage: ""
        }
    },
    computed: {
        isLoadingFullArticle() {
            return this.$store.getters.isLoadingFullArticle
        }
    },
    props: {
        id: String,
        field: String
    },
    async created() {
        this.article = await this.$store.dispatch('loadSingleArticle', { field: this.field, id: this.id })
        await this.$store.dispatch('getImageDownloadURL', 
        { 
            division: "articlePreviews", 
            field: this.field, 
            id: this.id 
        }).then((URL) => {
            this.articleImage = URL.downloadURL
        })
    }
}
</script>

<style scoped>
.article-full-image {
    width: 100%;
    height: 35vw;
    background-size: cover;
    color: white;
    font-size: 2vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: 'Roboto Slab';
    text-shadow: 1px 1px 2px black;
}

p {
    padding: 0.5rem 1rem;   
    text-align: justify;
    font-size: 140%;
}
</style>