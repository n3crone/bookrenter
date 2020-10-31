<template>
  <v-data-table
      dense
      :headers="headers"
      :items="books"
      :items-per-page="15"
      class="elevation-1"
  >
    <template v-slot:top>
      <book-table-toolbar :books="books"/>
      <v-dialog v-model="dialogConfirm" max-width="300px">
        <v-card>
          <v-card-title class="headline justify-center">📚 Chesz wypożyczyć?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete">Nie</v-btn>
            <v-btn color="blue darken-1" text @click="deleteItemConfirm">Tak</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:item.renter="{ item }">
      <v-tooltip v-if="item.renter" top>
        <template v-slot:activator="{ on, attrs }">
          <div class="blue-grey--text" v-bind="attrs" v-on="on">
            {{ item.renter }}
          </div>
        </template>
        <span>{{ item.rentDate }}</span>
      </v-tooltip>
      <div v-else class="teal--text">-</div>
    </template>
    <template v-slot:item.action="{ item }">
      <v-chip v-if="item.owner === 'Ja'" color="red darken-3" outlined small>
        <v-icon left small>
          mdi-trash-can-outline
        </v-icon>
        Usuń
      </v-chip>
      <v-chip v-else-if="item.renter === 'Ja'" color="blue" outlined small class="return-chip">
        <v-icon left small>
          mdi-keyboard-return
        </v-icon>
        Zwróć
      </v-chip>
      <v-chip v-else-if="item.renter" color="blue-grey" outlined small>
        <v-icon left small>
          mdi-book-lock
        </v-icon>
        Zarezerwuj
      </v-chip>
      <v-chip v-else color="green" outlined @click="rentBook(item)" small>
        <v-icon left small>
          mdi-book-plus
        </v-icon>
        Wypożycz
      </v-chip>
    </template>
  </v-data-table>
</template>

<script>
import BookTableToolbar from "@/Components/book-table-toolbar";

export default {
  name: 'BookTable',
  components: {
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
      dialogConfirm: false,
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
          text: '',
          value: 'action',
          align: 'right',
          sortable: false,
        },
      ],
    }
  },

  watch: {
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  methods: {
    rentBook(item) {
      this.editedIndex = this.books.indexOf(item)
      this.newBook = Object.assign({}, item)
      this.dialogConfirm = true
    },

    closeDelete() {
      this.dialogConfirm = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    deleteItemConfirm() {
      this.books[this.editedIndex].renter = 'Ja';
      this.books[this.editedIndex].rentDate = '31-10-2020';
      this.closeDelete()
    },
  }
}
</script>

<style scoped>
.v-chip {
  width: 130px;
  justify-content: center;
}
</style>
