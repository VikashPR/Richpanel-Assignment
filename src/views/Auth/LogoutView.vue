<template>
    <div  class="d-flex align-center justify-center flex-column">
        <h1>Logout</h1>
        <p>Are you sure you want to logout?</p>
        <v-btn color="primary" @click="logout">Logout</v-btn>
    </div>
</template>

<script>
import { auth } from '@/firebase';

export default {
    methods: {
        logout() {
            // error Redirected when going from "/logout" to "/login" via a navigation guard.

            auth.signOut().then(() => {
                this.$router.push({ name: 'login' });
            });
        }
    }
}
</script>

<style lang="scss" scoped>

div{
    height: 100vh;
    width: 100vw;
}

</style>