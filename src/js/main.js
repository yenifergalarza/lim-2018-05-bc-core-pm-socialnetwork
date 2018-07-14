<<<<<<< HEAD
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
=======
document.querySelector('#log-out').addEventListener('click', (e) => {
  console.log('holaaaa')
  firebase.auth().signOut().then( function(){
    if (e.preventDefault) {
      window.location.assign('signin.html')
    }
  }).catch( function(error){

  });
})
>>>>>>> b4c81ee146b23db134de6ad91ae915667d69165a
