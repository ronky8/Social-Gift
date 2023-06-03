
<script setup>
import ProfileData from '../../components/ProfileData.vue';
import Layout from '../../layouts/layout.vue';
</script>
 
<template>
    <Layout activeState="profile">
        <div class="profileContainer">
            <ProfileData :owner="owner" />
        </div>
    </Layout>
</template>

<script>
export default {
    data() {
        return {
            owner: true
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