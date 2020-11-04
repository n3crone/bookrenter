<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <v-card-title class="headline justify-center text-center">{{ text }}</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="cancel">Nie</v-btn>
        <v-btn color="blue darken-1" text @click="confirm">Tak</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  props: {
    showDialog: {
      type: Boolean,
      required: true,
    },
    text: {
      required: true,
      type: String,
    },
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

</style>
