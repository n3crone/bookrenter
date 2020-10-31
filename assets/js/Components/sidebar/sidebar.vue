<template>
  <v-card>
    <v-card-text>
      <v-card-title>Jan Kowalski</v-card-title>
      <div class="text-center">Wypożyczenia</div>
      <v-progress-linear value="33"/>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <v-row>
              <v-col cols="8">
                <v-icon small color="teal">mdi-check</v-icon>
                MongoDB w akcji
              </v-col>
              <v-col cols="4">
                <return-chip />
              </v-col>
            </v-row>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <div class="font-weight-bold ml-6 mb-2">
        Historia
      </div>
      <v-timeline align-top dense>
        <v-timeline-item v-for="historyRow in history" :key="historyRow.time" :color="historyRow.color" small>
          <div>
            <div class="font-weight-normal">
              <strong>{{ historyRow.from }}</strong> @{{ historyRow.time }}
            </div>
            <div>{{ historyRow.message }}</div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>

<script>
import RentChip from "@/Components/chips/rent-chip";
import ReturnChip from "@/Components/chips/return-chip";

export default {
  name: 'Sidebar',
  components: {ReturnChip, RentChip},
  props: {
    history: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
</style>
