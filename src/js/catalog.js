const item = {
    props: ['item'],
    template:   `<div class="item">
                    <img :src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fplaceholder&psig=AOvVaw3rDIYWHB8mjA2-5L8WEovJ&ust=1619000372270000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNj0nuTMjPACFQAAAAAdAAAAABAD" alt="" class="item__image">
                    <h4 class="item__title">{{ item.name }}</h4>
                    <p class="item__price"></p>
                    <button class="item__btn buy"></button>
                </div>`
}

const items = {
    data() {
        return {
            catalog: '../db/catalog.json',
            items: []
        }
    },
    components: {
        item
    },
    methods: {
        getCatalog() {
            this.$parent.getJson(this.data.catalog)
            .then(data => console.log(data))
        }
    },
    mounted() {
        this.$parent.getJson(this.$data.catalog)
            .then(data => console.log(data))
    }
    

}
export default items