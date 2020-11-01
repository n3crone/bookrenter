<template>
  <v-data-table dense :headers="headers" :items="books" :items-per-page="15" class="elevation-1">
    <template v-slot:top>
      <book-table-toolbar :books="books"/>
    </template>
    <template v-slot:item.renter="{ item }">
      <book-renter-cell :item="item"/>
    </template>
    <template v-slot:item.action="{ item }">
      <book-action-cell :item="item" @delete="emitDelete(item)" @return="emitReturn(item)"
                        @reserve="emitReserve(item)" @rent="emitRent(item)"
      />
    </template>
  </v-data-table>
</template>

<script>
import BookTableToolbar from "@/Components/book/book-table-toolbar";
import BookRenterCell from "@/Components/book/book-renter-cell";
import BookActionCell from "@/Components/book/book-action-cell";
import {ACTIONS} from "@/variables";

export default {
  name: 'BookTable',
  components: {
    BookActionCell,
    BookRenterCell,
    BookTableToolbar
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
          value: 'name'
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
    }
  },
  methods: {
    emitRent(item) {
      this.$emit(ACTIONS.RENT, item, ACTIONS.RENT);
    },
    emitDelete(item) {
      this.$emit(ACTIONS.DELETE, item, ACTIONS.DELETE);
    },
    emitReturn(item) {
      this.$emit(ACTIONS.RETURN, item, ACTIONS.RETURN);
    },
    emitReserve(item) {
      this.$emit(ACTIONS.RESERVE, item, ACTIONS.RESERVE);
    },
  }
}
</script>

<style scoped>
</style>
