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

		document.getElementById('content').style.display = 'block';
		document.getElementById('warning').style.display = 'none';

		// in case we have a function for getting an authorization token, call it.
		if (typeof RequestAuthorizationToken === "function") {
			RequestAuthorizationToken();
		}
	}
});

// CREATE WAV FILES FOR PERSON Recognition
URL = window.URL;

var azureURL = 'https://westus.api.cognitive.microsoft.com/spid/v1.0'

var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext;

//add events to those 2 buttons
recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);

var gumStream;
var rec;
var input; 
var ids = [];
var pollId = '';

function startRecording() {
	console.log("recordButton clicked");

    var constraints = { audio: true, video:false }

	recordButton.disabled = true;
	stopButton.disabled = false;

	navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
		console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

		audioContext = new AudioContext();

		document.getElementById("formats").innerHTML="Format: 1 channel pcm @ "+audioContext.sampleRate/1000+"kHz"

		gumStream = stream;
		
		input = audioContext.createMediaStreamSource(stream);

		rec = new Recorder(input,{numChannels:1})

		rec.record()

		console.log("Recording started");

	}).catch(function(err) {
		console.log(err);
	  	//enable the record button if getUserMedia() fails
    	recordButton.disabled = false;
    	stopButton.disabled = true;
	});
}

function stopRecording() {
	console.log("stopButton clicked");

	//disable the stop button, enable the record too allow for new recordings
	stopButton.disabled = true;
	recordButton.disabled = false;
	
	//tell the recorder to stop the recording
	rec.stop();

	//stop microphone access
	gumStream.getAudioTracks()[0].stop();

	//create the wav blob and pass it on to createDownloadLink
	rec.exportWAV(registerVoiceToAzure);
}

function registerVoiceToAzure(blob) {	
	var filename = new Date().toISOString();

	// register new voice id

	$.ajax({ 
		type: 'POST',
		url: azureURL+'/identificationProfiles', 
		headers: {
			'Ocp-Apim-Subscription-Key': subscriptionKey
		},
		data: {
			locale: 'en-US'
		}, 
		success: function(data){
			var idProf = data.identificationProfileId;
			var data = new FormData();
			data.append('body',blob);
			$.ajax({
				type: 'POST',
				url: '/identificationProfiles/'+idProf+'/enroll',
				headers: {
					'Ocp-Apim-Subscription-Key': subscriptionKey
				},
				data: data,
				success: function(data){
					console.log(data);
					ids.push(idProf);
				}
			})
		}
	})
}

function recognizeVoice(blob){
	var filename = new Date().toISOString();
	var idStr = '';

	for(var i=0;i<ids.length;i++)
		idStr+=ids[i];
	
	var data = new FormData();
	data.append('body',blob);
	
	$.ajax({
		type: 'POST',
		url: azureURL+'/identify?identificationProfileIds='+idStr,
		headers: {
			'Ocp-Apim-Subscription-Key': subscriptionKey
		},
		data: data,
		success: function(data){
			console.log(data);
			pollId = data.identificationId // idk if this is the right one
		}
	})
}

// poll azure if the recognize voice function succeeded
setInterval(function(){
	if(pollId!==''){
		$.ajax({
			type: 'GET',
			url: azureURL+'/operations/'+pollId,
			headers: {
				'Ocp-Apim-Subscription-Key': subscriptionKey
			},
			success: function(data){
				if(data.status==='succeeded'){
					var winner = data.processingResult.identifiedProfileId
					pollId = ''
				} else if(data.status==='failed'){
					pollId = ''
				}
			}
		})
	}
}, 500);