<template>
  <v-container data-app>
    <confirm-dialog :show-dialog="confirmDialog" :text="dialogText" @confirm="confirm"/>
    <book-add-dialog :show-dialog="addDialog" @confirm="confirm"/>
    <v-row class="text-h2 justify-center">📚 BookRenter</v-row>
    <v-row>
      <v-col offset-xl="1" xl="3" lg="4" cols="12">
        <sidebar :history="history.filter((historyRow) => historyRow.user && historyRow.user.id === userProfile.id)"
                 :books="books.filter((book) => book.renter && book.renter.id === userProfile.id)"
                 :user-books="books.filter((book) => book.owner.id === userProfile.id)"
                 @click="showConfirmDialog" :user="userProfile"/>
      </v-col>
      <v-col xl="7" lg="8" cols="12" order="first" order-lg="last">
        <book-table :books="books" :user="userProfile"
                    @confirm-dialog="showConfirmDialog"
                    @add-dialog="showAddDialog"/>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar">{{ snackbarText }}</v-snackbar>
  </v-container>
</template>

<script>
import BookTable from '@/components/book/book-table';
import Sidebar from '@/components/sidebar';
import ConfirmDialog from '@/components/confirm-dialog';
import { ACTIONS } from '@/variables';
import BookAddDialog from '@/components/book/book-add-dialog';
import { db, Timestamp } from '@/db';
import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
    BookAddDialog,
    ConfirmDialog,
    Sidebar,
    BookTable,
  },
  firestore: {
    books: db.collection('books'),
    history: db.collection('history')
      .orderBy('timestamp', 'desc'),
  },
  methods: {
    showConfirmDialog(item, action) {
      this.dialogText = `📚 Chcesz ${this.typeToHumanString(action)} '${item.name}'?`;
      this.editedIndex = this.books.indexOf(item);
      this.confirmDialog = true;
      this.confirmAction = action;
    },
    showAddDialog() {
      this.addDialog = true;
      this.confirmAction = ACTIONS.ADD;
    },
    confirm(confirm) {
      this.confirmDialog = false;
      this.addDialog = false;
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
        case ACTIONS.ADD:
          this.addBook(confirm);
          return;
        default:
          throw new Error('Unknown type');
      }
    },
    rentBook() {
      this.books[this.editedIndex].renter = this.userProfile;
      this.books[this.editedIndex].rentDate = Timestamp.now();
      db.collection('books')
        .doc(this.books[this.editedIndex].id)
        .set(this.books[this.editedIndex])
        .then(() => {
          this.snackbar = true;
          this.snackbarText = `Wypożyczono książkę "${this.books[this.editedIndex].name}"`;
        });
      this.pushToHistory(ACTIONS.RENT);
    },
    deleteBook() {
      db.collection('books')
        .doc(this.books[this.editedIndex].id)
        .delete()
        .then(() => {
          this.snackbar = true;
          this.snackbarText = `Usunięto książkę "${this.books[this.editedIndex].name}"`;
        });
      this.pushToHistory(ACTIONS.DELETE, this.books[this.editedIndex].name);
    },
    returnBook() {
      this.books[this.editedIndex].renter = null;
      this.books[this.editedIndex].rentDate = null;
      db.collection('books')
        .doc(this.books[this.editedIndex].id)
        .set(this.books[this.editedIndex])
        .then(() => {
          this.snackbar = true;
          this.snackbarText = `Oddano książkę "${this.books[this.editedIndex].name}"`;
        });
      this.pushToHistory(ACTIONS.RETURN);
    },
    addBook(book) {
      db.collection('books')
        .add({ ...book, owner: this.userProfile, status: 'free' });
      this.pushToHistory(ACTIONS.ADD, book.name);
    },
    pushToHistory(type, bookName = null) {
      const historyRow = {
        user: this.userProfile,
        type,
        bookName: bookName || this.books[this.editedIndex].name,
        timestamp: Timestamp.now(),
      };
      db.collection('history')
        .add(historyRow);
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
        default:
          throw new Error('Unknown type');
      }
    },
  },
  computed: {
    ...mapState(['userProfile']),
  },
  data() {
    return {
      snackbar: false,
      snackbarText: null,
      confirmDialog: false,
      addDialog: false,
      dialogText: '',
      userBooks: [],
      books: [],
      history: [],
    };
  },
};
</script>

<style scoped>
</style>
