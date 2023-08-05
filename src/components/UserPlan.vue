<template>
    <main>
        <v-card class="card">
            <div class="card-header">
                <h1 class="card-title">Current Plan Details</h1>

                <v-chip class="mx-2 card-status" v-if="userPlan.planStatus === 'cancelled'"
                    :class="{ 'card-status-cancelled': userPlan.planStatus == 'cancelled' }" color="#F9DCC5" label>
                    Cancelled
                </v-chip>

                <v-chip class="mx-2 card-status" v-else-if="userPlan.planStatus === 'active'"
                    :class="{ 'card-status-active': userPlan.planStatus == 'active' }" color="#C5DDF9" label>
                    Active
                </v-chip>

                <v-chip @click="cancelPlan" v-if="userPlan.planStatus != 'cancelled'" class="ml-auto cancel-plan" color="#26528C" label
                    outlined>
                    Cancel
                </v-chip>
            </div>

            <div class="card-body">
                <div class="card-body-left">
                    <div class="plan-name">{{ userPlan.name}}</div>
                    <span>
                        <span class="plan-devices" v-for="(device, index) in userPlan.devices" :key="index">
                            {{ device }}{{ index < userPlan.devices.length - 1 ? ' + ' : '' }}
                    </span>
                    </span>
                    <h2 v-if="userPlan.planDuration == 'monthly' ">₹ {{ userPlan.price }}<small>/mo</small> </h2>
                    <h2 v-if="userPlan.planDuration == 'yearly' ">₹ {{ userPlan.price }}<small>/yr</small> </h2>
                </div>
                <div class="card-body-right">
                    <router-link to="/">
                        <v-btn depressed outlined color="#26528C" large  class="submit-btn" @click="submit">Change Plan</v-btn>
                    </router-link>
                </div>
                <v-footer v-if="userPlan.planStatus == 'active'" padless>
                    <p>
                        Your subscription started on
                        <strong>{{userPlan.subscriptionStartOn}}</strong>
                        and will auto renew on
                        <strong>{{ userPlan.subscriptionEndOn }}</strong>.
                    </p>
                </v-footer>
                <v-footer v-if="userPlan.planStatus == 'cancelled'" padless>
                    <p>
                        Your subscription has been cancelled and you will loose access to service on
                        <strong>{{userPlan.subscriptionCancelledOn}}</strong>.
                    </p>
                </v-footer>
            </div>
        </v-card>
    </main>
</template>

<script>
import { fetchUserPlan } from '@/services/FetchUserPlanService';
import {auth, db} from '../firebase'
export default {
    name: 'UserPlan',
    data() {
        return {
            userPlan: {}
        }
    },
    created() {
        fetchUserPlan(auth.currentUser.uid).then((res) => {
            this.userPlan = res
        })
    },
    methods: {
        cancelPlan() {
            // subscriptionCancelledOn format should be Aug 20th, 2023
            let subscriptionCancelledOn = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            this.userPlan.subscriptionCancelledOn = subscriptionCancelledOn
            this.userPlan.planStatus = 'cancelled'
            db.collection('users').doc(auth.currentUser.uid).update({
                userPlan: this.userPlan
            })
        }
    }
}
</script>

<style scoped lang="scss">
main {
    background-color: #26528C;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;

    .card {
        border-radius: 20px;
        padding: 30px;
        width: 100%;
        max-width: 600px;
        background-color: #fff;

        .card-header {
            display: flex;
            // justify-content: space-between;
            align-items: center;

            .card-title {
                display: inline-block;
                font-weight: 500;
                font-size:24px;
            }

            .card-status {
                font-weight: 600;
                padding: 10px !important;
                border-radius: 8px !important;
            }

            .card-status-active {
                color: #26528C
            }

            .card-status-cancelled {
                color: #D6716D
            }

            .cancel-plan{
                font-weight: 600;
                padding: 10px !important;
                border: none !important;
            }
        }

        .card-body {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-top: 15px;
            flex-direction: column;
            gap: 20px;
            .card-body-left {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;

                .plan-name {
                    font-size: 1.3rem;
                    font-weight: 500;
                    color: #737373;
                }
                .plan-devices{
                    font-size: 14px;
                    font-weight: 400;
                    color:#8B8B8D
                }

                h2 {
                    font-size: 2rem;
                    font-weight: 500;
                }
            }

            .card-body-right {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }

        .v-footer {
            padding: 10px;
            border-radius: 5px;

            p {
                margin: 0;
            }
        }
    }
}
</style>