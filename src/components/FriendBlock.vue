<template>
    <div class="fblock-container" @click="linkFriend">
        <div class="errorToast" v-if="error">Error sending request</div>
        <div class="name">
            <img src="../assets/user.svg" alt="user icon" width="25" height="25">
            <span>{{ user.name }}</span>
        </div>
        <div class="request" v-if="requestProp">
            <button @click="confirmRequest" class="btn-confirm"><img src="../assets/button/confirm.svg" alt="accept icon"
                    width="20" height="20" /></button>
            <button @click="rejectRequest" class="btn-reject"><img src="../assets/button/reject.svg" alt="reject icon"
                    width="20" height="20" /></button>
        </div>
        <div v-else class="normal-user">
            <span v-if="friendProp" class="al-friend">friend</span>
            <span v-else-if="sent" class="al-friend">request sent!</span>
            <button @click="sendRequestToUser" v-else class="send-req">send request</button>
        </div>
    </div>
</template>

<style>
.fblock-container {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    border: 1px dashed black;
}

.name {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 1rem
}

.request {
    flex: 1;
    display: flex;
    justify-content: end;
    gap: 1rem;

}


.btn-confirm {
    border: 1px solid #457B9D;
    border-radius: 25px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 7px;
    padding-right: 7px;
    color: #457B9D;
    filter: invert(43%) sepia(29%) saturate(743%) hue-rotate(160deg) brightness(96%) contrast(88%);
}

.btn-reject {
    border: 1px solid #E63946;
    border-radius: 25px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 7px;
    padding-right: 7px;
    color: #E63946;
    filter: invert(36%) sepia(55%) saturate(5282%) hue-rotate(336deg) brightness(93%) contrast(93%);
}

.al-friend {
    color: rgb(205, 205, 205);
    cursor: default;
    user-select: none;
    font-size: smaller;
}

.send-req {
    border: 1px solid black;
    padding: 0.5rem;
    font-size: smaller;
}

@media screen and (max-width: 800px) {
    .fblock-container {}
}

@media screen and (min-width: 800px) {
    .fblock-container {
        min-width: 500px;
    }
}
</style>


<script>
import axios from 'axios';
import { acceptPutFriend, addFriend, rejectDeleteFriend } from '../apis';

export default {
    props: ["user", "request", "friend"],
    created(){
        this.requestProp= this.request;
        this.friendProp= this.friend;
    },
    data() {
        return {
            requestProp: false,
            friendProp: false,
            processing: false,
            error: false,
            sent: false
        }
    },
    methods: {
        async confirmRequest() {
            const token = localStorage.getItem("token");
            try {
                await axios.put(`${acceptPutFriend}/${this.user.id}`, {}, {
                    headers: {
                        Authorization: `Bearer ` + token
                    }
                });

                this.requestProp = false;
                this.friendProp = true;
            } catch (error) {
                this.error = true;
                console.log(error);
            }
            this.processing = false;
        },
        async rejectRequest() {
            this.processing = true;
            const token = localStorage.getItem("token");
            try {
                await axios.delete(`${rejectDeleteFriend}/${this.user.id}`, {
                    headers: {
                        Authorization: `Bearer ` + token
                    }
                });
                this.requestProp = false;

            } catch (error) {
                this.error = true;
                console.log(error);
            }
        },
        async sendRequestToUser() {
            this.processing = true;
            try {
                const token = localStorage.getItem("token");
                await axios.post(`${addFriend}/${this.user.id}`, {}, {
                    headers: {
                        Authorization: `Bearer ` + token
                    }
                });
                this.sent = true;
            } catch (error) {
                this.error = true;
            }
            this.processing = false;
        },
        linkFriend(){
            if (this.friendProp) this.$router.push({ name: `ProfileFriend`, params: {id: this.user.id}});
            
        }
    }

}
</script>