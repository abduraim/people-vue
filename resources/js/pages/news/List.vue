<template>
    <div class="news">
        <h3 class="news__title">Последние новости</h3>

        <transition-group name="list-complete" tag="div" class="news__list" :class="{loading:isLoading}">
            <template v-for="newsItem in newsList" :key="newsItem">
                <NewsItem class="news__item" :newsItem="newsItem" @remove="removeNewsItem(newsItem.id)" />
            </template>
        </transition-group>
    </div>
</template>

<script>
import NewsItem from "../../components/news/NewsItem.vue";
import { useEventListener } from "../../composables/event";
import { useFetchNews } from "../../composables/useFetchNews";
import { ref, onMounted } from 'vue'

export default {
    name: "List",
    components: {
        NewsItem,
    },
    setup() {
        const { newsList, fetchNews, isLoading, removeNewsItem } = useFetchNews()

        const page = ref(1);
        const bottomScrollOffset = 50;

        useEventListener(window, 'scroll', () => {
            let isBottom = document.documentElement.scrollTop + window.innerHeight >=
                document.documentElement.offsetHeight - bottomScrollOffset;

            if (isBottom && !isLoading.value) {
                page.value += 1;
                fetchNews({page: page.value})
            }
        });

        onMounted(() => {
            fetchNews({page: page.value});
        })

        return {
            newsList, isLoading, removeNewsItem
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