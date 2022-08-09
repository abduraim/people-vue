<template>
    <div class="news">
        <h3 class="news__title">Последние новости</h3>
        <transition-group name="list-complete" tag="div" class="news__list" :class="{loading:isLoading}">
            <template v-for="newsItem in news" :key="newsItem">
                <NewsItem class="news__item" :newsItem="newsItem" @remove="remove" />
            </template>
        </transition-group>
    </div>
</template>

<script>
import { useEventListener } from "../../composables/event";
import { useFetchNews } from "../../composables/useFetchNews";
import { ref, onMounted, getCurrentInstance } from 'vue'

export default {
    name: "List",
    setup() {
        const internalInstance = getCurrentInstance();
        const { fetchNews, isLoading } = useFetchNews()

        const news = ref([]);
        const bottomScrollOffset = 50;

        useEventListener(window, 'scroll', () => {
            let isBottom = document.documentElement.scrollTop + window.innerHeight >=
                document.documentElement.offsetHeight - bottomScrollOffset;

            if (isBottom && !isLoading.value) {
                fetchNews({newsCount: 3})
                    .then(response => {
                        news.value = [...news.value, ...response.data];
                })
            }
        });

        /**
         * Remove NewsItem
         * @param {Object} newsItem Новость
         */
        function remove(newsItem) {
            news.value = news.value.filter(currentNewsItem => {
                return currentNewsItem !== newsItem;
            })
        }

        onMounted(() => {
            fetchNews({newsCount: internalInstance.root.data.newsCount})
                .then(response => {
                    news.value = [...news.value, ...response.data];
                });
        })

        return {
            news, isLoading, remove
        }
    },
}
</script>

<style lang="scss" scoped>
.news {
    &__title {

    }
    &__list {
        position: relative;
        min-height: 50vh;
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