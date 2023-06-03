<template>
    <Layout activeState="wishlist">
        <div class="container">
            <input type="text" placeholder="new wishlist" class="title-wishlist" v-model="name" />
            <textarea cols="50" class="description" placeholder="description" v-model="description" />
            <div class="product-gallery">
                <ProductBlock v-for="item in gifts" :key="item.id" :gift="item" :owner="true" />
            </div>
            <button v-if="!submiting" class="addList" @click="addList"> Submit changes</button>
            <button v-else class="addListSubmiting" disabled> submiting...</button>
        </div>
    </Layout>
</template>

<script>
import axios from 'axios';
import ProductBlock from '../../components/ProductBlock.vue';
import Layout from '../../layouts/layout.vue';
import { createWishlist } from '../../apis';

export default {
    data() {
        return {
            id: "",
            name: "",
            gifts: [],
            user_id: localStorage.getItem("id"),
            description: "",
            submiting: false
        }
    },
    methods: {
        addGift() {
            this.gifts.push({ id: 4 })
        },
        async addList() {
            this.submiting = true;
            try {
                await axios.post(createWishlist,
                    { name: this.name, description: this.description, end_date: "2024-06-02T01:25:16.061Z" },
                    { headers: { Authorization: `Bearer ` + localStorage.getItem('token') } });

                
                this.$router.push('/wishlist')
            } catch (error) {
            this.submiting = false;
            }
        }
    },
    components: { Layout, ProductBlock }
}
</script>

<style>
@import './createwishlist.css';
</style>