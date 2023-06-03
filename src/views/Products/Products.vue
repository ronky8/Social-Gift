<template>
    <Layout activeState="products">
        <div class="container">
            <h1>Products</h1>
            <div class="gallery">
                <SearchBar v-model="searchText" />
                <div class="newProduct" style="text-align: center;" @click="goToNewView">+<br />New Product</div>
                <ProductBlock v-for="product in products" :key="product.id" :gift="product" :owner="false">{{ product.name
                }}</ProductBlock>
            </div>
        </div>
    </Layout>
</template>

<script>
import axios from 'axios';
import Layout from '../../layouts/layout.vue';
import { getAllProducts, searchProducts } from '../../apis';
import SearchBar from '../../components/SearchBar.vue';
import ProductBlock from '../../components/ProductBlock.vue';

export default {
    async created() {
        await this.getProducts();
    },
    data() {
        return {
            searchText: "",
            products: []
        };
    },
    methods: {
        async getProducts() {
            const productsReq = await axios.get(getAllProducts);
            this.products = productsReq.data;
        },
        goToNewView(){
            this.$router.push('/products/new')
        },

    },watch: {
        async searchText() {
            const req = await axios.get(searchProducts,
            {
                params: { s: this.searchText },
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('token')
                }
            });

            this.products = req.data;
        }
    },
    components: { Layout, SearchBar, ProductBlock }
}
</script>

<style>
@import './products.css';
</style>