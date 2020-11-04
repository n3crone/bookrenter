<template>
  <v-list dense>
    <v-list-item v-for="book in books" :key="book.name">
      <v-list-item-content>
        <v-list-item-title>
          <return-chip v-if="action === 'return'" @click="emitReturn(book)"/>
          <delete-chip v-else-if="action === 'delete' && !book.renter" @click="emitDelete(book)"/>
          <v-chip v-else color="black" outlined small>
            {{ book.renter.name }}
          </v-chip>
          {{ book.name }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import ReturnChip from '@/components/chips/return-chip';
import { ACTIONS } from '@/variables';
import DeleteChip from '@/components/chips/delete-chip';

export default {
  name: 'BookList',
  components: { DeleteChip, ReturnChip },
  props: {
    books: {
      required: true,
    },
    action: {
      required: true,
    },
  },
  methods: {
    emitReturn(item) {
      this.$emit('click', item, ACTIONS.RETURN);
    },
    emitDelete(item) {
      this.$emit('click', item, ACTIONS.DELETE);
    },
  },
};
</script>

<style scoped>

</style>
