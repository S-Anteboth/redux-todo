import firebase from 'firebase'
import firebaseConfig from './firebaseConfig'

let fire = firebase.initializeApp(firebaseConfig);
export default fire;