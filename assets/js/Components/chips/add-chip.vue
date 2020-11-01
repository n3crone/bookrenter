<template>
  <custom-chip @click="click" icon="mdi-book-outline" text="Dodaj" color="teal"/>
</template>

<script>
import CustomChip from '@/Components/chips/custom-chip';

export default {
  name: 'AddChip',
  components: {CustomChip},
  methods: {
    click() {
      this.$emit('click', true);
    },
  },
};
</script>

<style scoped>

</style>
