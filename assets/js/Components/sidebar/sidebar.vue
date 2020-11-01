<template>
  <v-card>
    <v-card-text>
      <v-card-title>Jan Kowalski</v-card-title>
      <div class="pl-4">Wypożyczenia</div>
      <book-return-list :books="books" @return="emitReturn"/>
      <div class="font-weight-bold ml-6 mb-2 mt-4">
        Historia
      </div>
      <v-timeline align-top dense>
        <v-timeline-item v-for="historyRow in history" :key="historyRow.time" :color="typeToColor(historyRow.type)" small>
          <div>
            <div class="font-weight-normal">
              <strong>{{ historyRow.type|typeToHumanString }}</strong> @{{ historyRow.date }}
            </div>
            <div>{{ historyRow.bookName }}</div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>

<script>
import RentChip from "@/Components/chips/rent-chip";
import ReturnChip from "@/Components/chips/return-chip";
import BookReturnList from "@/Components/book/book-return-list";

export default {
  name: 'Sidebar',
  components: {BookReturnList, ReturnChip, RentChip},
  props: {
    history: {
      type: Array,
      required: true,
    },
    books: {
      type: Array,
      required: true,
    },
  },
  methods: {
    emitReturn(...args) {
      this.$emit('return', ...args);
    },
    typeToColor(type) {
      switch (type) {
        case 'add':
          return 'teal';
        case 'return':
          return 'blue';
        case 'delete':
          return 'red darken-3';
        case 'reserve':
          return 'blue-grey';
        case 'rent':
          return 'green';
      }
    },
  },
  filters: {
    typeToHumanString(type) {
      switch (type) {
        case 'add':
          return 'Dodano';
        case 'return':
          return 'Zwrot';
        case 'delete':
          return 'Usunięto';
        case 'reserve':
          return 'Zarezerwowano';
        case 'rent':
          return 'Wypożyczono';
      }
    },
  },
}
</script>

<style scoped>
</style>
