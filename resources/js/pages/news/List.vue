<template>
    <div class="news">
        <h3 class="news__title">Последние новости</h3>
        <transition-group name="list-complete" tag="div" class="news__list" :class="{loading:isLoading}">
            <template v-for="(newsItem, index) in news" :key="index">
                <NewsItem class="news__item" :newsItem="newsItem" @remove="remove" />
            </template>
        </transition-group>
    </div>
</template>

<script>
import { useEventListener } from "../../composables/event";
import { useFetch } from "../../composables/useFetch";
import { ref, onMounted, watchEffect } from 'vue'

export default {
    name: "List",
    data() {
        return {
            loading: false,
            // news: [],
        }
    },
    methods: {
        removeNewsItem(newsItem) {
            this.news = this.news.filter(currentNewsItem => {
                return currentNewsItem !== newsItem;
            })
        },
        fetchNews(countToLoad = 3) {
            let news = [];
            for (let i = 1; i <= countToLoad; i++) {
                news.push({
                    id: i,
                    title: `title ${i}`,
                    rating: Math.floor(Math.random() * 5),
                    description: `description ${i}`,
                    text: `text ${i}`
                })
            }
            return news;
        },
        initScroll() {
            let self = this;
            document.addEventListener('scroll', function () {
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
                if (bottomOfWindow) {
                    self.news = [...self.news, ...self.fetchNews(3)];
                }
            })
        },
    },
    setup() {
        const isBottom = ref(false);
        const news = ref([]);



        const { data, error, isLoading, doFetch } = useFetch()


        useEventListener(window, 'scroll', () => {
            isBottom.value = document.documentElement.scrollTop + window.innerHeight ===
                document.documentElement.offsetHeight;

            if (isBottom.value && !isLoading.value) {
                doFetch({newsCount: 3});
            }

        });

        onMounted(() => {
            doFetch({newsCount: 5});
        })

        // news.value = data.value;

        watchEffect(() => {
            if (data.value) {
                news.value = news.value.concat(data.value);
                console.log(news.value);
            }
        });

        function remove(newsItem) {
            news.value = news.value.filter(currentNewsItem => {
                return currentNewsItem !== newsItem;
            })
        }

        return {
            news, data, error, isLoading, remove
        }
    },
    mounted() {
        // this.news = this.fetchNews(this.$root.newsCount);
        // this.initScroll();
    }
}
</script>

<style lang="scss" scoped>
.news {
    &__title {

    }
    &__list {
        position: relative;
    }
    &__item {
        transition: all .8s ease;
        margin-bottom: 1rem;
        &:last-child {
            margin-bottom: 0;
        }
    }
}

// Список
.list-complete-enter-from,
.list-complete-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
.list-complete-leave-active {
    position: absolute;
}
</style>