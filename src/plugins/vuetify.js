import Vue from 'vue';
import Vuetify from 'vuetify';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/dist/vuetify.min.css';
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
  theme: {
    themes: {
      light: {
        secondary: '#FFA500',
        // Colors should be darker as one above and in chips use lighten css class
        error: '#fc9891',
        warning: '#FFDC8A',
        success: '#9AF4B5',
        info: '#A3D1FF',
      },
    },
  },
};

export default new Vuetify(opts);
