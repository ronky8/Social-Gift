
<script setup>
import axios from 'axios';
import ProfileData from '../../components/ProfileData.vue';
import Layout from '../../layouts/layout.vue';
import { getUserById } from '../../apis';
</script>
 
<template>
    <Layout activeState="profile">
        <div class="profileContainer">
            <ProfileData :user="user" />
        </div>
    </Layout>
</template>

<script>
export default {
    async created() {
        // Get id of the user
        this.id = this.$route.params.id;
        const userReq = await axios.get(`${getUserById}/${this.id}`, { headers: { Authorization: `Bearer ` + localStorage.getItem('token') } });
        this.user = userReq.data;
        console.log(userReq.data)
    },
    data() {
        return {
            owner: false,
            user: {}
        };
    },
    components: { ProfileData }
}
</script>

<style>
.profileContainer {
    display: flex;
    flex-direction: column;
    padding-top: 5rem;
    /* justify-content: center; */
    align-items: center;
    gap: 2rem;
}

.owner {
    display: flex;
    flex-direction: column;
}
</style>