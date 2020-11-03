<template>
  <div>
    <delete-chip v-if="item.owner.id === user.id && !item.renter" @click="deleteClick"/>
    <return-chip v-if="item.renter && item.renter.id === user.id" @click="returnClick"/>
    <v-chip v-else-if="item.status === 'Reserve'"  color="black" outlined small>
      Zarezerwowana
    </v-chip>
    <reserve-chip v-else-if="item.renter" @click="reserveClick"/>
    <rent-chip v-else @click="rentClick"/>
  </div>
</template>

<script>
import DeleteChip from '@/Components/chips/delete-chip';
import ReturnChip from '@/Components/chips/return-chip';
import ReserveChip from '@/Components/chips/reserve-chip';
import RentChip from '@/Components/chips/rent-chip';
import {ACTIONS} from '@/variables';

export default {
  name: 'BookActionCell',
  components: {
    RentChip,
    ReserveChip,
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
    deleteClick() {
      this.$emit(ACTIONS.DELETE, true);
    },
    returnClick() {
      this.$emit(ACTIONS.RETURN, true);
    },
    reserveClick() {
      this.$emit(ACTIONS.RESERVE, true);
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
