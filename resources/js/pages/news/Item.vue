<template>
    <div class="news-item" v-if="newsItem">
        <router-link :to="{name: 'news-list'}" class="news-item__back-link">&larr; Назад к списку новостей</router-link>
        <h2 class="news-item__title">{{ newsItem.title }}</h2>
        <p class="news-item__slug">{{ newsItem.slug }}</p>
    </div>
</template>

<script>
import {onMounted} from "vue";
import {useRoute} from 'vue-router'
import {useFetchNews} from "../../composables/useFetchNews";

export default {
    name: "Item",
    setup() {
        const route = useRoute();
        const {fetchNewsItem, newsItem} = useFetchNews();

        onMounted(() => {
            fetchNewsItem({id: route.params.id})
        })

        return {newsItem}
    }
}
</script>

<style lang="scss" scoped>
@import "resources/scss/variables";

.news-item {
    &__back-link {
        color: $mainColor;
        text-decoration: none;
    }

    &__title {

    }

    &__slug {

    }
}
</style>