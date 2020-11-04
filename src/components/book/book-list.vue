<template>
  <v-list dense>
    <v-list-item v-for="book in books" :key="book.name">
      <v-list-item-content>
        <v-list-item-subtitle>
          <return-chip v-if="action === 'return'" @click="emitClick(book)"/>
          <delete-chip v-else-if="action === 'delete' && !book.renter" @click="emitClick(book)"/>
          <v-chip v-else color="black" outlined small>
            {{ book.renter.name }}
          </v-chip>
          {{ book.name }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import ReturnChip from '@/components/chips/return-chip';
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
    emitClick(item) {
      this.$emit('click', item);
    },
  },
};
</script>

<style scoped>

</style>
