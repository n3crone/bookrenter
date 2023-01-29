<template>
  <div>
    <delete-chip class="ma-1" v-if="item.owner.id === user.id && !item.renter" @click="deleteClick"/>
    <custom-chip v-if="item.type === BOOK_TYPES.EBOOK" text="Pobierz" color="teal" icon="mdi-download"
                 @click="download"/>
    <return-chip v-else-if="item.renter && item.renter.id === user.id" @click="returnClick"/>
    <v-tooltip v-else-if="item.renter" top>
      <template v-slot:activator="{ on, attrs }">
        <v-chip color="black" outlined small v-bind="attrs" v-on="on">
          {{ getDate(item.rentDate) }}
        </v-chip>
      </template>
      <span>{{ item.renter.name }}</span>
    </v-tooltip>
    <rent-chip v-else @click="rentClick"/>
  </div>
</template>

<script>
import DeleteChip from '@/components/chips/delete-chip';
import ReturnChip from '@/components/chips/return-chip';
import RentChip from '@/components/chips/rent-chip';
import { ACTIONS, BOOK_TYPES } from '@/variables';
import dayjs from 'dayjs';
import CustomChip from '../chips/custom-chip';


export default {
  name: 'BookActionCell',
  computed: {
    BOOK_TYPES() {
      return BOOK_TYPES;
    },
  },
  components: {
    CustomChip,
    RentChip,
    ReturnChip,
    DeleteChip,
  },
  props: {
    item: {
      required: true,
    },
    user: {
      required: true,
    },
  },
  methods: {
    getDate(timestamp) {
      if (!timestamp.seconds) {
        return null;
      }

      return dayjs.unix(timestamp.seconds).format('DD-MM-YYYY');
    },
    download() {
      window.open(this.item.link, '_blank').focus();
    },
    deleteClick() {
      this.$emit(ACTIONS.DELETE, true);
    },
    returnClick() {
      this.$emit(ACTIONS.RETURN, true);
    },
    rentClick() {
      this.$emit(ACTIONS.RENT, true);
    },
  },
};
</script>

<style scoped>
.v-chip {
  width: 110px;
  justify-content: center;
}
</style>
