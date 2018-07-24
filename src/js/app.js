window.createUser = (email, password, repeatPassword, cb) => {
  if (password === repeatPassword) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user)
        cb(null, user);
      })
      .catch(function (error) {
        // Handle Errors here.
        cb(error)
        console.log(error);
      });
  } else {
    //console.log('Your password doesnt mach');
    cb({ code: 'auth/password-mismatch' })
  }
};

// console.log(createUser('lulu@gmail.com','123','123',cb))

window.signInUser = (email, password, cb) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      cb(null, user);
      return user;
      // window.location.assign('wall.html')
    })
    .catch(function (error) {
      cb(error)
      // Handle Errors here.
      console.log(error);
    });
};

window.resetPassword = (email, password) => {
  firebase.auth().sendPasswordResetEmail(getEmail.value)
    .then(function () {
      firebase.auth.EmailAuthProvider.credential(email, password);
      alert("Password Reset Email Sent")
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/invalid-email') {
        alert('The email in invalid');
      } else if (errorCode == 'auth/user-not-found') {
        alert('The email is not exists');
      }
      console.log(error);
    });
};
window.loginWithGoogle = () => {
  // Using a popup.
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  firebase.auth().signInWithPopup(provider).then(function (result) {
    var user = result.user;
    writeUserData(user.uid, user.displayName, user.email, user.photoURL);
    window.location.assign('wall.html')
  });
};

window.loginWithFacebook = () => {
  // Sign in using a popup.
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('user_birthday');
  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Facebook Access Token.
    var token = result.provider.accessToken;
    // The signed-in user info.
    var user = result.user;
    window.location.assign('wall.html')
  });
};

window.loginWithTwitter = () => {
  // Using a popup.
  var provider = new firebase.auth.TwitterAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function (result) {
    // For accessing the Twitter API.
    var token = result.provider.accessToken;
    var secret = result.provider.secret;
    // The signed-in user info.
    var user = result.user;
    window.location.assign('wall.html')
  });
};

window.writeUserData = (userId, name, email, imageUrl) => {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture: imageUrl
  });
};

window.writeNewPost = (uid, body, countlike, userName) => {
  // A post entry.
  var postData = {
    body: body,
    countlike: countlike,
    userName: userName
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  firebase.database().ref().update(updates);
  return newPostKey;
};

window.loginWithAnonymous = () => {
  firebase.auth().signInAnonymously().then(function () {
    window.location.assign('wall.html')
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}