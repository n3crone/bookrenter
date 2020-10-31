<template>
  <v-dialog v-model="showDialog" persistent max-width="500px">
    <v-card>
      <v-card-title class="headline justify-center">{{ text }}</v-card-title>
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
    }
  },

  methods: {
    cancel() {
      this.$emit('confirm', false);
    },

    confirm() {
      this.$emit('confirm', true);
    },
  }
}
</script>

<style scoped>

</style>
