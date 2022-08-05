<template>
    <h2>Настройки</h2>

    <BaseInput label="Кол-во новостей" v-model="$root.newsCount" type="number" />
    <BaseInput label="Задержка обновления (сек.)" v-model="$root.refreshDelay" type="number" />
</template>

<script>
export default {
    name: "Settings",
    components: {},


}
</script>

<style scoped>

</style>