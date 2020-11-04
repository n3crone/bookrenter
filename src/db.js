import firebase from 'firebase/app';
import 'firebase/firestore';
import { firebaseConfig } from '@/variables';

require('firebase/auth');

export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore();
const auth = firebase.auth();
const usersCollection = db.collection('users');
const { Timestamp } = firebase.firestore;

export {
  Timestamp,
  auth,
  usersCollection,
};
