import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Initialzie Fireabase
var firebaseConfig = {
    apiKey: "AIzaSyC_pjDdpaMwR7-9Rvvckxdhe1buHpdfTjo",
    authDomain: "financeapp-686b3.firebaseapp.com",
    databaseURL: "https://financeapp-686b3.firebaseio.com",
    projectId: "financeapp-686b3",
    storageBucket: "financeapp-686b3.appspot.com",
    messagingSenderId: "325023823553",
    appId: "1:325023823553:web:8c5c158288b84994904640",
    measurementId: "G-BNS9P96SS6"
  };

firebase.initializeApp(firebaseConfig);
// db = firebase.firestore();

// export {db};
export default firebase;