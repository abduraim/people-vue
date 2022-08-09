<template>
    <div class="news-item" v-if="newsItem" :class="ratingChangingClass">
        <div class="rating news-item__rating">
            <div class="rating__text">
                Рейтинг:
            </div>
            <button class="rating__btn rating__btn_type_decrease" @click="changeRating(-1)">-</button>
            <div class="rating__value">
                {{ newsItem.rating }}
            </div>
            <button class="rating__btn rating__btn_type_increase" @click="changeRating(1)">+</button>
        </div>

        <h2 class="news-item__title">
            <router-link :to="{name: 'news-item', params: {id: newsItem.id}}" class="news-item__title_link">
                {{ newsItem.title }}
            </router-link>
        </h2>

        <div class="news-item__description">
            {{ newsItem.slug }}
        </div>

        <button class="news-item__remove-btn" @click="remove" title="Удалить новость">✕</button>
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
    data() {
        return {
            ratingChangingClass: '',
        }
    },
    methods: {
        changeRating(value = 1) {
            this.newsItem.rating += value;

            this.ratingChangingClass = value > 0
                ? 'increase'
                : 'decrease';

            setTimeout(() => {
                this.ratingChangingClass = '';
            }, 300);
        },
        remove() {
            this.$emit('remove', this.newsItem);
        }
    },
}
</script>

<style lang="scss" scoped>
@import "resources/scss/variables";

$borderSize: 2px;
$increaseColor: $successColor;
$decreaseColor: $dangerColor;

.news-item {
    width: 100%;
    border: $borderSize solid #000;
    border-radius: 1rem;
    animation-duration: .3s;
    padding: 2rem;
    position: relative;

    &__title {
        margin: 0 0 1rem;
        &_link {
            color: $mainColor;
        }
    }

    &__rating {
        margin-bottom: 1rem;
    }
    .rating {
        display: flex;
        align-items: center;
        &__text {
            margin-right: 1rem;
        }
        &__value {
            text-align: center;
            min-width: 2rem;
            padding: 0 .3rem;
        }
        &__btn {
            border: none;
            background-color: transparent;
            cursor: pointer;
            font-size: 1.5rem;
            display: inline-flex;
            width: 2rem;
            height: 2rem;
            justify-content: center;
            align-items: center;
            transition: background-color ease .2s;
            &_type {
                &_increase {
                    color: $increaseColor
                }
                &_decrease {
                    color: $decreaseColor
                }
            }
            &:hover {
                background-color: lightgrey;
            }
        }
    }

    &__description {

    }

    &__remove-btn {
        position: absolute;
        right: 1rem;
        top: 1rem;
        cursor: pointer;
        border: none;
        background-color: transparent;
        font-size: 2rem;
        transition: color ease .2s;
        &:hover {
            color: red;
        }
    }

    &.increase {
        animation-name: increase;
    }
    &.decrease {
        animation-name: decrease;
    }
}
@keyframes increase {
    0% {
        border: $borderSize solid $increaseColor;
        background-color: $increaseColor;
    }
}
@keyframes decrease {
    0% {
        border: $borderSize solid $decreaseColor;
        background-color: $decreaseColor;
    }
}
</style>