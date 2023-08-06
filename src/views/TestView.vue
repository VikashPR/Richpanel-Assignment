<template>
    <div>
        <stripe-checkout ref="checkoutRef" mode="subscription" :pk="publishableKey" :line-items="lineItems"
            :success-url="successURL" :cancel-url="cancelURL" @loading="v => loading = v" />
        <button @click="submit">Subscribe!</button>
    </div>
</template>

<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe';
export default {
    components: {
        StripeCheckout,
    },
    data() {
        this.publishableKey = "pk_test_51NbNxWSCvAqhlDJnKzdvJcLSYHoVWygkKPn0aVTJOGhc8yMiD5I7AJqA54p1PN7PzGsK3QtiDIu2pW2vOAHALsuq00Awlo9qcY"
        return {
            loading: false,
            lineItems: [
                {
                    price: 'price_1NbzGkSCvAqhlDJnsCkviLFr', // The id of the recurring price you created in your Stripe dashboard
                    quantity: 1,
                },
            ],
            successURL: 'https://localhost:8080/user-plan',
            cancelURL: 'https://localhost:8080/',
        };
    },
    methods: {
        submit() {
            // You will be redirected to Stripe's secure checkout page
            this.$refs.checkoutRef.redirectToCheckout();
        },
    },
};
</script>