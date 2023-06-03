<template>


    <form action="submit" @submit.prevent="onSubmitLogin" v-if="owner" class="fgroup-container">
        <div class="topProfile">
        <img :src="image" alt="user icon" height="200" width="200" />
    <span style="color: gray">{{ id }}</span>
    <span style="color: gray">{{ email }}</span>
    </div>
        <div class="fgroup">
            <label for="name">First Name:</label>
            <input type="text" id="name" :placeholder="name" v-model="name" />
        </div>
        <div class="fgroup">
            <label for="lname">Last Name:</label>
            <input type="text" id="lname" :placeholder="last_name" v-model="last_name" />
        </div>
        <button type="submit" class="this-button">Update</button>
        <button class="this-button btn-logout" @click="logout">Logout</button>

        <button class="this-button btn-delete" @click="deleteUser">
            <span v-if="!deleting">Delete</span>
            <div v-else>Are you sure?</div>
        </button>

    </form>
    <div v-else class="fgroup-container">
        <div class="topProfile">
            <img :src="user.image" alt="user icon" height="200" width="200" />
            <span style="color: gray">{{ user.id }}</span>
            <span style="color: gray">{{ user.email }}</span>
        </div>

        <div class="fgroup">
            <label for="name">First Name:</label>
            <span>{{ user.name }}</span>
        </div>
        <div class="fgroup">
            <label for="lname">Last Name:</label>
            <span>{{ user.last_name }}</span>
        </div>
        <h2 style="text-align: center;">Wishlists</h2>
        <div class="wishlists">
            <WishlistBlock v-for="item in allWishlist" :key="item.id" :wishlist="item" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { getUserById, getWishlists, removeUser, updateUser } from '../apis'
import WishlistBlock from './WishlistBlock.vue';

export default {
    props: ["user", "owner"],
    data() {
        return {
            id: 0,
            email: "",
            name: "",
            last_name: "",
            image: "",
            error: "",
            deleting: false,
            allWishlist: []
        };
    },
    async created() {
        if (this.owner) {
            this.id = localStorage.getItem("id");
            this.email = localStorage.getItem("email");
            this.name = localStorage.getItem("name");
            this.last_name = localStorage.getItem("last_name");
            this.image = localStorage.getItem("image");
        }
    },
    watch: {
        user: {
            handler: async function () {
                if (!this.owner) {
                    const allWishlist = await axios.get(`${getUserById}/${this.user.id}/wishlists`, {
                        headers: {
                            Authorization: `Bearer ` + localStorage.getItem("token")
                        }
                    });
                    this.allWishlist = allWishlist.data;
                }
            },
            immediate: true, // This will make sure the handler runs on first render too
        },
        /*
        const allWishlist = await axios.get(`${getUserById}/${this.user.id}/wishlists`, {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('token')
                }
            });

            this.allWishlist = allWishlist.data;
        */
    },
    methods: {
        async onSubmitLogin() {
            // updateUser
            try {
                const updateUserReq = await axios.put(updateUser, { name: this.name, last_name: this.last_name }, {
                    headers: {
                        Authorization: `Bearer ` + localStorage.getItem("token")
                    }
                });
                const newUser = updateUserReq.data;
                localStorage.setItem("name", newUser.name);
                localStorage.setItem("last_name", newUser.last_name);
            }
            catch (error) {
                this.error = error;
                console.log(error);
            }
        },
        logout() {
            localStorage.clear();
            this.$router.push("/");
        },
        async deleteUser() {
            if (this.deleting) {
                await axios.delete(removeUser, { headers: { Authorization: `Bearer ` + localStorage.getItem("token") } });
                this.logout();
            }
            this.deleting = true;
        }
    },
    components: { WishlistBlock }
}
</script>

<style>
input {
    border: none;
}

input:focus {
    outline: none;
}

.fgroup-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.wishlists{
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.fgroup {
    display: flex;
    gap: 1rem;
}

.this-button {
    display: flex;
    justify-content: center;
    background-color: #7a7ad5;
    color: white;
    border-radius: 15px;
    padding: 10px;
    justify-self: end;
}

.btn-logout {
    border: 1px solid rgb(195, 133, 1);
    background-color: transparent;
    color: rgb(195, 133, 1);
}

.btn-delete {
    margin-top: 2rem;
    border: 1px solid #E63946;
    background-color: #E63946;
}

.topProfile{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}
</style>