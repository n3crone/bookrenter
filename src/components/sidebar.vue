<template>
  <v-card>
    <v-card-text>
      <v-card-title class="d-flex justify-space-between align-center">
        <div>
        <div>{{ user.name }}</div>
        <div class="text-body-2">{{ user.department }}</div>
        </div>
        <custom-chip icon="mdi-logout" text="Wyloguj" @click="logout" color="teal" />
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
import AddChip from './chips/add-chip';
import CustomChip from './chips/custom-chip';

export default {
  name: 'Sidebar',
  components: {
    CustomChip,
    AddChip,
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
    logout() {
      this.$store.dispatch('logout');
    },
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
