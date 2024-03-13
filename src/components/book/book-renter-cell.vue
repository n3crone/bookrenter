<template>
  <div v-if="item.renter">{{ item.rentDate }}</div>
  <div v-else class="teal--text">-</div>
</template>

<script>
export default {
  name: 'BookRenterCell',
  props: {
    item: {
      required: true,
    },
  },
};
</script>

<style scoped>

</style>
