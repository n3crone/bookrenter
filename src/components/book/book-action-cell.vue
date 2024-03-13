<template>
  <div>
    <delete-chip v-if="item.owner.id === user.id && !item.renter" @click="deleteClick"/>
    <custom-chip v-if="item.type === BOOK_TYPES.EBOOK" text="Pobierz" color="info"
                 @click="download" />
    <return-chip v-else-if="item.renter && item.renter.id === user.id" @click="returnClick"/>
    <v-chip v-else-if="item.renter" color="light-grey" small>
      {{ getDate(item.rentDate) }}
    </v-chip>
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
      this.$analytics.logEvent('download', {
        bookName: this.item.name,
        bookId: this.item.id,
      });
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
  width: 100px;
  justify-content: center;
}
.v-chip:not(.v-chip--outlined).grey {
   color: black;
}
.v-chip {
  font-weight: bold;
  border-radius: 7px;
}
</style>

