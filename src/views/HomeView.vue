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
export default {
  components: {
    PlanSelection
  },
  data() {
    return {
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
  }
}
</script>

<style>

</style>>