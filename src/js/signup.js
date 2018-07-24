const signUp = document.querySelector('#sign-up')
const goLogin = document.querySelector('#go-login')

signUp.addEventListener('click', () => {
  const getEmail = document.querySelector('#email');
  const getPassword = document.querySelector('#password');
  const getRepeatPassword = document.querySelector('#repeat-password');
  const callback = (error, response) => {
    if (!error) {
      // window.location.assign('index.html')
    } else {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/weak-password') {
        alert('The password is too weak.');
      } else if (errorCode === 'auth/password-mismatch') {
        alert('Your password doesnt mach');
      } else {
        alert(errorMessage);
      }
    }
  }
   createUser(getEmail.value, getPassword.value, getRepeatPassword.value, callback);
});

goLogin.addEventListener('click', () => {
  window.location.assign('index.html')
})