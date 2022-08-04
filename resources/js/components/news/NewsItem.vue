<template>
    <div class="news-item" v-if="newsItem">
        <h2>
            <router-link :to="{name: 'news-item', params: {id: newsItem.id}}">
                {{ newsItem.title }}
            </router-link>
        </h2>
        <p>
            {{ newsItem.description }}
        </p>
        <p>
            rating {{ newsItem.rating }}
        </p>
        <button @click="incRating">+</button>
        <button @click="decRating">-</button>
        <button @click="remove">remove</button>
    </div>
</template>

<script>
export default {
    name: "NewsItem",
    emits: ['remove'],
    props: {
        newsItem: {
            type: Object,
            default: {}
        },
    },
    methods: {
        incRating() {
            this.newsItem.rating ++;
        },
        decRating() {
            this.newsItem.rating --;
        },
        remove() {
            this.$emit('remove', this.newsItem);
        }
    },
}
</script>

<style lang="scss" scoped>
.news-item {
    width: 100%;
    border: 1px solid #000;
}
</style>