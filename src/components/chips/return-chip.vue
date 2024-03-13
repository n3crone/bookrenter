<template>
  <custom-chip @click="click" text="Zwróć" color="warning"/>
</template>

<script>
import CustomChip from '@/components/chips/custom-chip';

export default {
  name: 'ReturnChip',
  components: { CustomChip },
  methods: {
    click() {
      this.$emit('click', true);
    },
  },
};
</script>

<style scoped>

</style>
