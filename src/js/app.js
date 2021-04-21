import catalog from '../db/items'

const app = new Vue({
    el: '#app',
    data() {
        return {
            title: 'Catalog',
            basketTitle: 'Basket',
            items: [],
            basket: [],
            cart: [],
            summa: 0
        }
    },
    methods: {
        addToBasket(item) {
            let find = this.basket.find(el => el.id === item.id)
            if(find) {
                this.basket.forEach(elem => {
                   if(elem.id === item.id) {
                        elem.count++
                   }
                })
            } else {
                const el = Object.assign({count:1}, item)
                this.basket.push(el)
            }
            localStorage.setItem('cartItems', JSON.stringify(this.basket))
            this.totalSumma()
            this.renderCart()
        },
        removeItem(item) {
            this.basket.splice(this.basket.indexOf(item), 1)
            this.totalSumma()
        },
        removeFromBasket(item) {
            this.basket.forEach(elem => {
                if(elem.id === item.id) {
                    if(elem.count > 1) {
                        elem.count--
                    } else {
                        this.removeItem()
                    }
                }
            })
            this.totalSumma()
        },
        totalSumma() {
            this.summa = this.basket.reduce((s, item) => s += (item.count * item.price), 0)
        },
        renderCart() {
            this.cart = localStorage.getItem('cartItems') 
            console.log('local ', JSON.parse(this.cart))
        }
    },
    mounted() {
        catalog.forEach(item => {
            this.items.push(item)
        })
    },
    computed: {
    }

})
