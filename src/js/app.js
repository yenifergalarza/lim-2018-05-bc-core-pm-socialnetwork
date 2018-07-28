<<<<<<< HEAD
window.createUser = (email, password, repeatPassword, cb) => {
  if (password === repeatPassword) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        cb(null, user);
=======
window.createUser = (email, password, repeatPassword) => {
  if (password === repeatPassword) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        window.location.assign('index.html')
>>>>>>> 34facf06f23b3f9530b4b7abf5ab63e4c8e4964b
      })
      .catch(function (error) {
        // Handle Errors here.
        cb(error)
        console.log(error);
      });
  } else {
    console.log('Your password doesnt mach');
    cb({ code: 'auth/password-mismatch' })
  }
};

window.signInUser = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
<<<<<<< HEAD
      window.location.assign('main.html')
    })
=======
    window.location.assign('wall.html')
  })
>>>>>>> 34facf06f23b3f9530b4b7abf5ab63e4c8e4964b
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
};

window.resetPassword = (email, password) => {
  firebase.auth().sendPasswordResetEmail(
      getEmail.value)
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
<<<<<<< HEAD
window.writeUserData = (userId, name, email, imageUrl) => {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
};
=======
>>>>>>> 34facf06f23b3f9530b4b7abf5ab63e4c8e4964b
window.loginWithGoogle = () => {
  // Using a popup.
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  firebase.auth().signInWithPopup(provider).then(function (result) {
    var user = result.user;
    writeUserData(user.uid, user.displayName, user.email, user.photoURL);
<<<<<<< HEAD
    window.location.assign('main.html')
=======
    window.location.assign('wall.html')
>>>>>>> 34facf06f23b3f9530b4b7abf5ab63e4c8e4964b
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

<<<<<<< HEAD

window.writeUserData = (userId, name, email, imageUrl) => {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture: imageUrl
  });
};

window.writeNewPost = (uid, body,countlike) => {
  // A post entry.
  var postData = {
    body: body,
    countlike:countlike,
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

// window.loadPost = (userId) => {
// const post = document.getElementById("loadedPost");
// let userId = 'lOAgxhLUxpXUlFwEiCOD7PfG8iz2';
// var dbRefPost = firebase.database().ref().child('user-posts');
// var dbRefPostUser = dbRefPost.child(userId);
// dbRefPostUser.on('child_added', snap => {
//   snap.forEach(body => {
//     console.log(body.val());
//     const buttonUpdate = document.createElement("input");
//     buttonUpdate.setAttribute("value", "Update");
//     buttonUpdate.setAttribute("type", "button");
//     const buttonDelete = document.createElement("input");
//     buttonDelete.setAttribute("value", "Delete");
//     buttonDelete.setAttribute("type", "button");
//     const buttonLike = document.createElement("input");
//     buttonLike.setAttribute("value", "Me gusta");
//     buttonLike.setAttribute("type", "button");
//     const contenidoPost = document.createElement('div');
//     contenidoPost.className = 'contenidoPost';
//     const textoPost = document.createElement('textarea')
//     textoPost.innerHTML = body.val();
//     textoPost.disabled = true;
//     post.appendChild(textoPost);
//     post.appendChild(buttonUpdate);
//     post.appendChild(buttonDelete);
//     post.appendChild(buttonLike);

//   });
// });

// dbRefPostUser.on('child_added', snap => post.innerHTML = JSON.stringify(snap.val()));

/* return firebase.database().ref('/user-posts/' + userId ).once('value').then(function (snapshot) {
  var body = (snapshot.val() && snapshot.val().body) || 'Anonymous';
  console.log(body);
  // ...
}); */
// }
=======
window.writeUserData = (userId, name, email, imageUrl) => {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture: imageUrl
  });
};

window.writeNewPost = (uid, userName, body, privacy, countlike) => {
  // A post entry.
  var postData = {
    uid: uid,
    userName: userName,
    body: body,
    privacy: privacy,
    countlike: countlike,
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

window.updatePostUser = (uid, userName, body, privacy, countlike, postId) => {
  const newPost = {
    uid: uid,
    userName: userName,
    body: body,
    privacy: privacy,
    countlike: countlike,
  };

  const updatesUser = {};
  const updatesPost = {};

  updatesUser['/user-posts/' + uid + '/' + postId] = newPost;
  updatesPost['/posts/' + postId] = newPost;
  firebase.database().ref().update(updatesUser);
  firebase.database().ref().update(updatesPost);
}

window.loginWithAnonymous = () => {
  firebase.auth().signInAnonymously().then(function (result) {
    console.log('hola')
    window.location.assign('wall.html')
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}
>>>>>>> 34facf06f23b3f9530b4b7abf5ab63e4c8e4964b
