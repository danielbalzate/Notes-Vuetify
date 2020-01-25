import * as firebase from "firebase";

var config = {
	apiKey: "AIzaSyBT1ovsd4nEBJkOuMpBQDw490qOL5aQQJw",
	authDomain: "my-pwa-notification.firebaseapp.com",
	databaseURL: "https://my-pwa-notification.firebaseio.com",
	projectId: "my-pwa-notification",
	storageBucket: "my-pwa-notification.appspot.com",
	messagingSenderId: "821779390602",
	appId: "1:821779390602:web:3eac6c6511179996298d73",
	measurementId: "G-15QXEHXMDR"
}; // 4. Get Firebase Configuration
firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.usePublicVapidKey("BJHrWSsMWtIPsBAyVfWeEvIy6uWslPMWSHoSx9vzOb2oB3eRslwWioboFcbs61hHNpvyl91GCfNEZ_SYpbwYfrc"); // 1. Generate a new key pair

// Request Permission of Notifications
messaging
	.requestPermission()
	.then(() => {
		console.log("Notification permission granted.");

		// Get Token
		messaging.getToken().then((token) => {
			console.log(token);
		});
	})
	.catch((err) => {
		console.log("Unable to get permission to notify.", err);
	});
