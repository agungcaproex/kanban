import Firebase from 'firebase'
// Initialize Firebase
const config = {
  apiKey: 'AIzaSyAv2cD-sXHx2Cd5TrQWDyr6bTPUFxVLJ7w',
  authDomain: 'firstproject-ecc01.firebaseapp.com',
  databaseURL: 'https://firstproject-ecc01.firebaseio.com',
  projectId: 'firstproject-ecc01',
  storageBucket: 'firstproject-ecc01.appspot.com',
  messagingSenderId: '282002161024'
}
let db = Firebase.initializeApp(config).database()
let kanbanRef = db.ref('tasks')

export default kanbanRef
