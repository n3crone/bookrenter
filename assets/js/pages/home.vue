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

      console.log(this.confirmAction);
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
    },
    deleteBook() {
      this.books.splice(this.editedIndex, 1)
    },
    returnBook() {
      this.books[this.editedIndex].renter = null;
      this.books[this.editedIndex].rentDate = null;
    },
    reserveBook() {
      this.books[this.editedIndex].renter = 'Reserve';
    },
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
          from: 'Zwrot',
          message: `Sure, I'll see you later.`,
          time: '10:42am',
          color: 'orange',
        },
        {
          from: 'Wypożyczenie',
          message: 'Yeah, sure. Does 1:00pm work?',
          time: '10:37am',
          color: 'teal',
        },
        {
          from: 'Zwrot',
          message: 'Did you still want to grab lunch today?',
          time: '9:57am',
          color: 'orange',
        },
        {
          from: 'Zwrot',
          message: 'Did you still want to grab lunch today?',
          time: '9:11am',
          color: 'red',
        },
        {
          from: 'Zwrot',
          message: 'Did you still want to grab lunch today?',
          time: '9:12am',
          color: 'blue',
        },
        {
          from: 'Zwrot',
          message: 'Did you still want to grab lunch today?',
          time: '19:47am',
          color: 'orange',
        },
        {
          from: 'Zwrot',
          message: 'Did you still want to grab lunch today?',
          time: '9:47am',
          color: 'orange',
        },
      ],
    }
  },
}
</script>

<style scoped>
</style>
