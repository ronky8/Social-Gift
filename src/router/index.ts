import DetailWishList from '../views/DetailWishList/DetailWishList.vue';
import LoginPage from '../views/LoginPage/LoginPage.vue';
import WishList from '../views/WishList/WishList.vue';
import Friends from '../views/Friends/Friends.vue';
import Messages from '../views/Messages/Messages.vue';

import { createRouter, createWebHistory } from 'vue-router';
import Profile from '../views/Profile/Profile.vue';
import ProfileFriend from '../views/Profile/ProfileFriend.vue';
import CreateWishList from '../views/CreateWishList/CreateWishList.vue';
import ProductsVue from '../views/Products/Products.vue';
import ProductDetailVue from '../views/Products/ProductDetail/ProductDetail.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: LoginPage
        },
        {
            path: '/wishlist',
            name: 'wishlist',
            component: WishList
            
        },
        {
            path: "/wishlist/:id",
            name: 'DetailWishList',
            component: DetailWishList,
        },
        {
            path: "/friends",
            name: "Friends",
            component: Friends
        },
        {
            path: "/messages",
            name: "Messages",
            component: Messages
        },
        {
            path: "/profile",
            name: "Profile",
            component: Profile
        }, {
            path: "/profile/:id",
            name: "ProfileFriend",
            component: ProfileFriend
        },{
            path: "/wishlist/new",
            name: "CreateWishlist",
            component: CreateWishList
        },{
            path: "/products",
            name: "Products",
            component: ProductsVue
        },{
            path: "/products/:id",
            name: "DetailProduct",
            component: ProductDetailVue
        },{
            path: "/products/new",
            name: "NewProduct",
            component: ProductDetailVue
        }

    ]
});

export default router;