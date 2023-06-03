<template>
    <Layout activeState="friends">
        <div class="container">
            <h1>Friends</h1>
            <div class="friends-container">
                <SearchBar v-model="searchText" />
                <!-- Searching -->
                <div class="search-gallery" v-if="searchText">
                    <h2>Results</h2>
                    <div class="pending-req-container">
                        <FriendBlock v-for="user in users" :user="user" :friend="isFriend(user.id)" :request="isPending(user.id)" />
                    </div>
                </div>
                <!-- default -->
                <div class="gallery" v-else>
                    <!-- Pending Friends -->
                    <div class="pending">
                        <h2>Pending Request</h2>
                        <div class="pending-req-container">
                            <FriendBlock v-for="friend in friendRequests" :user="friend" :request="true" />
                        </div>
                    </div>
                    <!-- Your actual friends -->
                    <div class="actual-friends">
                        <h2>Your Friends</h2>
                        <div class="actual-friends-container">
                        <FriendBlock v-for="friend in friends" :user="friend" :friend="true" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </Layout>
</template>

<script>
import axios from 'axios';
import { getFriendRequests, getFriends } from '../../apis';
import FriendBlock from '../../components/FriendBlock.vue';
import SearchBar from '../../components/SearchBar.vue';
import Layout from '../../layouts/layout.vue';
import { searchUser } from '../../apis';

export default {
    async created() {
        // Get Pending Requests
        const friendsPendingReq = await axios.get(`${getFriendRequests}`,
            {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('token')
                }
            });

        // Get friends
        const friendsReq = await    axios.get(`${getFriends}`,
            {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('token')
                }
            });

        this.friendRequests =  friendsPendingReq.data;
        this.friends =  friendsReq.data;
        if (!this.friends) this.friends=[];
        if (!this.friendRequests) this.friendRequests=[];

    },
    data() {
        return {
            friends: [],
            friendRequests: [],
            users: [],
            searchText: "",
            token: ""
        };
    }, watch: {
        async searchText() {
            const req = await axios.get(searchUser,
            {
                params: { s: this.searchText },
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('token')
                }
            });

            this.users = req.data;
        }
    },
    methods: {
        updateSearch(updatedSerch) {
            this.search = updatedSerch;
        },
        isFriend(id){
            if (this.friends.length === 0) return false;
            return this.friends.some((el) => {
                return (el.id === id);
            });
        },
        isPending(id){
            if (this.friendRequests.length === 0) return false;
            return this.friendRequests.some((el) => {
                return (el.id === id);
            });
        }
    },
    components: { Layout, SearchBar, FriendBlock }
}
</script>

<style>@import './friends.css';</style> 