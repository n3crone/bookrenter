<template>
  <v-toolbar flat height="32px">
    <div>
        <custom-chip :text="`${books.length} Książek`" color="info" />
        <custom-chip :text="`${books.filter(book => book.renter === null).length} Dostępnych`" color="success"/>
        <custom-chip :text="`${books.filter(book => book.renter !== null).length} Wypożyczonych`" color="warning"/>
    </div>
    <v-spacer></v-spacer>
    <add-chip @click="addClick"/>
  </v-toolbar>
</template>

<script>
import AddChip from '@/components/chips/add-chip';
import CustomChip from '@/components/chips/custom-chip';
import { ACTIONS } from '@/variables';

export default {
  name: 'BookTableToolbar',
  components: {
    CustomChip,
    AddChip,
  },
  props: {
    books: {
      type: Array,
      required: true,
    },
  },
  methods: {
    addClick() {
      this.$emit(ACTIONS.ADD, true);
    },
  },
};
</script>

<style>
.v-toolbar__content {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>
