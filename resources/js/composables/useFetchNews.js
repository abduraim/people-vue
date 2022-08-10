import {ref, getCurrentInstance} from 'vue'

export function useFetchNews() {
    const internalInstance = getCurrentInstance();
    
    const newsList = ref([]);                   // Список новостей
    const newsItem = ref(null);                 // Определенная новость
    const error = ref(null);                    // Ошибка
    const isLoading = ref(true);                // Флаг загрузки
    
    /**
     * Загрузка списка новостей
     * @param payload
     * @returns {Promise<void>}
     */
    async function fetchNews(payload) {
        isLoading.value = true;
        
        await fakeDelay();
        
        newsList.value = [...newsList.value, ...getFakeNews(payload.page)];
        
        isLoading.value = false;
    }
    
    /**
     * Загрузка определенной новости
     * @param {Object} payload
     * @returns {Promise<{data: {rating: number, id, title: string, slug: string}}>}
     */
    async function fetchNewsItem(payload) {
        newsItem.value = getFakeNewsItem(payload.id);
    }
    
    /**
     * Удаление новости
     * @param {Number} newsItemId
     */
    function removeNewsItem(newsItemId) {
        newsList.value = newsList.value.filter(currentNewsItem => {
            return currentNewsItem.id !== newsItemId;
        })
    }
    
    /**
     * Генерация списка фейковых новостей
     * @param {Number} page
     * @returns {*[]}
     */
    function getFakeNews(page) {
        let perPage = internalInstance.root.data.perPage;
        let to = page * perPage;
        let from = (page - 1) * perPage + 1;
        
        let news = [];
        for (let index = from; index <= to; index++) {
            news.push(getFakeNewsItem(index))
        }
        return news;
    }
    
    /**
     * Генерация одной фейковой новости
     * @param { Number } index
     * @returns {{rating: number, id, title: string, slug: string}}
     */
    function getFakeNewsItem(index) {
        return {
            id: index,
            title: `title ${index}`,
            rating: Math.floor(Math.random() * 5),
            slug: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur corporis cum necessitatibus nihil obcaecati, officiis perferendis rerum? Adipisci asperiores cumque debitis libero nisi non obcaecati pariatur, rerum temporibus unde veritatis?`,
        }
    }
    
    /**
     * Фейковая задержка загрузки
     * @returns {Promise<unknown>}
     */
    function fakeDelay() {
        return new Promise(resolve => setTimeout(resolve, internalInstance.root.data.refreshDelay * 1000));
    }
    
    return {
        removeNewsItem,
        fetchNews,
        fetchNewsItem,
        isLoading,
        newsList,
        newsItem,
        error,
    }
}