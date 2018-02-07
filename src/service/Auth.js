import firebase from 'firebase';

import { firebase as firebaseConfig } from '../config';

class Auth {
  initialize() {
    return firebase.initializeApp(firebaseConfig);
  }

  signInWithEmailAndPassword(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  
  createUserWithEmailAndPassword(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }
  
  signOut() {
    return firebase.auth().signOut();
  }
  
  onAuthStateChanged(callback) {
    firebase.auth().onAuthStateChanged(callback);
  }
}

export default Auth;
