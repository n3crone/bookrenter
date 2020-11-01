<template>
  <custom-chip @click="click"
               icon="mdi-trash-can-outline"
               text="Usuń"
               color="red darken-3"/>
</template>

<script>
import CustomChip from '@/Components/chips/custom-chip';

export default {
  name: 'DeleteChip',
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
