<template>
    <main>
        <div class="card">
            <div class="left">
                <h1>Complete Payment</h1>
                <span>Enter your credit or debit card detail below</span>
                <stripe-element-card ref="elementRef" :pk="publishableKey" @token="tokenCreated" />
                <v-btn :loading="loading" :disabled="loading" depressed large color="#26528C" class="submit-btn white--text" @click="submit">Confirm
                    Payment</v-btn>
            </div>

            <div class="right">
                <h2>Order Summary</h2>
                <div class="order-details">
                    <div class="order-detail">
                        <span>PlanName</span>
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
                            {{ this.monthly.find(plan => plan.name.toLowerCase() == this.selectedPlan).price }}/Mo
                        </span>
                        <span v-else-if="planDuration == 'yearly'">
                            {{ this.yearly.find(plan => plan.name.toLowerCase() == this.selectedPlan).price }}/Yr</span>
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { StripeElementCard } from '@vue-stripe/vue-stripe';
export default {
    components: {
        StripeElementCard,
    },
    data() {
        this.publishableKey = "pk_test_51NbNxWSCvAqhlDJnKzdvJcLSYHoVWygkKPn0aVTJOGhc8yMiD5I7AJqA54p1PN7PzGsK3QtiDIu2pW2vOAHALsuq00Awlo9qcY";
        return {
            token: null,
            selectedPlan: null,
            planDuration: null,
            loading: false,
            yearly: [
                {
                    name: 'Basic',
                    price: 1000,
                    videoQuality: 'Good',
                    resolution: '480p',
                    devices: ['Phone'],
                    NoOfActiveScreens: 1
                },
                {
                    name: 'Standard',
                    price: 2000,
                    videoQuality: 'Good',
                    resolution: '720p',
                    devices: ['Phone', 'Tablet'],
                    NoOfActiveScreens: 3
                },
                {
                    name: 'Premium',
                    price: 5000,
                    videoQuality: 'Better',
                    resolution: '1080p',
                    devices: ['Phone', 'Tablet', 'Computer'],
                    NoOfActiveScreens: 10
                },
                {
                    name: 'Regular',
                    price: 7000,
                    videoQuality: 'Best',
                    resolution: '4K+HDR',
                    devices: ['Phone', 'Tablet', 'TV'],
                    NoOfActiveScreens: 10
                }
            ],
            monthly: [
                {
                    name: 'Basic',
                    price: 100,
                    videoQuality: 'Good',
                    resolution: '480p',
                    devices: ['Phone'],
                    NoOfActiveScreens: 1
                },
                {
                    name: 'Standard',
                    price: 200,
                    videoQuality: 'Good',
                    resolution: '720p',
                    devices: ['Phone', 'Tablet'],
                    NoOfActiveScreens: 3
                },
                {
                    name: 'Premium',
                    price: 500,
                    videoQuality: 'Better',
                    resolution: '1080p',
                    devices: ['Phone', 'Tablet', 'Computer'],
                    NoOfActiveScreens: 10
                },
                {
                    name: 'Regular',
                    price: 700,
                    videoQuality: 'Best',
                    resolution: '4K+HDR',
                    devices: ['Phone', 'Tablet', 'TV'],
                    NoOfActiveScreens: 10
                }
            ],
        };
    },

    created() {
        this.selectedPlan = this.$route.params.selectedPlan;
        this.planDuration = this.$route.params.planDuration;
    },

    methods: {
        submit() {
            // this will trigger the process
            this.loading = true;

            this.$refs.elementRef.submit();

            setTimeout(() => {
                this.$router.push({
                    name: 'user-plan',
                    params: {
                        selectedPlan: this.selectedPlan,
                        planDuration: this.planDuration,
                    },
                });
                this.loading = false;
            }, 3000);

        },
        tokenCreated(token) {
            console.log(token);
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
                    }
                }
            }
        }
    }
}
</style>