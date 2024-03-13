<template>
  <v-timeline align-top dense>
    <v-timeline-item v-for="historyRow in history.slice(0, 5)"
                     :key="historyRow.time"
                     :color="typeToColor(historyRow.type)"
                     small
    >
      <div>
        <div class="font-weight-normal">
          <strong>{{ historyRow.type|typeToHumanString }}</strong> @ {{ getDate(historyRow.timestamp.seconds) }}
        </div>
        <v-list-item-subtitle>{{ historyRow.bookName }}</v-list-item-subtitle>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
import { ACTIONS } from '@/variables';
import dayjs from 'dayjs';

export default {
  name: 'HistoryTimeline',
  props: {
    history: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getDate(seconds) {
      return dayjs.unix(seconds).format('DD-MM-YYYY HH:mm');
    },
    typeToColor(type) {
      switch (type) {
        case ACTIONS.ADD:
          return 'info';
        case ACTIONS.RETURN:
          return 'warning';
        case ACTIONS.DELETE:
          return 'error';
        case ACTIONS.RESERVE:
          return 'secondary';
        case ACTIONS.RENT:
          return 'warning';
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
