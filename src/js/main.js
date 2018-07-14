document.querySelector('#log-out').addEventListener('click', (e) => {
  console.log('holaaaa')
  firebase.auth().signOut().then( function(){

  }).catch( function(error){

  });
})


