import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDzBchctm2VgacqpThTN0FRRHfwZSuaoZM",
    authDomain: "traingoapp.firebaseapp.com",
    databaseURL: "https://traingoapp.firebaseio.com",
    projectId: "traingoapp",
    storageBucket: "traingoapp.appspot.com",
    messagingSenderId: "646862527248",
    appId: "1:646862527248:web:b26022c7603ce35497e395"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
