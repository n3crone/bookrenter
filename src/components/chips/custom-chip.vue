<template>
  <v-chip :color="color" @click="click" small>
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
      default: 'success',
    },
    icon: {
      type: String,
    },
  },
  methods: {
    click() {
      this.$emit('click', true);
    },
  },
};
</script>

<style scoped>
.v-chip:not(.v-chip--outlined).success {
  color: #009926;
}
.v-chip:not(.v-chip--outlined).warning {
  color: #D67600;
}
.v-chip:not(.v-chip--outlined).info {
  color: #004CA3;
}
.v-chip:not(.v-chip--outlined).error {
  color: #F44336;
}
.v-chip {
  font-weight: bold;
  border-radius: 7px;
}
</style>
