<template>
    <div class="containerBlock" @click="addToList" v-if="!addingProcess">
        <span class="name">{{wishlist.name}}</span>
        <span class="items">{{wishlist.gifts.length}} <span>items </span></span>
    </div>
    <div class="containerBlockDisabled" v-else>
        <span class="name">{{wishlist.name}}</span>
        <span class="items">{{wishlist.gifts.length}} <span>items </span></span>
    </div>
</template>

<script>
import axios from 'axios';
import { getWishlists } from '../apis';


export default {
    props: ["wishlist", "product_id"],
    data(){
        return {
            addingProcess: false
        }
    },
    methods: {
        async addToList() {
            this.addingProcess = true;
            await axios.post();
            this.wishlist.gifts += 1;
            this.addingProcess = false;
        }
    }
}
</script>

<style>
.containerBlockDisabled {
    display: flex;
    justify-content: space-between;
    padding: 1rem;

    background-color: #7b7b7bf2;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.343);
    min-width: 60vw;
}

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