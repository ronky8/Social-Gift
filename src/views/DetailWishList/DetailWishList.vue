<template>
    <Layout activeState="wishlist">
        <div class="container">
            <input v-model="wishlist.name" type="text" :placeholder="wishlist.name" v-if="this.owner" class="title-wishlist" />
            <h1 v-else>{{ wishlist.name }}</h1>
            <textarea v-if="this.owner" cols="50" class="description" :placeholder="wishlist.description" v-model="wishlist.description" />
            <p v-else class="description">{{ wishlist.description }}</p>
            <div class="product-gallery">
                <ProductBlock v-for="item in wishlist.gifts" :key="item.id" :gift="item" :owner="owner" />
            </div>
            <button v-if="!submiting && owner" class="addList" @click="submitChanges">Submit changes</button>
            <button v-else-if="submiting && owner" class="addListSubmiting" disabled>Submit changes</button>
        </div>
    </Layout>
</template>

<script>
import axios from 'axios';
import Layout from '../../layouts/layout.vue';
import { editWishlists, getWishlists } from '../../apis';
import ProductBlock from '../../components/ProductBlock.vue';

export default {
    name: "DetailWishList",
    async created() {
        this.id = this.$route.params.id;
        const wishlistReq = await axios.get(`${getWishlists}/${this.id}`, { headers: { Authorization: `Bearer ` + localStorage.getItem('token') } });
        this.wishlist = wishlistReq.data;
        this.owner = (localStorage.getItem("id") === this.wishlist.user_id.toString());
    },
    data() {
        return {
            id: "",
            // wishlist: {name: "new title", gifts: [{id: 1}, {id: 2}, {id: 3}], user_id: 1},
            wishlist: {},
            owner: false,
            submiting: false,
            error: ""
        };
    },
    methods: {
        async submitChanges() {
            this.submiting = true;
            try {
                const res= await axios.put(`${editWishlists}/${this.wishlist.id}`,this.wishlist,{
                    headers: {
                        Authorization: `Bearer ` + localStorage.getItem('token')
                    }
                });
                console.log(res);
                this.$router.push('/wishlist')
            } catch (error) {
                this.error = "Error submiting changes";
            }

            this.submiting = false;
        }
    },
    components: { Layout, ProductBlock }
}
</script>

<style>
@import './detailwishlist.css';
</style>