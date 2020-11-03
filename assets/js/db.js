import firebase from 'firebase/app';
import 'firebase/firestore';

require('firebase/auth');

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};
export const db = firebase
    .initializeApp(firebaseConfig)
    .firestore();
const auth = firebase.auth();
const usersCollection = db.collection('users');
const {Timestamp} = firebase.firestore;

export {
  Timestamp,
  auth,
  usersCollection,
};
