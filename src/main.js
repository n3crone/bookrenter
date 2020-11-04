import Vue from 'vue';
import App from '@/pages/app';
import vuetify from '@/plugins/vuetify';
import { firestorePlugin } from 'vuefire';
import router from '@/router';
import store from '@/store';
import { auth } from '@/db';

Vue.use(firestorePlugin);

let app;
auth.onAuthStateChanged((user) => {
  if (!app) {
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      vuetify,
      render: h => h(App),
      router,
      store,
      components: { App },
      template: '<App/>',
    });
  }

  if (user) {
    store.dispatch('fetchUserProfile', user);
  }
});
