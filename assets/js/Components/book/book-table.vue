<template>
  <v-data-table dense :headers="headers" :items="books" :items-per-page="15" class="elevation-1">
    <template v-slot:top>
      <book-table-toolbar :books="books"/>
      <confirm-dialog :show-dialog="confirmDialog" @confirm="confirm" :text="dialogText"/>
    </template>
    <template v-slot:item.renter="{ item }">
      <book-renter-cell :item="item"/>
    </template>
    <template v-slot:item.action="{ item }">
      <book-action-cell :item="item" @delete="deleteDialog(item)" @return="returnDialog(item)"
                        @reserve="reserveDialog(item)" @rent="rentDialog(item)"
      />
    </template>
  </v-data-table>
</template>

<script>
import BookTableToolbar from "@/Components/book/book-table-toolbar";
import ConfirmDialog from "@/Components/confirm-dialog";
import BookRenterCell from "@/Components/book/book-renter-cell";
import BookActionCell from "@/Components/book/book-action-cell";

export default {
  name: 'BookTable',
  components: {
    BookActionCell,
    BookRenterCell,
    ConfirmDialog,
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
      confirmDialog: false,
      dialogText: '',
      editedIndex: -1,
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
      ACTIONS: {
        RENT: 'RENT',
        DELETE: 'DELETE',
        RETURN: 'RETURN',
        RESERVE: 'RESERVE',
      },
    }
  },
  methods: {
    rentDialog(item) {
      this.showDialog(`📚 Chcesz wypożyczyć '${item.name}'?`, item, this.ACTIONS.RENT);
    },
    deleteDialog(item) {
      this.showDialog(`📚 Chcesz usunąć '${item.name}'?`, item, this.ACTIONS.DELETE);
    },
    returnDialog(item) {
      this.showDialog(`📚 Chcesz zwrócić '${item.name}'?`, item, this.ACTIONS.RETURN);
    },
    reserveDialog(item) {
      this.showDialog(`📚 Chcesz zarezerwować '${item.name}'?`, item, this.ACTIONS.RESERVE);
    },
    showDialog(text, item, action) {
      this.dialogText = text;
      this.editedIndex = this.books.indexOf(item);
      this.confirmDialog = true;
      this.confirmAction = action;
    },
    confirm(confirm) {
      this.confirmDialog = false;
      if (!confirm) {
        return;
      }

      switch (this.confirmAction) {
        case this.ACTIONS.RENT:
          this.rent();
          return;
        case this.ACTIONS.RETURN:
          this.return();
          return;
        case this.ACTIONS.DELETE:
          this.delete();
          return;
        case this.ACTIONS.RESERVE:
          this.reserve();
          return;
      }
    },
    rent() {
      this.books[this.editedIndex].renter = 'Jan Kowalski';
      this.books[this.editedIndex].rentDate = '31-10-2020';
    },
    delete() {
      this.books.splice(this.editedIndex, 1)
    },
    return() {
      this.books[this.editedIndex].renter = null;
      this.books[this.editedIndex].rentDate = null;
    },
    reserve() {
      this.books[this.editedIndex].renter = 'Reserve';
    },
  }
}
</script>

<style scoped>
</style>
