<template>
  <v-app>
    <v-container data-app>
      <v-row>
        <v-col offset-xl="1" xl="3" lg="4" md="12">
          <sidebar :history="history"/>
        </v-col>
        <v-col xl="7" lg="8" md="12">
          <book-table :books="books" @rent="rentBook" @return="returnBook" @delete="deleteBook" @reserve="reserveBook"/>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import BookTable from "@/Components/book/book-table";
import Sidebar from "@/Components/sidebar/sidebar";

export default {
  name: 'Home',
  components: {
    Sidebar,
    BookTable
  },
  methods: {
    rentBook(editedIndex) {
      this.books[editedIndex].renter = 'Jan Kowalski';
      this.books[editedIndex].rentDate = '31-10-2020';
    },
    deleteBook(editedIndex) {
      this.books.splice(editedIndex, 1)
    },
    returnBook(editedIndex) {
      this.books[editedIndex].renter = null;
      this.books[editedIndex].rentDate = null;
    },
    reserveBook(editedIndex) {
      this.books[editedIndex].renter = 'Reserve';
    },
  },
  data() {
    return {
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
