import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Social network
  apiKey: 'AIzaSyB_cIGlhT_ro1r-mFbk7MTOHC1N96sW3TM',
  authDomain: 'social-network-cf133.firebaseapp.com',
  projectId: 'social-network-cf133',
  storageBucket: 'social-network-cf133.appspot.com',
  messagingSenderId: '1085851311756',
  appId: '1:1085851311756:web:c33638da4125060b7be5a9',
  // soc-net-demo
  // apiKey: 'AIzaSyC-HP0z-d_ssInc9XnK62KjBm0qdbfeQsM',
  // authDomain: 'soc-net-demo.firebaseapp.com',
  // projectId: 'soc-net-demo',
  // storageBucket: 'soc-net-demo.appspot.com',
  // messagingSenderId: '631741413941',
  // appId: '1:631741413941:web:b4e1effac5b8510aea4f7c',
  // Third soc-net
  // apiKey: 'AIzaSyCLqeS7rFhs7NeI73_2y5KEfr3wWa7gDUw',
  // authDomain: 'third-soc-net.firebaseapp.com',
  // projectId: 'third-soc-net',
  // storageBucket: 'third-soc-net.appspot.com',
  // messagingSenderId: '238744130547',
  // appId: '1:238744130547:web:542bb05d43270fd8b9b886',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
