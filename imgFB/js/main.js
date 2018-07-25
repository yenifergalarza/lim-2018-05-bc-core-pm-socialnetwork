window.onload = initi;
let file;
let imgStorageRef;
let imgDatabaseRef;
function initi() {
	file = document.getElementById('file');
	file.addEventListener('change', uploadToFirebase, false);

	showImage();

	imgStorageRef = firebase.storage().ref();
	imgDatabaseRef = firebase.database().ref().child('post-images/');
}

function showImage() {

}

function uploadToFirebase() {
	var imgUpload = file.files[0];
	var task = imgStorageRef.child('post-images/' + imgUpload.name).put(imgUpload);
	task.on('state_changed',
		function (snapshot) {
		},
		function (err) {
		},
		function () {
			var downloadURL = task.snapshot.downloadURL;
			// uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
			// 	console.log('File available at', downloadURL);
				bdPostImage(imgUpload.name, downloadURL);
			// }); 
		}
	)
}

function bdPostImage(imageName, imageUrl){
	imgDatabaseRef.push({
		name: imageName,
		// postId: postId,
		url: imageUrl,
		// userId: userId
	})
}



// var uploader = document.getElementById('uploader');
// var fileButton = document.getElementById('fileButton');
// fileButton.addEventListener('change', function (e) {
// 	var file = e.target.files[0];
// 	var storageRef = firebase.storage().ref('post-images/' + file.name);
// 	var task = storageRef.put(file);
// 	task.on('state_changed',
// 		function progress(snapshot) {
// 			var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
// 			uploader.value = percentage;
// 		},
// 		function error(err) {
// 		},
// 		function () {
// 			uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
// 				console.log('File available at', downloadURL);
// 			});
// 		}
// 	)
// 	storageRef.getDownloadURL().then
// });