import catalog from '../db/items'
import axios from 'axios'

const app = new Vue({
    el: '#app',
    data() {
        return {
            title: 'Catalog',
            basketTitle: 'Basket',
            items: [],
            basket: [],
            summa: 0,
            info: null
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
            this.totalSumma()
            this.saveCart()
        },
        removeItem(item) {
            this.basket.splice(this.basket.indexOf(item), 1)
            this.totalSumma()
            this.saveCart()
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
            this.saveCart()
        },
        totalSumma() {
            this.summa = this.basket.reduce((s, item) => s += (item.count * item.price), 0)
            localStorage.setItem('summa', this.summa)
        },
        saveCart() {
            localStorage.setItem('cartItems', JSON.stringify(this.basket)) 
        }
    },
    mounted() {
        catalog.forEach(item => {
            this.items.push(item)
        })
        if(localStorage.getItem('cartItems') && localStorage.getItem('summa')) {
            try {
                this.basket = JSON.parse(localStorage.getItem('cartItems'))
                this.summa = localStorage.getItem('summa')
            } catch(e) {
                localStorage.removeItem('cartItems')
                localStorage.removeItem('summa')
            }
        }
        axios
            .get('https://api.bincodes.com/bin/json/9fc53b3db09ca830488d19546a4fc2a1/515735/')
            .then(response => {
                this.info = response.data
                console.log(this.info);
            })
            .catch(error => console.log('error', error))
    }

})
