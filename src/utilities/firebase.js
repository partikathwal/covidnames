import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAF1z84I6zN3h3HV7B2kcPXIqu08ffNsbg",
    authDomain: "covid-names.firebaseapp.com",
    databaseURL: "https://covid-names-default-rtdb.firebaseio.com",
    projectId: "covid-names",
    storageBucket: "covid-names.appspot.com",
    messagingSenderId: "1085902237688",
    appId: "1:1085902237688:web:b43600a1cb2a4f269e300d"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
export default firebase;