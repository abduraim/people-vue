<template>
    <div class="news-item" v-if="newsItem">
        <router-link :to="{name: 'news-list'}" class="news-item__back-link">Назад к списку новостей</router-link>
        <h2 class="news-item__title">{{ newsItem.title }}</h2>
        <p class="news-item__slug">{{ newsItem.slug }}</p>
    </div>
</template>

<script>
import { useFetchNews} from "../../composables/useFetchNews";
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router'

export default {
    name: "Item",
    setup() {
        const route = useRoute();
        const { fetchNewsItem } = useFetchNews();

        const newsItem = ref(null);

        onMounted(() => {
            fetchNewsItem({id: route.params.id})
                .then(response => {
                    newsItem.value = response.data;
                    console.log(newsItem.value.title)
                });
        })

        return { newsItem }
    }
}
</script>

<style lang="scss" scoped>
    .news-item {
        &__back-link {

        }
        &__title {

        }
        &__slug {

        }
    }
</style>