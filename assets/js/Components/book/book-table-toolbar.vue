<template>
  <v-toolbar flat>
    <div>
      <div class="text-caption">
        {{ books.length }} książek w katalogu
      </div>
      <div class="text-caption">
        {{ books.filter((book) => book.renter === null).length }} dostępnych
      </div>
      <div class="text-caption">
        {{ books.filter((book) => book.renter !== null).length }} wypożyczonych
      </div>
    </div>
    <v-spacer></v-spacer>
    <add-chip @click="addClick"/>
  </v-toolbar>
</template>

<script>
import AddChip from '@/Components/chips/add-chip';
import {ACTIONS} from '@/variables';

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
