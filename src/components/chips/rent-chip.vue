<template>
  <custom-chip @click="click" icon="mdi-book-account-outline" text="Wypożycz"/>
</template>

<script>
import CustomChip from '@/components/chips/custom-chip';

export default {
  name: 'RentChip',
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
