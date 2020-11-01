<template>
  <v-list dense>
    <v-list-item v-for="book in books" :key="book.name">
      <v-list-item-content>
        <v-list-item-title>
          <return-chip @click="emitReturn(book)"/>
          {{ book.name }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import ReturnChip from '@/Components/chips/return-chip';
import {ACTIONS} from '@/variables';

export default {
  name: 'BookReturnList',
  components: {ReturnChip},
  props: {
    books: {
      required: true,
    },
  },
  methods: {
    emitReturn(item) {
      this.$emit('return', item, ACTIONS.RETURN);
    },
  },
};
</script>

<style scoped>

</style>
