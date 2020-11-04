<template>
  <custom-chip @click="click" icon="mdi-book-plus-outline" text="Dodaj" color="teal"/>
</template>

<script>
import CustomChip from '@/components/chips/custom-chip';

export default {
  name: 'AddChip',
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
