<template>
  <v-card>
    <v-card-text>
      <v-card-title>
        {{ user.name }}
      </v-card-title>
      <div class="pl-4">
        Wypożyczenia
      </div>
      <book-return-list :books="books" @return="emitReturn"/>
      <div class="font-weight-bold ml-6 mb-2 mt-4">
        Historia
      </div>
      <history-timeline :history="history"/>
    </v-card-text>
  </v-card>
</template>

<script>
import BookReturnList from '@/Components/book/book-return-list';
import {ACTIONS} from '@/variables';
import HistoryTimeline from '@/Components/history-timeline';

export default {
  name: 'Sidebar',
  components: {
    HistoryTimeline,
    BookReturnList,
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
    user: {
      type: Object,
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
