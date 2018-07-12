document.querySelector('#log-out').addEventListener('click', (e) => {
  console.log('holaaaa')
  firebase.auth().signOut().then( function(){
    if (e.preventDefault) {
      window.location.assign('signin.html')
    }
  }).catch( function(error){

  });
})