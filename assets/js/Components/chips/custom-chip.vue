<template>
  <v-chip :color="color" outlined @click="click" small>
    <v-icon left small v-if="icon">
      {{ icon }}
    </v-icon>
    {{ text }}
  </v-chip>
</template>

<script>
export default {
  name: 'CustomChip',
  props: {
    text: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: 'green',
    },
    icon: {
      type: String,
    }
  },
  methods: {
    click() {
      this.$emit('click', true);
    },
  }
}
</script>

<style scoped>
.v-chip {
  width: 100px;
  justify-content: center;
}
</style>
