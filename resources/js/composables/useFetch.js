// fetch.js
import { ref } from 'vue'
import { getCurrentInstance } from 'vue'

export function useFetch() {
    const data = ref(null)
    const error = ref(null)
    const isLoading = ref(true)
    
    const test = ref(0)
    
    const internalInstance = getCurrentInstance();
    
    function doFetch(payload) {
        // reset state before fetching..
        isLoading.value = true;
        data.value = null;
        error.value = null;
    
    
        setTimeout(() => {
    
    
            let news = [];
            for (let i = 1; i <= payload.newsCount; i++) {
                test.value += 1;
                news.push({
                    id: test.value,
                    // id: uniqueId(),
                    title: `title ${test.value}`,
                    rating: Math.floor(Math.random() * 5),
                    description: `description ${test.value}`,
                    text: `text ${test.value}`
                })
            }
            
            data.value = news;
            isLoading.value = false;
        }, internalInstance.root.data.refreshDelay * 1000);
        
    }
    
    return { data, error, isLoading, doFetch }
}