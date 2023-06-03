<template>
    <div class="layout">
        <img src="../assets/menu/bars.svg" alt="bars icon" class="bars" @click="isActive=true" width="30" height="30"/>
        <section aria-label="navbar" class="navbar" :class="{ activeLayout: isActive, animateMenu: isActive}" >
            <nav>
                <ul>
                    <li :class="{stateSelected: (activeState === 'wishlist')}">
                        <a class="item" href="/wishlist">
                            <img src="../assets/menu/wishlist.svg" alt="wishlist icon" height="30" width="30">
                            <span>Wishlist</span>   
                        </a>
                    </li>
                    <li :class="{stateSelected: (activeState === 'friends')}"> 
                        <a class="item" href="/friends">
                        <img src="../assets/menu/users.svg" alt="friends icon" height="30" width="30">
                        <span>Friends</span>
                        </a>
                    </li>
                    <li :class="{stateSelected: (activeState === 'products')}"> 
                        <a class="item" href="/products">
                        <img src="../assets/menu/products.svg" alt="wishlist icon" height="30" width="30">
                        <span>Products</span>
                        </a>
                    </li>
                </ul>
            </nav>
            <div >
                <a href="/profile" class="user">
                <img src="../assets/user.svg" alt="user icon" height="55" width="55">
                <div class="user-names">
                    <span>{{ user.name }} {{ user.last_name }}</span>
                    <span class="username">{{ user.email }}</span>
                </div>
            </a>
            </div>
        </section>
        
        <section aria-label="main-content" class="main-content">
            <!-- hidden-bg is used when you click outside the menu to close the menu -->
            <div v-if="isActive" class="hidden-bg" @click="isActive=false"></div>
            <slot />
        </section>
    </div>
</template>


<style>
  @import './layout.css';
</style>

<script lang="js">
export default {
    props: ['activeState'], 
    created() {
        const newuser = {
            name: localStorage.getItem('name'),
            last_name: localStorage.getItem('last_name'),
            email: localStorage.getItem('email')
        };
        this.user = newuser;
  },

    data() {
        return {
            isActive: false,
            firstName: "",
            lastName: "",
            email: "",
            user: {}
        }
    },
}
</script>