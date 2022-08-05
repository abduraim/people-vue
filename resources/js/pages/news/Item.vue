<template>
    <h3>Новость {{ $route.params.id }}</h3>
    <router-link :to="{name: 'news-list'}">Назад к списку новостей</router-link>
</template>

<script>
export default {
    name: "Item",
}
</script>

<style scoped>

</style>