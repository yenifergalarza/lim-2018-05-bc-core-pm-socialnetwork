window.onload = initi;
let file;
let imgStorageRef
function initi (){
	file = document.getElementById('file');
	file.addEventListener('change', uploadToFirebase, false);

	imgStorageRef = firebase.storage().ref();
}
function uploadToFirebase() {
	var imgUpload = file.files[0];
	var uploadTask = imgStorageRef.child('post-images/' + imgUpload.name).put(imgUpload);
}