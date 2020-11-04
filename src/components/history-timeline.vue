<template>
  <v-timeline align-top dense>
    <v-timeline-item v-for="historyRow in history.slice(0, 10)"
                     :key="historyRow.time"
                     :color="typeToColor(historyRow.type)"
                     small
    >
      <div>
        <div class="font-weight-normal">
          <strong>{{ historyRow.type|typeToHumanString }}</strong> @{{ historyRow.date }}
        </div>
        <div>{{ historyRow.bookName }}</div>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
import { ACTIONS } from '@/variables';

export default {
  name: 'HistoryTimeline',
  props: {
    history: {
      type: Array,
      required: true,
    },
  },
  methods: {
    typeToColor(type) {
      switch (type) {
        case ACTIONS.ADD:
          return 'teal';
        case ACTIONS.RETURN:
          return 'blue';
        case ACTIONS.DELETE:
          return 'red darken-3';
        case ACTIONS.RESERVE:
          return 'blue-grey';
        case ACTIONS.RENT:
          return 'green';
        default:
          throw new Error('Unknown type');
      }
    },
  },
  filters: {
    typeToHumanString(type) {
      switch (type) {
        case ACTIONS.ADD:
          return 'Dodano';
        case ACTIONS.RETURN:
          return 'Zwrot';
        case ACTIONS.DELETE:
          return 'Usunięto';
        case ACTIONS.RESERVE:
          return 'Zarezerwowano';
        case ACTIONS.RENT:
          return 'Wypożyczono';
        default:
          throw new Error('Unknown type');
      }
    },
  },
};
</script>

<style scoped>

</style>
