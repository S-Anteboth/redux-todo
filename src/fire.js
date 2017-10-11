import firebase from 'firebase'
import firebaseConfig from './firebaseConfig'

let fire = firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default fire;