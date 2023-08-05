<template>
    <section class="table-container">
        <h1 class="text-center">Choose the right plan for you</h1>
        <v-simple-table style="max-width: 900px; width:100%">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-center">
                            <div class="toggle-plan-duration-btns">
                                <button @click="planDuration = 'monthly'"
                                    :class="{ 'toggle-active': planDuration == 'monthly' }"
                                    class="toggle-btn">Monthly</button>
                                <button @click="planDuration = 'yearly'"
                                    :class="{ 'toggle-active': planDuration == 'yearly' }"
                                    class="toggle-btn">Yearly</button>
                            </div>
                        </th>
                        <th class="text-center">
                            <div @click="mapPlanIndex('basic')" :class="{ 'header-box-active': selectedPlan == 'basic' }"
                                class="header-box">Basic</div>
                        </th>
                        <th class="text-center">
                            <div @click="mapPlanIndex('standard')"
                                :class="{ 'header-box-active': selectedPlan == 'standard' }" class="header-box">Standard
                            </div>
                        </th>
                        <th class="text-center">
                            <div @click="mapPlanIndex('premium')"
                                :class="{ 'header-box-active': selectedPlan == 'premium' }" class="header-box">Premium</div>
                        </th>
                        <th class="text-center">
                            <div @click="mapPlanIndex('regular')"
                                :class="{ 'header-box-active': selectedPlan == 'regular' }" class="header-box">Regular</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            Yearly Price
                        </td>
                        <td style="text-align:center;" v-for="(item, index) in planItems" :key="item.name"
                            :style="index === planIndex ? { color: '#26528C' } : {}">
                            ₹ {{ item.price }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Video quality
                        </td>
                        <td style="text-align:center;" v-for="(item, index) in planItems" :key="item.name"
                            :style="index === planIndex ? { color: '#26528C' } : {}">
                            {{ item.videoQuality }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Resolution
                        </td>
                        <td style="text-align:center" v-for="(item, index) in planItems" :key="item.name"
                            :style="index === planIndex ? { color: '#26528C' } : {}">
                            {{ item.resolution }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Number of active screens at one time
                        </td>
                        <td style="text-align:center" v-for="(item, index) in planItems" :key="item.name"
                            :style="index === planIndex ? { color: '#26528C' } : {}">
                            {{ item.NoOfActiveScreens }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Devices you can use to watch
                        </td>
                        <td style="text-align:center" v-for="(item, index) in planItems" :key="item.name"
                            :style="index === planIndex ? { color: '#26528C' } : {}">
                            <template v-for="device in item.devices">
                                <div class="py-4" :key="device[0]">
                                    {{ device }}
                                    <br>
                                </div>
                            </template>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>

        <v-btn :loading="loading" :disabled="loading" large color="#26528C" class="submit-btn white--text"
            @click="proceedPayment">
            Next
        </v-btn>
    </section>
</template>

<script>
export default {
    name: 'PlanSelection',
    props: {
        monthly: {
            type: Array,
            required: true,
        },
        yearly: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            loading: false,
            planDuration: 'monthly',
            selectedPlan: null,
            planIndex: null,
        }
    },
    computed: {
        planItems() {
            return this.planDuration === 'monthly' ? this.monthly : this.yearly;
        }
    },

    methods: {
        mapPlanIndex(plan) {
            this.selectedPlan = plan;
            if (plan === 'basic') {
                this.planIndex = 0;
            } else if (plan === 'standard') {
                this.planIndex = 1;
            } else if (plan === 'premium') {
                this.planIndex = 2;
            } else if (plan === 'regular') {
                this.planIndex = 3;
            }
            console.log(this.planIndex);
        },
        proceedPayment() {
            console.log(this.planDuration, this.selectedPlan);

            this.loading = true;

            setTimeout(() => {
                this.loading = false;
                this.$router.push({
                    name: 'payment', params: {
                        planDuration: this.planDuration,
                        selectedPlan: this.selectedPlan,
                    }
                });
            }, 3000);
        }
    },
}
</script>

<style scoped lang="scss">
.table-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 auto;
    margin-top: 50px;
    gap: 40px;
    max-width: 900px;
}

.submit-btn {
    width: 250px;
}

.toggle-plan-duration-btns {
    width: 200px;
    background: #26528C;
    padding: 10px;
    margin: 10px;
    border-radius: 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #fff;
    transition: all 0.3s ease-in-out;


    .toggle-btn {
        padding: 10px;
        border-radius: 30px;
        font-size: 14px;
        width: 80px;
        transition: all 0.3s ease-in-out;

    }

    .toggle-active {
        transition: all 0.3s ease-in-out;
        background: #fff;
        color: #26528C;
    }
}

.header-box {
    height: 80px;
    width: 80px;
    background: #7D96B9;
    cursor: pointer;
    margin: 10px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    transition: all 0.3s ease-in-out;
}

.header-box:hover {
    background: #26528C;
}

.header-box-active {
    background: #26528C;
    position: relative;
}

.header-box-active::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 20px;
    height: 20px;
    background-color: #26528C;
}

td {
    font-size: 15px !important;
    font-weight: 600 !important;
    color: #737373;
}
</style>