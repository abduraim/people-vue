<template>
    <h2>Настройки</h2>

    <BaseInput label="Кол-во новостей" v-model="$root.perPage" type="number" :min="1" :max="20"/>
    <BaseInput label="Задержка обновления (сек.)" v-model="$root.refreshDelay" type="number" :min="0"/>
</template>

<script>
export default {
    name: "Settings",
}
</script>
