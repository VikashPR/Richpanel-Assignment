<template>
    <main>
        <v-snackbar color="success" absolute top right v-model="snackbar" :timeout="timeout">
            {{ text }}
            <template v-slot:action="{ attrs }">
                <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
        <div class="card">
            <div class="left">
                <h1>Complete Payment</h1>
                <span>Enter your credit or debit card detail below</span>
                <stripe-element-card ref="elementRef" :pk="publishableKey" @token="tokenCreated" />
                <v-btn :loading="loading" :disabled="loading" depressed large color="#26528C" class="submit-btn white--text" @click="submit">
                    Confirm Payment
                </v-btn>
            </div>

            <div class="right">
                <h2>Order Summary</h2>
                <div class="order-details">
                    <div class="order-detail">
                        <span>Plan Name</span>
                        <span>{{ this.selectedPlan }}</span>
                    </div>
                    <hr />
                    <div class="order-detail">
                        <span>Billing Cycle</span>
                        <span>{{ this.planDuration }}</span>
                    </div>
                    <hr />
                    <div class="order-detail">
                        <span>Plan Price</span>

                        <span v-if="planDuration == 'monthly'">
                            ₹{{ this.monthly.find(plan => plan.name.toLowerCase() == this.selectedPlan).price }}/Mo
                        </span>
                        <span v-else-if="planDuration == 'yearly'">
                            ₹{{ this.yearly.find(plan => plan.name.toLowerCase() == this.selectedPlan).price }}/Yr</span>
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import SetUserPlan from '@/services/SetUserPlanService.js';
import UpdateOrderHistory from '@/services/UpdateOrderHistoryService.js';
import { fetchPlans } from '@/services/FetchPlansService.js';
import { auth, db } from '@/firebase';
import { StripeElementCard } from '@vue-stripe/vue-stripe';

export default {
    components: {
    StripeElementCard,
  },
    data() {
        this.publishableKey = "pk_test_51NbNxWSCvAqhlDJnKzdvJcLSYHoVWygkKPn0aVTJOGhc8yMiD5I7AJqA54p1PN7PzGsK3QtiDIu2pW2vOAHALsuq00Awlo9qcY";
        this.successURL = 'https://richpanel-assignment-de3f0.web.app/user-plan';
        this.cancelURL = 'https://richpanel-assignment-de3f0.web.app/';
        this.stripe = null;
        return {
            token: null,
            selectedPlan: null,
            planDuration: null,
            loading: false,
            planDetails: null,
            snackbar: false,
            uId: null,
            text: 'Payment initiated successfully, please wait...',
            timeout: 2000,
            yearly: [],
            monthly: [],
        };
    },
    created() {
        this.selectedPlan = this.$route.params.selectedPlan;
        this.planDuration = this.$route.params.planDuration;
        this.uId = auth.currentUser.uid;
        fetchPlans()
            .then((response) => {
                this.monthly = response[0].allPlans
                this.yearly = response[1].allPlans
            })
            .catch((error) => {
                console.log(error)
            })
    },
    mounted() {
        this.stripe = window.Stripe(this.publishableKey);
    },
    methods: {
        submit() {
            this.loading = true;
            this.$refs.elementRef.submit();

            this.planDetails = this.planDuration == 'monthly' ? this.monthly.find(plan => plan.name.toLowerCase() == this.selectedPlan) : this.yearly.find(plan => plan.name.toLowerCase() == this.selectedPlan);
            console.log(this.planDetails.id);

            let planStatus = "active"
            let subscriptionStartOn = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            let subscriptionEndOn = this.planDuration == 'monthly' ? new Date(new Date().setDate(new Date().getDate() + 30)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : new Date(new Date().setDate(new Date().getDate() + 365)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            this.planDetails = { ...this.planDetails, planStatus, subscriptionStartOn, subscriptionEndOn, planDuration: this.planDuration };

            setTimeout(() => {
                this.snackbar = true
            }, 2000);

            SetUserPlan(this.uId, this.planDetails);

            UpdateOrderHistory(this.uId, this.planDetails)

            setTimeout(() => {
                this.stripe.redirectToCheckout({
                    lineItems: [{ price: this.planDetails.id, quantity: 1 }],
                    mode: 'subscription',
                    successUrl: this.successURL,
                    cancelUrl: this.cancelURL,
                });
                this.loading = false;
            }, 3000);

        },
        tokenCreated(token) {
            console.log(token);

            this.token = token;
            let source = this.token;
            let amount = this.planDuration == 'monthly' ? this.monthly.find(plan => plan.name.toLowerCase() == this.selectedPlan).price : this.yearly.find(plan => plan.name.toLowerCase() == this.selectedPlan).price;
            let stripeObj = {
                source,
                amount,
                plan: this.selectedPlan,
                planDuration: this.planDuration,
            }

            console.log(stripeObj);

            db.collection('charges').doc(this.uId).set(stripeObj)
                .then(() => {
                    console.log('charge added');
                })
                .catch((error) => {
                    console.log(error);
                })
            // handle the token
            // send it to your server
        },
    }
};
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
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        max-width: 800px;
        width: 100%;
        display: flex;
        gap: 20px;

        .left {
            padding: 45px 25px;
            width: 50%;
            display: flex;
            flex-direction: column;
            gap: 20px;

            span{
                color: #737373;
            }

            .submit-btn {
                max-width: 200px;

            }
        }

        .right {
            width: 50%;
            background: #F5F5F7;
            padding: 45px 25px;
            border-top-right-radius: 20px;
            border-bottom-right-radius: 20px;
            display: flex;
            flex-direction: column;
            gap: 30px;

            .order-details {
                display: flex;
                flex-direction: column;
                gap: 10px;

                .order-detail {
                    display: flex;
                    justify-content: space-between;

                    :nth-child(2) {
                        text-transform: capitalize;
                        font-weight:600;
                    }
                }
            }
        }
    }
}
</style>