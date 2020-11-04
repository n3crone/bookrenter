<template>
  <custom-chip @click="click" icon="mdi-book-check-outline" text="Zwróć" color="blue"/>
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
