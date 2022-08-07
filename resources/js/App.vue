<template>
    <div class="wrapper">
        <h1 class="app__title">4people Тестовое задание Фронтенд</h1>
    </div>

    <div class="wrapper">
        <nav class="app__nav">
            <ul class="navigation">
                <li class="navigation__item">
                    <router-link class="navigation__link" :to="{name: 'index'}">Главная</router-link>
                </li>
                <li class="navigation__item">
                    <router-link class="navigation__link" :to="{name: 'news-list'}">Новости</router-link>
                </li>
                <li class="navigation__item">
                    <router-link class="navigation__link" :to="{name: 'settings'}">Настройки</router-link>
                </li>
            </ul>
        </nav>
    </div>

    <div class="wrapper">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            newsCount: 2,       // Кол-во выводимых новостей на страницу
            refreshDelay: 2,    // Задержка обновления в секундах
        }
    },
}
</script>

<style lang="scss" scoped>
.app {
    &__title {
        text-align: center;
    }
    &__nav {
        .navigation {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            &__item {
                margin-right: 2rem;
            }
            &__link {
                text-decoration: none;
                color: blue;
                &:hover {
                    text-decoration: underline;
                }
                &.router-link-active {
                    color: black;
                }
            }
        }
    }
}
</style>