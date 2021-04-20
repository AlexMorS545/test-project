import cart from './cart'
import items from './catalog'
import goods from '../db/items'

const app = new Vue({
    el: '#app',
    components: {
        cart,
        items
    },
    data: {
        title: 'Каталог',
        basketTitle: 'Корзина',
        catalog: '../db/catalog.json',
        items: goods
    },
    methods: {
        getJson(url) {
            return fetch(url)
                        .then(result => result.json())
                        .catch(error => console.log(error))
        }
    }
})
