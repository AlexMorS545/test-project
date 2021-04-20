import catalog from '../db/items'

const app = new Vue({
    el: '#app',
    data() {
        return {
            title: 'Каталог',
            basketTitle: 'Корзина',
            items: [],
            cartItems: []
        }
    },
    methods: {
        addToBasket(item) {
            this.cartItems.push(item)
            console.log(this.cartItems);
        }
    },
    mounted() {
        catalog.forEach(item => {
            this.items.push(item)
        })
    }

})
