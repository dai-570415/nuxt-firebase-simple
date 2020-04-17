import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "YourCode",
    authDomain: "YourCode",
    databaseURL: "YourCode",
    projectId: "YourCode",
    storageBucket: "YourCode",
    messagingSenderId: "YourCode",
    appId: "YourCode",
    measurementId: "YourCode"
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;