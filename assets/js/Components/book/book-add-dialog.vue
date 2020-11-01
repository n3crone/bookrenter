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
              <v-text-field v-model="newBook.name" label="Tytuł książki"/>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="cancel">
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
  name: 'BookAddDialog',
  props: {
    showDialog: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    dialog: false,
    newBook: {
      name: null,
      renter: null,
      owner: 'Jan Kowalski',
    },
    defaultBook: {
      name: null,
      renter: null,
      owner: 'Jan Kowalski',
    },
  }),
  watch: {
    showDialog(val) {
      this.dialog = val;
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
