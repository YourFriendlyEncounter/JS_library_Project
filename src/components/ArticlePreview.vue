<template>
    <div :class="{ 'article-outside': !noAnimations, 'margin-new-post': noAnimations }">
        <article class="article-preview" @click="showArticle">
            <div class="article-image-wrapper" :data-index="dataIndex">
                <div class="article-readmore-onhover" :data-index="dataIndex">
                    <h2 :data-index="dataIndex">Читать далее...</h2>
                </div>
                <img :data-index="dataIndex" :src="article.image" class="preview-image">
            </div>
            <div class="article-textdata">
                <div class="article-main-info">
                    <h2 class="article-title"> {{ article.title }} </h2>
                    <p class="article-text"> {{ article.desc }} </p>
                </div>
                <div class="article-bottom-info">
                    <button class="custom-button" :data-index="dataIndex">Подробнее...</button>
                    <div>
                        <p class="article-publish-date"> {{ getAuthor(article.author).nickname }} </p>
                        <p class="article-publish-date"> {{ getDate }} </p>
                    </div>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
export default {
    computed: {
        getDate() {
            const date = new Date(this.article.dateTimeAdded)

            let day = date.getDate();
            if (day < 10) {day = "0"+day;}

            let month = date.getMonth() + 1;
            if (month < 10) {month = "0"+month;}

            let hours = date.getHours();
            if (hours < 10) {hours = "0"+hours;}

            let minutes = date.getMinutes();
            if (minutes < 10) {minutes = "0"+minutes;}

            return day + "." 
                 + month + "."
                 + date.getFullYear() + " "
                 + hours + ":"
                 + minutes
        },
    },
    methods: {
        getAuthor(id) {
            const author = this.$store.getters.getUserList.filter(u => u.id == id)[0];
            if(author)
                return author;
            else return { nickname: "Загрузка..." }
        },
        showArticle() {
            //if(!this.noAnimations) 
            //    this.$router.push({ name: 'FullArticle', params: { field: this.article.field, id: this.article.id } })
        }
    },
    async beforeMount() {
        const author = this.getAuthor(this.article.author)
        this.author = author
    },
    props: {
        article: Object,
        noAnimations: Boolean,
        dataIndex: Number
    },
    data() {
        return {
            
        }
    }
}
</script>

<style scoped>
@keyframes appear {
  0% {
    opacity: 0;
    padding-top: 1rem;
    padding-bottom: -0.5rem;
  }
  100% {
    opacity: 1;
    padding-top: 0.5rem;
    padding-bottom: 0rem;
  }
}

.article-readmore-onhover {
    opacity: 0;
    transition: opacity .2s;
    position: relative;
    height: 9rem;
    margin-bottom: -9rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    background: rgba(0, 0, 0, 0.4);
    font-family:'Roboto Slab', serif;
    text-shadow: 2px 2px 4px black;
}

.article-preview:hover .article-readmore-onhover {
    opacity: 1;
    transition: opacity .2s;
}

.article-outside{
    height: 21rem;
    padding-top: 0.5rem;
    padding-bottom: 0rem;
    animation: .5s ease-out 0s 1 appear;
    transition: padding .2s;
    cursor: pointer;
    margin: 0.5rem;
}

.margin-new-post {
    margin-left: 0.5rem;
}

.article-outside:hover{
    padding-top: 0rem;
    padding-bottom: 0.5rem;
    transition: padding .2s;
    z-index: 99999;
}
</style>