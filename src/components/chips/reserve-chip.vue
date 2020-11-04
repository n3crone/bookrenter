<template>
  <custom-chip @click="click" icon="mdi-book-lock" text="Zarezerwuj" color="blue-grey"/>
</template>

<script>
import CustomChip from '@/components/chips/custom-chip';

export default {
  name: 'ReserveChip',
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
