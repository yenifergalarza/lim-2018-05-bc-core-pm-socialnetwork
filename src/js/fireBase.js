var appFireBase = {};
(() => {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAjHnSZoKC8E3VU9elS5bDnTNO-JchVTio",
    authDomain: "socialnetwork-62aa5.firebaseapp.com",
    databaseURL: "https://socialnetwork-62aa5.firebaseio.com",
    projectId: "socialnetwork-62aa5",
    storageBucket: "socialnetwork-62aa5.appspot.com",
    messagingSenderId: "688819665267"
  };
  firebase.initializeApp(config);

  appFireBase = firebase;
  // appFireBase.prototype.setData = ()
})()