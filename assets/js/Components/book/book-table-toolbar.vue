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
    <book-add :books="books"/>
  </v-toolbar>
</template>

<script>
import BookAdd from '@/Components/book/book-add';

export default {
  name: 'BookTableToolbar',
  components: {
    BookAdd,
  },
  props: {
    books: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>
