<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <v-card-title class="headline justify-center text-center" v-html="text"/>
      <v-card-actions>
        <v-spacer></v-spacer>
        <custom-chip color="white" @click="cancel" text="Anuluj" class="mr-2"/>
        <custom-chip :color="confirmColor" @click="confirm" :text="confirmText" class="ml-2"/>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CustomChip from '@/components/chips/custom-chip';

export default {
  name: 'ConfirmDialog',
  components: { CustomChip },
  props: {
    showDialog: {
      type: Boolean,
      required: true,
    },
    text: {
      required: true,
      type: String,
    },
    confirmText: { default: 'Potwierdź' },
    confirmColor: { default: 'info' },
  },
  data() {
    return {
      dialog: false,
    };
  },
  watch: {
    showDialog(val) {
      this.dialog = val;
    },
  },
  methods: {
    cancel() {
      this.$emit('confirm', false);
    },

    confirm() {
      this.$emit('confirm', true);
    },
  },
};
</script>

<style scoped>
.v-card {
  background-color: #F2F2F2 !important;
}
</style>
