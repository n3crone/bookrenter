<template>
  <custom-chip @click="click" text="Usuń" color="error"/>
</template>

<script>
import CustomChip from '@/components/chips/custom-chip';

export default {
  name: 'DeleteChip',
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
