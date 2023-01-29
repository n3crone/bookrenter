<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Dodaj książkę</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="newBook.name" label="Tytuł publikacji" outlined dense/>
              <v-select v-model="newBook.type" :items="Object.values(bookTypes)" label="Forma publikacji" outlined
                        dense/>
              <v-text-field v-if="newBook.type === bookTypes.EBOOK" v-model="newBook.link"
                            label="Link do publikacji" outlined dense/>
              <v-textarea v-model="newBook.description" label="Opis publikacji" rows="2" outlined dense/>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="cancel">
          Anuluj
        </v-btn>
        <v-btn color="blue darken-1" text @click="save" :disabled="!readyToSave">
          Dodaj
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { BOOK_TYPES } from '../../variables';

export default {
  name: 'BookAddDialog',
  props: {
    showDialog: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    bookTypes: BOOK_TYPES,
    dialog: false,
    newBook: {
      name: null,
      renter: null,
      type: BOOK_TYPES.BOOK,
    },
    defaultBook: {
      name: null,
      renter: null,
    },
  }),
  watch: {
    showDialog(val) {
      this.dialog = val;
    },
  },
  computed: {
    readyToSave() {
      return !!this.newBook.name && !(this.newBook.type === this.bookTypes.EBOOK && !this.newBook.link);
    },
  },
  methods: {
    cancel() {
      this.$emit('confirm', false);
      this.resetBook();
    },
    save() {
      this.$emit('confirm', this.newBook);
      this.resetBook();
    },
    resetBook() {
      this.$nextTick(() => {
        this.newBook = Object.assign({}, this.defaultBook);
      });
    },
  },
};
</script>

<style scoped>

</style>
