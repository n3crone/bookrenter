<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="teal" dark class="mb-2" v-bind="attrs" v-on="on" outlined small>
        <v-icon small>
          mdi-book-outline
        </v-icon>
        Dodaj
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Dodaj książkę</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="newBook.name" label="Tytuł książki"/>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">
          Anuluj
        </v-btn>
        <v-btn color="blue darken-1" text @click="save">
          Dodaj
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'BookAdd',
  props: {
    books: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    dialog: false,
    newBook: {
      name: '',
      renter: null,
      owner: 'Afro',
    },
    defaultBook: {
      name: '',
      renter: null,
      owner: 'Afro',
    },
  }),
  watch: {
    dialog(val) {
      val || this.close()
    },
  },
  methods: {
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.newBook = Object.assign({}, this.newBook)
        this.editedIndex = -1
      })
    },
    save() {
      this.books.push(this.newBook);
      this.close()
    },
  },
}
</script>

<style scoped>

</style>
