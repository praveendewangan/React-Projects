import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyDKLjICkS3V75jLOQ_vVbHpRsMGWwks8ZM",
    authDomain: "docs-aa65e.firebaseapp.com",
    projectId: "docs-aa65e",
    storageBucket: "docs-aa65e.appspot.com",
    messagingSenderId: "673758478135",
    appId: "1:673758478135:web:18fb956585d7a66207a4b2"
  };

  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

  const db  = app.firestore();

  export { db }