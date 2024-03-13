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
    async googleLogin({ dispatch }) {
      const { user } = await fb.auth.signInWithPopup(fb.provider);
      dispatch('fetchUserProfile', user);
    },
    async fetchUserProfile({ commit }, user) {
      commit('setUserProfile', {
        id: user.uid,
        displayName: user.displayName,
      });
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
