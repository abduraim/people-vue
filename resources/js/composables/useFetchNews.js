import { ref } from 'vue'
import { getCurrentInstance } from 'vue'

export function useFetchNews() {
    const isLoading = ref(true)
    const counter = ref(0);
    
    const internalInstance = getCurrentInstance();
    
    // Fetch News
    async function fetchNews(payload) {
        
        isLoading.value = true;
        await timeout(internalInstance.root.data.refreshDelay * 1000);
    
        let news = [];
        for (let i = 1; i <= payload.newsCount; i++) {
            counter.value += 1;
            news.push({
                id: counter.value,
                title: `title ${counter.value}`,
                rating: Math.floor(Math.random() * 5),
                slug: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur corporis cum necessitatibus nihil obcaecati, officiis perferendis rerum? Adipisci asperiores cumque debitis libero nisi non obcaecati pariatur, rerum temporibus unde veritatis? ${counter.value}`,
            })
        }
        isLoading.value = false;
        
        return {
            data: news
        };
    }
    
    async function fetchNewsItem(payload) {
        return {
            data: {
                id: payload.id,
                title: `title ${payload.id}`,
                rating: Math.floor(Math.random() * 5),
                slug: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur corporis cum necessitatibus nihil obcaecati, officiis perferendis rerum? Adipisci asperiores cumque debitis libero nisi non obcaecati pariatur, rerum temporibus unde veritatis? ${counter.value}`,
            }
        };
    }
    
    // Fake refresh
    function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    return { fetchNews, fetchNewsItem, isLoading }
}