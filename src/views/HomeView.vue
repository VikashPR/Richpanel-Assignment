<template>
  <div>
    <PlanSelection
    :yearly="yearly"
    :monthly="monthly"
    />
  </div>
</template>

<script>
import PlanSelection from '@/components/PlanSelection.vue'
import { fetchPlans } from '../services/FetchPlansService.js'

export default {
  components: {
    PlanSelection
  },
  data() {
    return {
      yearly: [],
        monthly: [],
    }
  },
  created() {
    fetchPlans()
      .then((response) => {
        console.log(response)
        this.monthly = response[0].allPlans
        this.yearly = response[1].allPlans
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>

<style>

</style>>