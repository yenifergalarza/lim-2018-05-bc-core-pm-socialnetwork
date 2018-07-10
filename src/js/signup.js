const signUp = document.querySelector('#sign-up')
const goLogin = document.querySelector('#go-login')

signUp.addEventListener('click', () => {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const repeatPassword = document.querySelector('#repeat-password').value;
  console.log(email);
  console.log(password);
  console.log(repeatPassword);
  if (password === repeatPassword) {
    console.log('password bien')
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        window.location.assign('signin.html')
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
  } else {
    console.log('Your password doesnt mach');
    alert('Your password doesnt mach');
  }
});

goLogin.addEventListener('click', () => {
  window.location.assign('signin.html')
})