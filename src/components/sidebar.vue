<template>
  <v-card>
    <v-card-text>
      <v-card-title>
        {{ user.name }}
      </v-card-title>
      <div class="pl-4" v-if="books.length">
        Wypożyczenia
      </div>
      <book-list :books="books" action="return" @return="emitReturn"/>
      <div class="pl-4" v-if="userBooks.length">
        Twoje książki
      </div>
      <book-list :books="userBooks" action="delete" @return="emitReturn"/>
      <div v-if="history.length">
        <div class="font-weight-bold ml-6 mb-2 mt-4">
          Historia
        </div>
        <history-timeline :history="history"/>
      </div>
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
    emitReturn(...args) {
      this.$emit(ACTIONS.RETURN, ...args);
    },
  },
};
</script>

<style scoped>
</style>
