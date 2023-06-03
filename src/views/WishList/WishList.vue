<script setup>
import Layout from "../../layouts/layout.vue";
import WishlistBlock from "../../components/WishlistBlock.vue";
import axios from "axios";
import { getUserById, getWishlists } from "../../apis";
</script>

<template>
  <Layout activeState="wishlist">
    <section class="container">
      <h1>You WishLists</h1>
      <div class="gallery">
        <div class="new-wishlist" @click="createWishlist">+ Wishlist</div>
        <p v-if="allWishlist.length === 0">No Wishlist!</p>
        <WishlistBlock v-for="item in allWishlist" :key="item.id" :wishlist="item" />
      </div>
    </section>
  </Layout>
</template>


<script>
export default {
  async created(){
    this.id = this.$route.params.id;
    const token = localStorage.getItem('token');
    const allWishlist = await axios.get(`${getUserById}/${localStorage.getItem('id')}/wishlists`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      this.allWishlist = allWishlist.data;
  },
  data() {
    return {
      allWishlist: []
    }
  },
  methods: {
    async getAllWishlists() {
      const allWishlist = await axios.get(getWishlists, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(allWishlist);
    },
    createWishlist(){
      this.$router.push("/wishlist/new");
    }
  }
}
</script>

<style>
@import './wishlist.css';
</style>