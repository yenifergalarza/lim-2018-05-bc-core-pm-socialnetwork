var current = null;
const getEmail = document.querySelector('#email');
const getPassword = document.querySelector('#password');
const submit = document.querySelector('#submit');
getEmail.addEventListener('focus', function (e) {
  if (current) current.pause();
  current = anime({
    targets: 'path',
    strokeDashoffset: {
      value: 0,
      duration: 700,
      easing: 'easeOutQuart'
    },
    strokeDasharray: {
      value: '240 1386',
      duration: 700,
      easing: 'easeOutQuart'
    }
  });
});
getPassword.addEventListener('focus', function (e) {
  if (current) current.pause();
  current = anime({
    targets: 'path',
    strokeDashoffset: {
      value: -336,
      duration: 700,
      easing: 'easeOutQuart'
    },
    strokeDasharray: {
      value: '240 1386',
      duration: 700,
      easing: 'easeOutQuart'
    }
  });
});
submit.addEventListener('focus', function (e) {
  if (current) current.pause();
  current = anime({
    targets: 'path',
    strokeDashoffset: {
      value: -730,
      duration: 700,
      easing: 'easeOutQuart'
    },
    strokeDasharray: {
      value: '530 1386',
      duration: 700,
      easing: 'easeOutQuart'
    }
  });
});

submit.addEventListener('click', () => {
  /*
  CREAR USUARIO
  
  firebase.auth().createUserWithEmailAndPassword(getEmail.value, getPassword.value).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  }); */
  firebase.auth().signInWithEmailAndPassword(getEmail.value, getPassword.value).then(() => {
    window.location.assign('main.html')
    console.log(hola)
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
})
