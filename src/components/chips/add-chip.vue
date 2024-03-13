<template>
  <custom-chip @click="click" icon="mdi-plus" text="dodaj książkę" color="info"/>
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
