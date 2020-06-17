<template>
    <div class="article-previews">
        <h2>Лучшие статьи:</h2>
        <div class="article-previews-wrapper" v-if="!isLoadingArticles">
            <Swiper 
            id="carousel-wrapper"
            style="width: 95%;" 
            :options="swiperOptions"
            @click="sliderClicked"
            >
                <SwiperSlide   
                style="display: flex; justify-content: center;"
                v-for="(article, index) in getBestArticles" 
                :key="`${index}`" :data-index="index">
                    <ArticlePreview :article="article" :dataIndex="index" />
                </SwiperSlide>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
            </Swiper>
        </div>
        <p class="small-warning">Перелистывайте статьи нажатием и удерживанием левой кнопки мыши</p>
        <h2>Статьи за всё время:</h2>
        <div class="article-previews-wrapper" v-if="!isLoadingArticles">
            <Swiper 
            id="carousel-wrapper"
            style="width: 95%;" 
            :options="swiperOptions"
            @click="sliderClicked2"
            >
                <SwiperSlide   
                style="display: flex; justify-content: center;"
                v-for="(article, index) in getLoadedArticles" 
                :key="`${index}`" :data-index="index">
                    <ArticlePreview :article="article" :dataIndex="index" />
                </SwiperSlide>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
            </Swiper>
        </div>
        <Loading v-else />
    </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

import ArticlePreview from './ArticlePreview'
import Loading from './Loading'

export default {
    components: {
        ArticlePreview,
        Loading,
        Swiper,
        SwiperSlide
    },
    directives: {
        swiper: directive
    },
    methods: {
        showArticle(article) {
            this.$router.push({ name: 'FullArticle', params: { field: article.field, id: article.id } })
        },
        sliderClicked(e) {
            const index = e.target.getAttribute('data-index');
            if(index)
                this.showArticle(this.getBestArticles[index]);
        },
        sliderClicked2(e) {
            const index = e.target.getAttribute('data-index');
            if(index)
                this.showArticle(this.getLoadedArticles[index]);
        }
    },
    computed: {
        getLoadedArticles() {
            return this.$store.getters.getLoadedArticles.filter(a => a.field === this.field).sort((a, b) => b.dateTimeAdded - a.dateTimeAdded)
        },
        getBestArticles() {
            return this.$store.getters.getLoadedArticles.filter(a => a.field === this.field).sort((a, b) => (a.views - b.views))
        },
        isLoadingArticles() {
            return this.$store.getters.isLoadingArticles
        }
    },
    props: {
        field: String,
        tags: Array,
    },
    data() {
        return {
            page: 0,
            itemsPerPage: 10,
            swiperOptions: {
                pagination: {
                    el: '.swiper-pagination',
                    dynamicBullets: true
                },
                slidesPerView: 3,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1
                    },
                    1200: {
                        slidesPerView: 2
                    },
                    1500: {
                        slidesPerView: 3
                    }
                }
                // Some Swiper option/callback...
            }
        }
    },
    async created() {
        await this.$store.dispatch('loadArticles', { field: this.field, page: this.page, itemsPerPage: this.itemsPerPage });
    },
}
</script>

<style scoped>
h2, .small-warning {
    margin: 1rem 0 0 1rem;
    font-family:'Roboto Slab', serif;
}

.article-previews {
    text-align: left;
}

.small-warning {
    color: gray;
    font-size: 80%;
    text-align: center;
    margin: 0;
}

.article-previews-wrapper {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 0 1rem 1rem 1rem;
}
</style>