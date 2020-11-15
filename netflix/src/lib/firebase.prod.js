import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { seedDatabase } from '../seed';

const config = {
    apiKey: "AIzaSyCk6mA0uw7G610y2DA7ksczCOguR038TJk",
    authDomain: "netflix-clone-d0df2.firebaseapp.com",
    databaseURL: "https://netflix-clone-d0df2.firebaseio.com",
    projectId: "netflix-clone-d0df2",
    storageBucket: "netflix-clone-d0df2.appspot.com",
    messagingSenderId: "199298958925",
    appId: "1:199298958925:web:3494b10af61d41d18c7e04"
};

const firebase = Firebase.initializeApp(config);

// seedDatabase(firebase);

export { firebase };
