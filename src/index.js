import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var config = {
    apiKey: "AIzaSyBkuMWIG57QI3zyyg0aN7MAwHLaQCqVZqs",
    authDomain: "info343-finalproject.firebaseapp.com",
    databaseURL: "https://info343-finalproject.firebaseio.com",
    projectId: "info343-finalproject",
    storageBucket: "info343-finalproject.appspot.com",
    messagingSenderId: "316944424084"
  };
  firebase.initializeApp(config);


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
