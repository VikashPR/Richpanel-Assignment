<template>
    <section class="table-container">
        <h1 class="text-center">Choose the right plan for you</h1>
        <v-simple-table style="max-width: 900px; width:100%">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">
                            <div class="toggle-plan-duration-btns">
                                <button @click="planDuration = 'monthly'"
                                    :class="{ 'toggle-active': planDuration == 'monthly' }"
                                    class="toggle-btn">Monthly</button>
                                <button @click="planDuration = 'yearly'"
                                    :class="{ 'toggle-active': planDuration == 'yearly' }"
                                    class="toggle-btn">Yearly</button>
                            </div>
                        </th>
                        <th class="text-left">
                            Mobile
                        </th>
                        <th class="text-left">
                            Basic
                        </th>
                        <th class="text-left">
                            Standard
                        </th>
                        <th class="text-left">
                            Premium
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            Yearly Price
                        </td>
                        <td v-for="item in planItems" :key="item.name">
                            {{ item.price }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Video quality
                        </td>
                        <td v-for="item in planItems" :key="item.name">
                            {{ item.videoQuality }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Resolution
                        </td>
                        <td v-for="item in planItems" :key="item.name">
                            {{ item.resolution }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Number of active screens at one time
                        </td>
                        <td v-for="item in planItems" :key="item.name">
                            {{ item.NoOfActiveScreens }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Devices you can use to watch
                        </td>
                        <td v-for="item in planItems" :key="item.name">
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
            @click="loader = 'loading'">
            Next
        </v-btn>
    </section>
</template>

<script>
export default {
    data() {
        return {
            loader: null,
            loading: false,
            planDuration: 'monthly',
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
        }
    },
    computed: {
        planItems() {
            return this.planDuration === 'monthly' ? this.monthly : this.yearly;
        }
    },
    watch: {
        loader() {
            const l = this.loader
            this[l] = !this[l]

            setTimeout(() => (this[l] = false), 3000)

            this.loader = null
        },
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

    .toggle-btn {
        padding: 10px;
        border-radius: 30px;
        font-size: 14px;
        width: 80px;
    }

    .toggle-active {
        background: #fff;
        color: #26528C;
    }

}</style>