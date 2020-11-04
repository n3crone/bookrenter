import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from '@/db';
import router from '@/router/index';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userProfile: {},
    posts: [],
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setPerformingRequest(state, val) {
      state.performingRequest = val;
    },
    setPosts(state, val) {
      state.posts = val;
    },
  },
  actions: {
    async login({ dispatch }, form) {
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password);
      dispatch('fetchUserProfile', user);
    },
    async signup({ dispatch }, form) {
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password);
      await fb.usersCollection.doc(user.uid)
        .set({
          id: user.uid,
          name: form.name,
        });
      dispatch('fetchUserProfile', user);
    },
    async fetchUserProfile({ commit }, user) {
      const userProfile = await fb.usersCollection.doc(user.uid)
        .get();
      commit('setUserProfile', userProfile.data());
      if (router.currentRoute.path === '/login') {
        await router.push('/');
      }
    },
    async logout({ commit }) {
      await fb.auth.signOut();
      commit('setUserProfile', {});
      await router.push('/login');
    },
  },
});

export default store;
