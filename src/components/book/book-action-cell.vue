<template>
  <div>
    <delete-chip class="ma-1" v-if="item.owner.id === user.id && !item.renter" @click="deleteClick"/>
    <return-chip v-if="item.renter && item.renter.id === user.id" @click="returnClick"/>
    <v-chip v-else-if="item.renter"  color="black" outlined small>
      {{ item.renter.name }}
    </v-chip>
    <rent-chip v-else @click="rentClick"/>
  </div>
</template>

<script>
import DeleteChip from '@/components/chips/delete-chip';
import ReturnChip from '@/components/chips/return-chip';
import RentChip from '@/components/chips/rent-chip';
import { ACTIONS } from '@/variables';

export default {
  name: 'BookActionCell',
  components: {
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
