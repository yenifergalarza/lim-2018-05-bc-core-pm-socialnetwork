var appFireBase = {};
(() => {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCwNPWFmwllHQKVA_NbTorBZYr4JhcXiGE",
    authDomain: "my-social-red.firebaseapp.com",
    databaseURL: "https://my-social-red.firebaseio.com",
    projectId: "my-social-red",
    storageBucket: "my-social-red.appspot.com",
    messagingSenderId: "218613385128"
  };
  firebase.initializeApp(config);

  appFireBase = firebase;
  // appFireBase.prototype.setData = ()
})()