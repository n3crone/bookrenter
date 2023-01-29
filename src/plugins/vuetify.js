import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';
import pl from 'vuetify/lib/locale/pl';

Vue.use(Vuetify);

const opts = {
  lang: {
    locales: { pl },
    current: 'pl',
  },
  icons: {
    iconfont: 'mdi',
  },
};

export default new Vuetify(opts);
