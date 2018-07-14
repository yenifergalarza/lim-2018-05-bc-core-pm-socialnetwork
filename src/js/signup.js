const signUp = document.querySelector('#sign-up')
const goLogin = document.querySelector('#go-login')

signUp.addEventListener('click', () => {
  const getEmail = document.querySelector('#email').value;
  const getPassword = document.querySelector('#password').value;
  const getRepeatPassword = document.querySelector('#repeat-password').value;
   createUser(getEmail, getPassword, getRepeatPassword);
});

goLogin.addEventListener('click', () => {
  window.location.assign('index.html')
})