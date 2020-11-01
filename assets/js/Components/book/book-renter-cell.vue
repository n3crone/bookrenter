<template>
  <v-tooltip v-if="item.renter" top>
    <template v-slot:activator="{ on, attrs }">
      <div class="blue-grey--text" v-bind="attrs" v-on="on">
        {{ item.renter }}
      </div>
    </template>
    <span>{{ item.rentDate }}</span>
  </v-tooltip>
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
