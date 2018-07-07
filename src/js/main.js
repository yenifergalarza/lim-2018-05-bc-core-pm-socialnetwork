var mainApp = {};
(() => {
  var firebase = appFireBase;
  var uid = null; 
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      uid = user.uid;
    }else{
      uid = null;
      window.location.replace('login.html')
    }
  });
  var logOut = () => {
    firebase.auth().signOut();
  }
  mainApp.logOut = logOut;
})()