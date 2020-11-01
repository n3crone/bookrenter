<template>
  <v-app>
    <v-container data-app>
      <confirm-dialog
          :show-dialog="confirmDialog"
          :text="dialogText"
          @confirm="confirm"
      />
      <v-row>
        <v-col offset-xl="1" xl="3" lg="4" md="12">
          <sidebar :history="history"
                   :books="books.filter((book) => book.renter === 'Jan Kowalski')"
                   @return="showDialog" :user="user"/>
        </v-col>
        <v-col xl="7" lg="8" md="12">
          <book-table :books="books"
                      @rent="showDialog"
                      @return="showDialog"
                      @delete="showDialog"
                      @reserve="showDialog"/>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import BookTable from '@/Components/book/book-table';
import Sidebar from '@/Components/sidebar';
import ConfirmDialog from '@/Components/confirm-dialog';
import {ACTIONS} from '@/variables';

export default {
  name: 'Home',
  components: {
    ConfirmDialog,
    Sidebar,
    BookTable,
  },
  methods: {
    showDialog(item, action) {
      this.dialogText = `📚 Chcesz ${this.typeToHumanString(action)} '${item.name}'?`;
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
          this.rentBook();
          return;
        case ACTIONS.RETURN:
          this.returnBook();
          return;
        case ACTIONS.DELETE:
          this.deleteBook();
          return;
        case ACTIONS.RESERVE:
          this.reserveBook();
          return;
      }
    },
    rentBook() {
      this.books[this.editedIndex].renter = 'Jan Kowalski';
      this.books[this.editedIndex].rentDate = '31-10-2020';
      this.pushToHistory(ACTIONS.RENT);
    },
    deleteBook() {
      this.books.splice(this.editedIndex, 1);
      this.pushToHistory(ACTIONS.DELETE);
    },
    returnBook() {
      this.books[this.editedIndex].renter = null;
      this.books[this.editedIndex].rentDate = null;
      this.pushToHistory(ACTIONS.RETURN);
    },
    reserveBook() {
      this.books[this.editedIndex].renter = 'Reserve';
      this.pushToHistory(ACTIONS.RESERVE);
    },
    pushToHistory(type) {
      this.history.unshift({
        type: type,
        bookName: this.books[this.editedIndex].name,
        date: '15-12-2020',
      });
    },
    typeToHumanString(type) {
      switch (type) {
        case ACTIONS.RETURN:
          return 'zwrócić';
        case ACTIONS.DELETE:
          return 'usunąć';
        case ACTIONS.RESERVE:
          return 'zarezerować';
        case ACTIONS.RENT:
          return 'wypożyczyć';
      }
    },
  },
  data() {
    return {
      confirmDialog: false,
      dialogText: null,
      user: {
        name: 'Jan Kowalski',
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
          type: ACTIONS.DELETE,
          bookName: 'Testowanie kodu w praktyce',
          date: '11-11-2020',
        },
        {
          type: ACTIONS.RETURN,
          bookName: `Cisza w sieci`,
          date: '31-10-2020',
        },
        {
          type: ACTIONS.RESERVE,
          bookName: `Czysta architektura.`,
          date: '31-09-2020',
        },
        {
          type: ACTIONS.RENT,
          bookName: 'Cisza w sieci',
          date: '27-09-2020',
        },
        {
          type: ACTIONS.ADD,
          bookName: 'Testowanie kodu w praktyce',
          date: '20-09-2020',
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>
