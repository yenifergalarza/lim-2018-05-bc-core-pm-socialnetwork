const signUp = document.querySelector('#sign-up')

signUp.addEventListener('click', () => {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      window.location.assign('index.html')
    })
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
});