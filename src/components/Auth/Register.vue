<template>
    <div class="register-container">
        <v-card class="card">
            <h3 class="title">Create Account</h3>

            <label for="name">Name</label>
            <v-text-field v-model="name" :rules="[rules.required]"  label="Enter your name" single-line outlined></v-text-field>

            <label for="name">Email</label>
            <v-text-field height="20px" v-model="email" :rules="[rules.required, rules.email]" label="E-mail" single-line
                outlined></v-text-field>


            <label for="name">Password</label>
            <v-text-field height="20px" v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]" :type="show ? 'text' : 'password'" name="input-10-1" label="Password"
                hint="At least 8 characters" counter @click:append="show = !show" single-line outlined></v-text-field>

            <v-checkbox v-model="RememberMe" label="Remember Me"></v-checkbox>

            <v-btn :loading="loading"
             :disabled="disabled" color="#26528C"  class="submit-btn white--text" @click="register">
                Sign Up
            </v-btn>

            <p class="footer">Already have an account? <a href="/login">Login</a></p>
        </v-card>
    </div>
</template>

<script>
import {auth, db} from '../../firebase'
export default {
    name: 'RegisterComponent',
    data() {
        return {
            email: '',
            show: false,
            loading: false,
            rules: {
                required: value => !!value || 'Required.',
                counter: value => value.length <= 20 || 'Max 20 characters',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                },
                password: 'Password',
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 8 || 'Min 8 characters',
                    emailMatch: () => (`The email and password you entered don't match`),
                },
            }
        }
    },
    computed: {
        disabled() {
            if (this.email && this.password && this.name) {
                return false
            } else {
                return true
            }
        }
    },
    methods: {
        async register() {
            try {
                this.loading = true
                await auth.createUserWithEmailAndPassword(this.email, this.password)
                await db.collection('users').doc(auth.currentUser.uid).set({
                    name: this.name,
                    email: this.email,
                })
                await db.collection('orderHistory').doc(auth.currentUser.uid).set({
                    orderHistory: []
                })
                await db.collection('charges').doc(auth.currentUser.uid).set({
                    stripeObject: null
                })
                this.loading = false
                this.$router.push('/')
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.register-container {
    background-color: #26528C;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;

    .card {
        padding: 40px 60px;
        width: 450px;
        border-radius: 15px;

        .title {
            text-align: center;
            font-size: 24px;
            margin-bottom: 25px;
        }

        .submit-btn {
            width: 100%;
        }

        .footer {
            margin: 25px 0 0 0;
            text-align: center;


        }
    }
}
</style>