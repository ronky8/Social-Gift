<template>
    <Layout activeState="products">
        <div class="productContainer" v-if="newProduct">
            <h1 class="titleProduct">New Product</h1>
            <form action="submit" class="newProductForm" @submit.prevent="submitNewProduct">
                <input v-model="product.link" type="text" name="imglink" id="imglink" placeholder="image link">
                <input v-model="product.name" type="text" name="name" id="name" placeholder="name">
                <textarea cols="50" class="areainput" placeholder="description" v-model="product.description"></textarea>
                <input v-model="product.price" step="0.01" type="number" name="price" id="price" placeholder="price">
                <button v-if="!submiting" type="submit" class="addList">Submit</button>
                <button v-else class="addListSubmiting" disabled>Submit</button>
            </form>
        </div>
        <div class="productContainer" v-else>
            <h1 class="titleProduct">Product</h1>
            <img :src="product.photo" alt="image photo" class="img-product">
            <form action="submit" class="newProductForm" @submit.prevent="updateProduct">
                <input v-model="product.link" type="text" name="imglink" id="imglink" :placeholder="product.link">
                <input v-model="product.name" type="text" name="name" id="name" :placeholder="product.name">
                <textarea cols="50" class="areainput" :placeholder="product.description"
                    v-model="product.description"></textarea>
                <input v-model="product.price" step="0.01" type="number" name="price" id="price"
                    :placeholder="product.price">
                <button v-if="!submiting" type="submit" class="addList">Add Changes</button>
                <button v-else class="addListSubmiting" disabled>Submit</button>
                <button type="button" class="btn-reject" @click="deleteProduct">Delete</button>
            </form>

            <div class="wishlistAddContainer">
                <section class="container">
                    <h1>Add to your WishList</h1>
                    <div class="gallery">
                        <p v-if="allWishlist.length === 0">No Wishlist!</p>
                        <AddWishlistBlock v-for="item in allWishlist" :key="item.id" :wishlist="item" :product_id="newid" />
                    </div>
                </section>
            </div>
        </div>
    </Layout>
</template>

<script>
import axios from 'axios';
import Layout from '../../../layouts/layout.vue';
import { createProduct, getProductById, getUserById, searchProducts } from '../../../apis';
import WishlistBlock from '../../../components/WishlistBlock.vue';
import AddWishlistBlock from '../../../components/AddWishlistBlock.vue';

export default {
    async created() {
        let newid = this.$route.params.id;

        if (newid) {
            this.id = newid;
            this.newProduct = false
            this.getProduct();

            console.log("getting all wishlist")
            const token = localStorage.getItem('token');
            const allWishlist = await axios.get(`${getUserById}/${localStorage.getItem('id')}/wishlists`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(allWishlist.data)

            this.allWishlist = allWishlist.data;
        } else {
            this.newProduct = true;
        }
    },
    methods: {
        async submitNewProduct() {
            this.product.photo = this.product.link;
            this.submiting = true;
            const resp = await axios.post(createProduct, this.product);
            this.$router.push({ name: `DetailProduct`, params: { id: resp.data.id } })

            this.submiting = false;
        },
        async updateProduct() {
            const resp = await axios.put(`${getProductById}/${this.id}`, this.product);
            this.$router.push({ name: `DetailProduct`, params: { id: resp.data.id } })

        },
        async getProduct() {
            const prodReq = await axios.get(`${getProductById}/${this.id}`);
            this.product = prodReq.data;
            console.log(this.product);
        },
        async deleteProduct() {
            await axios.delete(`${getProductById}/${this.id}`);
            this.$router.push('/products')
        }
    },
    data() {
        return {
            id: "0",
            newProduct: false,
            product: { name: "", description: "", link: "", photo: "", price: 0 },
            submiting: false,
            allWishlist: []
        }
    },
    components: { Layout, WishlistBlock, AddWishlistBlock }
}
</script>

<style>
.productContainer {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 2rem;
}

.titleProduct {
    font-family: 'Pacifico', cursive;
    font-size: xx-large;
    margin-bottom: 4rem;
    color: black;
    width: 50%;
    border: none;
    text-align: center;
    margin-bottom: 2rem;
}

.newProductForm {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 75%;
    gap: 0.5rem
}

.newProductForm>input {
    border: 1px solid #457b9d;
    padding: 0.8rem;
    border-radius: 10px;
}

.areainput {
    border: 1px solid #457b9d;
    padding: 0.8rem;
    border-radius: 10px;
}

.areainput:focus {
    outline: none;
}

.img-product {
    width: 60%;
    height: auto;
    padding-bottom: 2rem;
}
</style>
