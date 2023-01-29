<template>
  <v-data-table :headers="headers"
                :items="filteredBooks"
                :items-per-page="50"
                class="elevation-1"
                dense
                show-expand
                :search="search"
                :footer-props="{
                  'items-per-page-options': [25, 50, 100, { text: 'Wszystko', value: -1 }],
                }"
  >
    <template v-slot:top>
      <book-table-toolbar :books="filteredBooks" @add="emitAdd"/>
      <v-row class="pl-3 pr-3 pt-5">
        <v-col cols="12" sm="6">
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Szukaj tytułu"
              outlined
              dense
              hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select label="Filtruj działy" dense multiple :items="departments" v-model="selectedDepartments" outlined
                    hide-details>
            <template v-slot:selection="{ item, index }">
              <span v-if="index === 0">{{ item }}</span>
              <span v-if="index === 1" class="grey--text text-caption pl-2">
                (+{{ selectedDepartments.length - 1 }} inne)
              </span>
            </template>
          </v-select>
        </v-col>
      </v-row>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length" class="pt-2 pb-2 text-break">
        <div v-if="item.link">Link: <a :href="item.link" target="_blank">{{ item.link }}</a></div>
        {{ item.description || 'Brak opisu.' }}
      </td>
    </template>
    <template v-slot:[`item.renter`]="{ item }">
      <book-renter-cell :item="item"/>
    </template>
    <template v-slot:[`item.action`]="{ item }">
      <book-action-cell :item="item"
                        :user="user"
                        @delete="emitDelete(item)"
                        @return="emitReturn(item)"
                        @rent="emitRent(item)"
      />
    </template>
  </v-data-table>
</template>

<script>
import BookTableToolbar from '@/components/book/book-table-toolbar';
import BookRenterCell from '@/components/book/book-renter-cell';
import BookActionCell from '@/components/book/book-action-cell';
import { ACTIONS, DEPARTMENTS } from '@/variables';


export default {
  name: 'BookTable',
  components: {
    BookActionCell,
    BookRenterCell,
    BookTableToolbar,
  },
  props: {
    books: {
      type: Array,
      required: true,
    },
    user: {
      required: true,
    },
  },
  computed: {
    filteredBooks() {
      return this.books.filter(book => this.selectedDepartments.includes(book.owner.department));
    },
  },
  data() {
    return {
      departments: Object.values(DEPARTMENTS),
      selectedDepartments: Object.values(DEPARTMENTS),
      search: '',
      headers: [
        {
          text: 'Tytuł',
          align: 'start',
          value: 'name',
        },
        {
          text: 'Właściciel',
          value: 'owner.name',
          align: 'center',
          filterable: false,
        },
        {
          text: 'Dział',
          value: 'owner.department',
          align: 'center',
          filterable: false,
        },
        {
          value: 'action',
          align: 'right',
          sortable: false,
          filterable: false,
        },
      ],
    };
  },
  methods: {
    emitRent(item) {
      this.$emit('confirm-dialog', item, ACTIONS.RENT);
    },
    emitDelete(item) {
      this.$emit('confirm-dialog', item, ACTIONS.DELETE);
    },
    emitReturn(item) {
      this.$emit('confirm-dialog', item, ACTIONS.RETURN);
    },
    emitAdd() {
      this.$emit('add-dialog', ACTIONS.ADD);
    },
  },
};
</script>

<style scoped>
</style>
