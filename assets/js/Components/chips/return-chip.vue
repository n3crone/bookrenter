<template>
  <custom-chip @click="click" icon="mdi-keyboard-return" text="Zwróć" color="blue"/>
</template>

<script>
import CustomChip from "@/Components/chips/custom-chip";

export default {
  name: 'ReturnChip',
  components: {CustomChip},
  methods: {
    click() {
      this.$emit('click', true);
    },
  },
}
</script>

<style scoped>

</style>
