const signUp = document.querySelector('#sign-up')
const goLogin = document.querySelector('#go-login')

signUp.addEventListener('click', () => {
  const getEmail = document.querySelector('#email').value;
  const getPassword = document.querySelector('#password').value;
  const getRepeatPassword = document.querySelector('#repeat-password').value;
  const callback = (error, response) => {
    if (!error) {
      window.location.assign('index.html')
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
   createUser(getEmail, getPassword, getRepeatPassword, callback);
});

goLogin.addEventListener('click', () => {
  window.location.assign('index.html')
})