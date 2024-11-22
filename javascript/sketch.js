

function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  background(220);
  

  
}

let recorder, mic, recording;
let isRecording = false;
let sampler;

function setup() {
  noCanvas(); // No need for a canvas

  // Initialize microphone and recorder
  mic = new Tone.UserMedia();
  recorder = new Tone.Recorder();

  // Initialize the sampler
  sampler = new Tone.Sampler({
    urls: {
      C4: "https://tonejs.github.io/audio/casio/C4.mp3" // Temporary default sample
    },
    release: 1,
    onload: () => console.log("Sampler ready!"),
  }).toDestination();

  // Connect microphone to recorder
  mic.connect(recorder);

  // Create buttons
  let recordButton = createButton('Start Recording');
  recordButton.mousePressed(recordSample);

  let playButton = createButton('Play Sample');
  playButton.mousePressed(playSample);
}

async function recordSample() {
  if (!isRecording) {
    isRecording = true;
    console.log('Recording started...');

    // Open the microphone and start recording
    await mic.open();
    recorder.start();

    // Stop recording after 2 seconds
    setTimeout(async () => {
      const recordingBuffer = await recorder.stop();
      isRecording = false;
      console.log('Recording stopped.');

      // Load the recorded sample into the sampler
      const recordedAudioUrl = URL.createObjectURL(recordingBuffer);

      sampler.add('C4', recordedAudioUrl, () => {
        console.log('Sample loaded into sampler.');
      });

      // Close the microphone
      mic.close();
    }, 2000);
  }
}

function playSample() {
  console.log('Playing sample...');
  sampler.triggerAttackRelease('C4', 1); // Play the recorded sample for 1 second
}


