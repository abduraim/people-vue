<template>
    <h1>App</h1>



    <nav>
        <ul>
            <li><router-link :to="{name: 'news-list'}">news</router-link></li>
        </ul>
    </nav>

    <router-view></router-view>
</template>

<script>
export default {
    name: "App",
}
</script>

<style lang="scss" scoped>

</style>