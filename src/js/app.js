import catalog from '../db/catalog'
import images from '../db/images'
import axios from 'axios'
import mask from 'vue-the-mask'

const app = new Vue({
    el: '#app',
    data() {
        return {
            title: 'Catalog',
            basketTitle: 'Basket',
            items: [],
            basket: [],
            images: [],
            imageSrc: '',
            summa: 0,
            info: null,
            count: 0,
            cardNumber: '',
            cardHolder: '',
            cardExpires: '',
            cardCVV: ''
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
            this.getCount()
        },
        removeItem(item) {
            this.basket.splice(this.basket.indexOf(item), 1)
            this.totalSumma()
            this.saveCart()
            this.getCount()
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
            this.getCount()
        },
        totalSumma() {
            this.summa = this.basket.reduce((s, item) => s += (item.count * item.price), 0)
            localStorage.setItem('summa', this.summa)
        },
        saveCart() {
            localStorage.setItem('cartItems', JSON.stringify(this.basket)) 
        },
        getCount() {
            this.count = this.basket.reduce((c, item) => c += item.count, 0)
            localStorage.setItem('summa', this.summa)
        },
    //     changeImage(img) {
    //         let imageID = +this.cardNumber.charAt(0)
    //         this.images.forEach(img => {
    //             if(imageID === img.id && imageID !== 0) {
    //                 this.imageSrc = img.src
    //                 console.log('src', this.imageSrc)
    //             }
    //         })
    //     }         
    },
    mounted() {
        catalog.forEach(item => this.items.push(item))

        if(localStorage.getItem('cartItems') && localStorage.getItem('summa')) {
            try {
                this.basket = JSON.parse(localStorage.getItem('cartItems'))
                this.summa = localStorage.getItem('summa')
            } catch(e) {
                localStorage.removeItem('cartItems')
                localStorage.removeItem('summa')
            }
        }

        images.forEach(img => this.images.push(img))
    }

})
