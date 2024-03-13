<template>
  <v-app>
    <div id="app" class="fill-height">
      <router-view/>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
.v-application button.v-btn {
  color: #3F3F3F !important;
  font-weight: bold;
  text-transform: unset !important;
  border-radius: 7px;
  letter-spacing: unset;
  font-size: 16px;
}
</style>
