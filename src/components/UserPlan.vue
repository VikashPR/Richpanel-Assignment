<template>
    <main>
        <v-card class="card">
            <div class="card-header">
                <h1 class="card-title">Current Plan Details</h1>

                <v-chip class="mx-2 card-status" v-if="userPlan.plan === 'cancelled'"
                    :class="{ 'card-status-cancelled': userPlan.plan == 'cancelled' }" color="#F9DCC5" label>
                    Cancelled
                </v-chip>
                <v-chip class="mx-2 card-status" v-else-if="userPlan.plan === 'active'"
                    :class="{ 'card-status-active': userPlan.plan == 'active' }" color="#C5DDF9" label>
                    Active
                </v-chip>

                <v-chip @click="cancelPlan" v-if="userPlan.plan != 'cancelled'" class="ml-auto cancel-plan" color="#26528C" label
                    outlined>
                    Cancel
                </v-chip>
            </div>

            <div class="card-body">
                <div class="card-body-left">
                    <div class="text-subtitle-1">{{ userPlan.planDetails.name}}</div>
                    <span>
                        <span v-for="(device, index) in userPlan.planDetails.devices" :key="index">
                            {{ device }}{{ index < userPlan.planDetails.devices.length - 1 ? ' + ' : '' }}
                    </span>
                    </span>
                    <h2 v-if="userPlan.planDuration == 'monthly' ">₹ {{ userPlan.planDetails.price }}<small>/mo</small> </h2>
                    <h2 v-if="userPlan.planDuration == 'yearly' ">₹ {{ userPlan.planDetails.price }}<small>/yr</small> </h2>
                </div>
                <div class="card-body-right">
                    <router-link to="/">
                        <v-btn depressed outlined color="#26528C" large  class="submit-btn" @click="submit">Change Plan</v-btn>
                    </router-link>
                </div>
                <v-footer padless>
                    <p>
                        Your subscription started on
                        <strong>Aug 20th, 2023</strong>
                        and will auto renew on
                        <strong>Aug 21th, 2024</strong>.
                    </p>
                </v-footer>
            </div>
        </v-card>
    </main>
</template>

<script>
export default {
    name: 'UserPlan',
    data() {
        return {
            userPlan: {
                plan: 'active',
                subscriptionStartOn: 'Aug 20th, 2023',
                subscriptionEndOn: 'Aug 21th, 2024',
                planDuration: 'monthly',
                planDetails: {
                    name: 'Basic',
                    price: 200,
                    videoQuality: 'Good',
                    resolution: '480p',
                    devices: ['Phone', 'Tablet'],
                    NoOfActiveScreens: 1
                }
            }
        }
    },
    methods: {
        cancelPlan() {
            this.userPlan.plan = 'cancelled'
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