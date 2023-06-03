<script setup>

</script>

<template>
    <div class="page">
        <!-- Title -->
        <h1 class="title">Social Gift</h1>
        <p class="error" v-if="error"> Error submiting form</p>
        <section class="main" aria-label="main-content">
            <!-- Login -->
            <form v-if="login" action="submit" class="login" @submit.prevent="onSubmitLogin">

                <!-- Email -->
                <input v-model="email" type="email" name="email" id="email" placeholder="email" >
                <!-- Password -->
                <input v-model="password" type="password" name="pass" id="password" placeholder="password" >
                <!-- Content and Login Button -->
                <div class="sub-container">
                    <button v-if="loading == false" type="submit" class="button" >Login</button>
                    <button v-else type="submit" class="disabled-button" >Login</button>
                    <p>Don’t have an account? <span class="signup" @click="login = false">Sign up</span></p>
                </div>
            </form>

            <!-- Sign Up -->
            <form v-else action="submit" class="login" @submit.prevent="onSubmitSignUp" >
                <!-- Email -->
                <input v-model="email" type="email" name="email" id="email" placeholder="email" >
                <!-- Name -->
                <input v-model="name" type="text" name="First Name" placeholder="First Name">
                <!-- Last Name -->
                <input v-model="lastName" type="text" name="Last Name" placeholder="Last Name">
                <!-- Password -->
                <input v-model="password" type="password" name="pass" id="password" placeholder="password" >
                <input v-model="password2" type="password" name="pass2" id="password2" placeholder="repeat password" >
                <!-- Content and Login Button -->
                <div class="sub-container">
                    <button v-if="loading == false" type="submit" class="button" >Sign Up</button>
                    <button v-else type="submit" class="disabled-button" >Sign Up</button>
                    <p>Already have an account? <span class="onSubmitSignUp" @click="login = true">Login</span></p>
                </div>
            </form>
            
            <!-- The image that goes either on the bottom or at the side -->
            <img class="bottom" src="/img/list.jpg"/>
        </section>
    </div>
</template>
    
<script>
import axios from 'axios';
import useJwt from "jwt-decode";
import { loginUser, getUserById, singUpUser } from '../../apis';
import { useRouter } from 'vue-router'
export default {
    name: 'LoginPage',
    data() {
        return {
            login: true,
            loading: false,
            name: "",
            last_name: "",
            email: "",
            password: "",
            password2: "",
            img: "https://balandrau.salle.url.edu/i3/repositoryimages/photo/47601a8b-dc7f-41a2-a53b-19d2e8f54cd0.png",
            error: false
        }
    },
    methods: {
        async onSubmitLogin(e) {
            this.loading = true;
            try {
                const response = await axios.post(loginUser,{
                email: this.email,
                password: this.password
            });
            // accessToken
            const token = response.data['accessToken'];

            localStorage.setItem('token', token);

            // get user information from token (id)
            const {id} = useJwt(token)
            localStorage.setItem('id', id);

            // Use id to get the rest of information
            try {
                const userInfoReq = await axios.get(`${getUserById}/${id}`, {headers: {
                    Authorization: `Bearer ${token}`
                }});

                const { name, last_name, email, image} = userInfoReq.data;
                console.log(name, last_name, email, image);
                localStorage.setItem('name', name);
                localStorage.setItem('last_name', last_name);
                localStorage.setItem('email', email);
                localStorage.setItem('image', image);
                this.$router.push('/wishlist');

            } catch (error) {
                console.log(error);
            }
            

            
            } catch (error) {
                 console.error(error);
                 this.error = true;
            }
            
            this.loading = false;

        },
        async onSubmitSignUp(e) {
            this.loading = true;
            try {
                const response = await axios.post(singUpUser,{
                    name: this.name,
                    last_name: this.last_name,
                    email: this.email,
                    password: this.password,
                    image: this.img
            });
            this.login = true;
            } catch (error) {
                this.error = true;
                console.error(error);
            }
            this.loading = false;
            
        }
    }
}
</script>

<style>
  @import './login-page.css';
</style>
