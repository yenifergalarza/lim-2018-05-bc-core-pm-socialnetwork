(() => {
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      uiShown: function () {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'main.html',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // firebase.auth.PhoneAuthProvider.PROVIDER_ID\
    ],
    // Terms of service url.
    tosUrl: 'main.html'
  };
  ui.start('#firebaseui-auth-container', uiConfig);
})();

(() => {
  var database = firebase.database();
  var dbRefUsers = database.ref('users/');

  var fbProvider = new firebase.auth.FacebookAuthProvider();
  var googleProvider = new firebase.auth.GoogleAuthProvider();

  // const fbLogin = document.querySelector('#login-facebook');
  const googleLogin = document.querySelector('#login-google');

  googleLogin.addEventListener('click', (e) => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
    });
    /* firebase.auth().signInWithPopup(googleProvider).then(function (result) {
      // This gives you a Facebook Access Token.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      userId = user.uid;
      dbRefUsers.once('value').then(function (snapshot) {
        var r = snapshot.child(userId).exists();
        if (r !== true) {
          dbRefUsers.child(userId.set({
            username: user.displayName,
            photoUrl: user.photoUrl
          }))
        }
        return;
      })
      console.log(token);
      console.log(user);
    }).catch(function (error) {
      console.log(error.code);
      console.log(error.message)
    }); */
  })

})()
document.querySelector('#login-facebook').addEventListener('click', () => {
  // First, we perform the signInWithRedirect.
  // Creates the provider object.
  var provider = new firebase.auth.FacebookAuthProvider();
  // You can add additional scopes to the provider:
  provider.addScope('email');
  provider.addScope('user_friends');
  // Sign in with redirect:
  auth.signInWithRedirect(provider)
  ////////////////////////////////////////////////////////////
  // The user is redirected to the provider's sign in flow...
  ////////////////////////////////////////////////////////////
  // Then redirected back to the app, where we check the redirect result:
  auth.getRedirectResult().then(function (result) {
    // The firebase.User instance:
    var user = result.user;
    // The Facebook firebase.auth.AuthCredential containing the Facebook
    // access token:
    var credential = result.credential;
    // As this API can be used for sign-in, linking and reauthentication,
    // check the operationType to determine what triggered this redirect
    // operation.
    var operationType = result.operationType;
  }, function (error) {
    // The provider's account email, can be used in case of
    // auth/account-exists-with-different-credential to fetch the providers
    // linked to the email:
    var email = error.email;
    // The provider's credential:
    var credential = error.credential;
    // In case of auth/account-exists-with-different-credential error,
    // you can fetch the providers using this:
    if (error.code === 'auth/account-exists-with-different-credential') {
      auth.fetchProvidersForEmail(email).then(function (providers) {
        // The returned 'providers' is a list of the available providers
        // linked to the email address. Please refer to the guide for a more
        // complete explanation on how to recover from this error.
      });
    }
  });
  // Sign in using a popup.
  /* var provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('user_birthday');
  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Facebook Access Token.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(token);
    console.log(user);
  }).catch(function(error){
    console.log(error.code);
    console.log(error.message)
  }); */
})