<template>
  <v-card>
    <v-card-text>
      <v-card-title>
        {{ user.name }}
      </v-card-title>
      <div v-if="history.length">
        <div class="font-weight-bold ml-6 mb-2 mb-4">
          Historia
        </div>
        <history-timeline :history="history"/>
      </div>
      <div class="font-weight-bold pl-4" v-if="books.length">
        Wypożyczenia
      </div>
      <book-list :books="books" action="return" @click="emitReturn"/>
      <div class="font-weight-bold pl-4" v-if="userBooks.length">
        Twoje książki
      </div>
      <book-list :books="userBooks" action="delete" @click="emitDelete"/>
    </v-card-text>
  </v-card>
</template>

<script>
import BookList from '@/components/book/book-list';
import { ACTIONS } from '@/variables';
import HistoryTimeline from '@/components/history-timeline';

export default {
  name: 'Sidebar',
  components: {
    HistoryTimeline,
    BookList,
  },
  props: {
    history: {
      type: Array,
      required: true,
    },
    books: {
      type: Array,
      required: true,
    },
    userBooks: {
      type: Array,
      required: true,
    },
    user: {
      required: true,
    },
  },
  methods: {
    emitReturn(book) {
      this.$emit('click', book, ACTIONS.RETURN);
    },
    emitDelete(book) {
      this.$emit('click', book, ACTIONS.DELETE);
    },
  },
};
</script>

<style scoped>
</style>
