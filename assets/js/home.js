import Vue from 'vue';
import App from '@/pages/home';
import vuetify from '@/plugins/vuetify'

new Vue({
    vuetify,
    render: (h) => h(App),
}).$mount('#home');
