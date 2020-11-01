<template>
  <v-app>
    <v-container data-app>
      <confirm-dialog :show-dialog="confirmDialog" @confirm="confirm" :text="dialogText"/>
      <v-row>
        <v-col offset-xl="1" xl="3" lg="4" md="12">
          <sidebar :history="history" :books="books.filter((book) => book.renter === 'Jan Kowalski')" @return="showDialog"/>
        </v-col>
        <v-col xl="7" lg="8" md="12">
          <book-table :books="books" @rent="showDialog" @return="showDialog" @delete="showDialog" @reserve="showDialog"/>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import BookTable from "@/Components/book/book-table";
import Sidebar from "@/Components/sidebar/sidebar";
import ConfirmDialog from "@/Components/confirm-dialog";
import {ACTIONS} from "@/variables";

export default {
  name: 'Home',
  components: {
    ConfirmDialog,
    Sidebar,
    BookTable
  },
  methods: {
    showDialog(item, action) {
      this.dialogText = `📚 Chcesz ${action} '${item.name}'?`;
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
        case ACTIONS.RENT:
          this.rentBook()
          return;
        case ACTIONS.RETURN:
          this.returnBook()
          return;
        case ACTIONS.DELETE:
          this.deleteBook()
          return;
        case ACTIONS.RESERVE:
          this.reserveBook()
          return;
      }
    },
    rentBook() {
      this.books[this.editedIndex].renter = 'Jan Kowalski';
      this.books[this.editedIndex].rentDate = '31-10-2020';
      this.pushToHistory('rent');
    },
    deleteBook() {
      this.books.splice(this.editedIndex, 1)
      this.pushToHistory('delete');
    },
    returnBook() {
      this.books[this.editedIndex].renter = null;
      this.books[this.editedIndex].rentDate = null;
      this.pushToHistory('return');
    },
    reserveBook() {
      this.books[this.editedIndex].renter = 'Reserve';
      this.pushToHistory('reserve');
    },
    pushToHistory(type) {
      this.history.unshift({
        type: type,
        bookName: this.books[this.editedIndex].name,
        date: '15-12-2020',
      });
    }
  },
  data() {
    return {
      confirmDialog: false,
      dialogText: null,
      user: {
        name: 'Jan Kowalski'
      },
      books: [
        {
          name: 'Wzorce projektowe',
          owner: 'Jan Kowalski',
          renter: 'Jan Kowalski',
          rentDate: '30-10-2020',
        },
        {
          name: 'Docker',
          owner: 'Tech',
          renter: 'Jan Kowalski',
          rentDate: '30-10-2020',
        },
        {
          name: 'Czysta architektura',
          owner: 'Tech',
          renter: null,
          rentDate: null,
        },
        {
          name: 'MongoDB w akcji',
          owner: 'Jan Kowalski',
          renter: null,
          rentDate: null,
        },
        {
          name: 'Bezpieczeństwo aplikacji mobilnych podręcznik hakera',
          owner: 'Tech',
          renter: 'Jan Kowalski',
          rentDate: '30-10-2020',
        },
        {
          name: 'Cisza w sieci',
          owner: 'Tech',
          renter: 'Test Testowy',
          rentDate: '30-10-2020',
        },
        {
          name: 'Testowanie kodu w praktyce',
          owner: 'Tech',
          renter: null,
          rentDate: null,
        },
        {
          name: 'Agile Przewodnik po zwinnych  metodykach programowania',
          owner: 'Tech',
          renter: null,
          rentDate: null,
        },
      ],
      history: [
        {
          type: 'delete',
          bookName: 'Testowanie kodu w praktyce',
          date: '11-11-2020',
        },
        {
          type: 'return',
          bookName: `Cisza w sieci`,
          date: '31-10-2020',
        },
        {
          type: 'reserve',
          bookName: `Czysta architektura.`,
          date: '31-09-2020',
        },
        {
          type: 'rent',
          bookName: 'Cisza w sieci',
          date: '27-09-2020',
        },
        {
          type: 'add',
          bookName: 'Testowanie kodu w praktyce',
          date: '20-09-2020',
        },
      ],
    }
  },
}
</script>

<style scoped>
</style>
