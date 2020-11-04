<template>
  <v-toolbar flat>
    <div>
      <div class="text-subtitle-2">
        📚 {{ books.length }} Książek
      </div>
      <div class="text-subtitle-2">
        📗 {{ books.filter((book) => book.renter === null).length }} Dostępnych
      </div>
      <div class="text-subtitle-2">
        📕 {{ books.filter((book) => book.renter !== null).length }} Wypożyczonych
      </div>
    </div>
    <v-spacer></v-spacer>
    <add-chip @click="addClick"/>
  </v-toolbar>
</template>

<script>
import AddChip from '@/components/chips/add-chip';
import { ACTIONS } from '@/variables';

export default {
  name: 'BookTableToolbar',
  components: {
    AddChip,
  },
  props: {
    books: {
      type: Array,
      required: true,
    },
  },
  methods: {
    addClick() {
      this.$emit(ACTIONS.ADD, true);
    },
  },
};
</script>

<style scoped>

</style>
