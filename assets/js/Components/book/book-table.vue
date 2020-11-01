<template>
  <v-data-table :headers="headers"
                :items="books"
                :items-per-page="15"
                class="elevation-1"
                dense
  >
    <template v-slot:top>
      <book-table-toolbar :books="books"/>
    </template>
    <template v-slot:[`item.renter`]="{ item }">
      <book-renter-cell :item="item"/>
    </template>
    <template v-slot:[`item.action`]="{ item }">
      <book-action-cell :item="item"
                        @delete="emitDelete(item)"
                        @return="emitReturn(item)"
                        @reserve="emitReserve(item)"
                        @rent="emitRent(item)"
      />
    </template>
  </v-data-table>
</template>

<script>
import BookTableToolbar from '@/Components/book/book-table-toolbar';
import BookRenterCell from '@/Components/book/book-renter-cell';
import BookActionCell from '@/Components/book/book-action-cell';
import {ACTIONS} from '@/variables';

export default {
  name: 'BookTable',
  components: {
    BookActionCell,
    BookRenterCell,
    BookTableToolbar,
  },
  props: {
    books: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      headers: [
        {
          text: 'Tytuł',
          align: 'start',
          value: 'name',
        },
        {
          text: 'Właściciel',
          value: 'owner',
          align: 'center',
        },
        {
          text: 'Wypożyczona przez',
          value: 'renter',
          align: 'center',
        },
        {
          value: 'action',
          align: 'right',
          sortable: false,
        },
      ],
    };
  },
  methods: {
    emitRent(item) {
      this.$emit('click', item, ACTIONS.RENT);
    },
    emitDelete(item) {
      this.$emit('click', item, ACTIONS.DELETE);
    },
    emitReturn(item) {
      this.$emit('click', item, ACTIONS.RETURN);
    },
    emitReserve(item) {
      this.$emit('click', item, ACTIONS.RESERVE);
    },
  },
};
</script>

<style scoped>
</style>
