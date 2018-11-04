// azure

// status fields and start button in UI
var phraseDiv;
var startRecognizeOnceAsyncButton;

// subscription key and region key for speech services.
var subscriptionKey, regionKey;
var authorizationToken;
var SpeechSDK;
var recognizer;

document.addEventListener("DOMContentLoaded", function () {
	startRecognizeOnceAsyncButton = document.getElementById("startRecognizeOnceAsyncButton");
	subscriptionKey = document.getElementById("subscriptionKey");
	regionKey = document.getElementById("regionKey");
	phraseDiv = document.getElementById("phraseDiv");

	startRecognizeOnceAsyncButton.addEventListener("click", function () {
		startRecognizeOnceAsyncButton.disabled = true;
		phraseDiv.innerHTML = "";

		// if we got an authorization token, use the token. Otherwise use the provided subscription key
		var speechConfig;
		if (authorizationToken) {
		speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(authorizationToken, regionKey.value);
		} else {
			if (subscriptionKey.value === "" || subscriptionKey.value === "subscription") {
				alert("Please enter your Microsoft Cognitive Services Speech subscription key!");
				return;
			}
			speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey.value, regionKey.value);
		}

		speechConfig.speechRecognitionLanguage = "en-US";
		var audioConfig  = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
		recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

		recognizer.recognizeOnceAsync(
		// recognizer.startContinuousRecognitionAsync(
			function (result) {
				startRecognizeOnceAsyncButton.disabled = false;
				phraseDiv.innerHTML += result.text;
				window.console.log(result);

				recognizer.close();
				recognizer = undefined;
			},
			function (err) {
				startRecognizeOnceAsyncButton.disabled = false;
				phraseDiv.innerHTML += err;
				window.console.log(err);

				recognizer.close();
				recognizer = undefined;
			});
	});

	if (!!window.SpeechSDK) {
		SpeechSDK = window.SpeechSDK;
		startRecognizeOnceAsyncButton.disabled = false;

		// in case we have a function for getting an authorization token, call it.
		if (typeof RequestAuthorizationToken === "function") {
			RequestAuthorizationToken();
		}
	}
});
