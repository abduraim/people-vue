<template>
    <h2>News list</h2>

    <div class="input-block">
        <label for="news-count">Кол-во новостей</label>
        <input id="news-count" type="number" step="1" min="1" v-model="newsCount">
    </div>

    <div class="input-block">
        <label for="refresh-delay">Задержка обновления (сек.)</label>
        <input id="refresh-delay" type="number" step="1" min="1" v-model="refreshDelay">
    </div>

    <div class="wrapper">
        <transition-group name="list-complete" tag="div" class="news">
            <template v-for="newsItem in news" :key="newsItem.id">
                <NewsItem class="news__item" :newsItem="newsItem" @remove="test" />
            </template>
        </transition-group>
    </div>


</template>

<script>
export default {
    name: "List",
    data() {
        return {
            newsCount: 5,
            refreshDelay: 5,
            news: [],
        }
    },
    methods: {
        test(newsItem) {
            this.news = this.news.filter(currentNewsItem => {
                return currentNewsItem !== newsItem;
            })
        },
        fetchNews(countToLoad = 3) {
            let news = [];
            for (let i = 1; i < countToLoad; i++) {
                news.push({
                    id: i,
                    title: `title ${i}`,
                    rating: Math.floor(Math.random() * 5),
                    description: `description ${i}`,
                    text: `text ${i}`
                })
            }
            return news;
        },
        initScroll() {
            let self = this;
            document.addEventListener('scroll', function () {
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
                if (bottomOfWindow) {
                    self.news = [...self.news, ...self.fetchNews(3)];
                }
            })
        },
    },
    mounted() {
        this.news = this.fetchNews(this.newsCount);
        this.initScroll();
    }
}
</script>

<style lang="scss" scoped>
.news {

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