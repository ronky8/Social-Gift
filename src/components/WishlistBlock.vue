<template>
    <div class="containerBlock" @click="goToDetailView">
        <span class="name">{{wishlist.name}}</span>
        <span class="items">{{wishlist.gifts.length}} <span>items </span></span>
    </div>
</template>

<script>
import { getWishlists } from '../apis';


export default {
    props: ["wishlist"],
    methods: {
        goToDetailView() {
            this.$router.push({ name: `DetailWishList`, params: {id: this.wishlist.id}})
        }
    }
}
</script>

<style>
.containerBlock {
    display: flex;
    justify-content: space-between;
    padding: 1rem;

    background-color: #F1FAEE;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.343);
    min-width: 60vw;
}
.items > span {
    font-size: small;
    color: gray;

}

</style>