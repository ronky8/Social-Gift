<template>
    <div v-if="owner">
        <div class="product-container" v-if="!removed">
            <img v-if="owner" @click="modalToggle" src="../assets/gear.svg" alt="gear icon" width="25" height="25"
                class="gear" />
            <div class="center-pcontainer">Here goes info</div>
            <div class="bottom-pcontainer">more info</div>
            <div class="modal-gift" :class="{ active: modalOn }">
                <button @click="removeFromList" class="remove-button">remove</button>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="product-container" v-if="!removed" @click="goToDetailView">
            <img v-if="owner" @click="modalToggle" src="../assets/gear.svg" alt="gear icon" width="25" height="25"
                class="gear" />
            <img class="center-pcontainer" :src="gift.photo" alt="error in link" />
            <div class="bottom-pcontainer">
                <span>${{gift.price}}</span>
                <span>{{gift.description}}</span>
            </div>
            
            <div class="modal-gift" :class="{ active: modalOn }">
                <button @click="removeFromList" class="remove-button">remove</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created() {
    },
    data() {
        return {
            modalOn: false,
            removed: false
        }
    },
    props: ["gift", "owner"],
    methods: {
        removeFromList() {
            this.removed = true;
        },
        modalToggle() {
            this.modalOn = !this.modalOn;
        },
        goToDetailView(){
            this.$router.push({ name: "DetailProduct", params: { id: this.gift.id}})

        }
    }
}

</script>

<style>
.product-container {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #457B9D;
    color: white;
    height: 250px;
    width: 350px;
    border-radius: 15px;

    justify-content: space-between;
    align-items: center;

    border: 1px solid black;

}

.gear {
    position: absolute;
    top: 10px;
    right: 10px;
    filter: invert(1);
    transition-duration: 0.3s;
    cursor: pointer;
}

.gear:hover {
    transform: rotateZ(30deg);
}

.center-pcontainer {
    display: flex;

    width: 100%;
    height: 70%;
    justify-content: center;

    border-radius: 10px 10px 0 0 ;

    object-fit: fill;
}

.bottom-pcontainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #A8DADC;
    width: 100%;
    height: 30%;
    border-radius: 0 0 10px 10px;
    color: black;

    padding: 1rem;
}
.bottom-pcontainer > span {
    height: 100%;
    display: flex;
    align-items: center;
    font-size: larger;
    font-weight: 600;
}

.bottom-pcontainer > button {
    padding: 0.7rem;
    border: 1px solid black;
}

.remove-button {
    font-size: small;
    border: 1px solid red;
    padding: 0.2rem;
    padding-left: 0.6rem;
    padding-right: 0.6rem;
    border-radius: 8px;
}

.modal-gift {
    visibility: hidden;

}



@media screen and (max-width: 800px) {
    .modal-gift {
        position: absolute;
        right: 0;
        top: 3rem;

        width: 5rem;
        height: 3rem;

        background-color: #fdcf00;
        border-radius: 15px;

        display: flex;
        align-items: center;
        justify-content: center;
        color: #E63946;
    }

    .active {
        visibility: visible;
        animation: popUp 0.3s ease-in-out 0s 1 normal forwards;
        transform-origin: top;
    }
}

@media screen and (min-width: 800px) {
    .modal-gift {
        position: absolute;
        right: -4.2rem;
        top: 0rem;

        width: 5rem;
        height: 3rem;

        background-color: #fdcf00;
        border-radius: 15px;

        display: flex;
        align-items: center;
        justify-content: center;
        color: #E63946;
    }

    .active {
        visibility: visible;
        animation: popUp 0.3s ease-in-out 0s 1 normal forwards;
        transform-origin: left;
    }
}

@keyframes popUp {
    0% {
        scale: 0.1;
    }

    100% {
        scale: 1;
    }

}
</style>