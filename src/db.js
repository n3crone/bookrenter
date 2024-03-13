import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';
import { firebaseConfig } from '@/firebase';
import Vue from 'vue';

require('firebase/auth');

export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore();
const auth = firebase.auth();
const { Timestamp } = firebase.firestore;

const provider = new firebase.auth.GoogleAuthProvider();

Vue.prototype.$analytics = firebase.analytics();

export {
  provider,
  Timestamp,
  auth,
};
