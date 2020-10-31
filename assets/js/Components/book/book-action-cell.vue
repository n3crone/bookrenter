<template>
  <div>
    <delete-chip v-if="item.owner === 'Jan Kowalski'" @click="deleteClick"/>
    <return-chip v-if="item.renter === 'Jan Kowalski'" @click="returnClick"/>
    <reserve-chip v-else-if="item.renter" @click="reserveClick"/>
    <rent-chip v-else @click="rentClick"/>
  </div>
</template>

<script>
import DeleteChip from "@/Components/chips/delete-chip";
import ReturnChip from "@/Components/chips/return-chip";
import ReserveChip from "@/Components/chips/reserve-chip";
import RentChip from "@/Components/chips/rent-chip";

export default {
  name: 'BookActionCell',
  components: {
    RentChip,
    ReserveChip,
    ReturnChip,
    DeleteChip
  },
  props: {
    item: {
      required: true,
    },
  },
  methods: {
    deleteClick() {
      this.$emit('delete', true);
    },
    returnClick() {
      this.$emit('return', true);
    },
    reserveClick() {
      this.$emit('reserve', true);
    },
    rentClick() {
      this.$emit('rent', true);
    },
  },
}
</script>

<style scoped>

</style>
