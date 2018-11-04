// azure

// status fields and start button in UI
var phraseDiv;
var startRecognizeOnceAsyncButton;

// subscription key and region key for speech services.
var subscriptionKey, regionKey;
var authorizationToken;
var SpeechSDK;
var recognizer;

subscriptionKey = document.getElementById("speechSubscriptionKey");
regionKey = document.getElementById("regionKey");

if (subscriptionKey.value === "" || subscriptionKey.value === "subscription") {
	alert("Please enter your Microsoft Cognitive Services Speech subscription key!");
}
speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey.value, regionKey.value);

speechConfig.speechRecognitionLanguage = "en-US";
var audioConfig  = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

// recognizer.recognizeOnceAsync(
// // recognizer.startContinuousRecognitionAsync(
// 	function (result) {
// 		window.console.log(result);

// 		recognizer.close(); 
// 		recognizer = undefined;
// 	},
// 	function (err) {
// 		window.console.log(err);

// 		recognizer.close();
// 		recognizer = undefined;
// 	}
// );

if (!!window.SpeechSDK) {
	SpeechSDK = window.SpeechSDK;

	// in case we have a function for getting an authorization token, call it.
	if (typeof RequestAuthorizationToken === "function") {
		RequestAuthorizationToken();
	}
}
