//Init Speech Syth API
const synth = window.speechSynthesis;
const body = document.querySelector('body');

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');

//Init voices array

let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
   
    //loop through voices and greate an option for each one
    voices.forEach(voice => {
        //create option element
        const option = document.createElement('option');
        option.textContent = voice.name + '(' + voice.lang + ')';
        //Set needed opton attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
};

getVoices();
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}

//Speak

const speak = () => {

    //check is speaking
    if(synth.speaking){
        console.error("already speaking");
        return;
    }

    if(textInput.value !== ''){
    //add background animation
    body.style.background = '#141414 url(../img/wave.gif)';
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = "100% 100%";

        //get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
    
    //speak end
    speakText.onend = e  => {
        console.log("Done speaking");
        body.style.background = '#141414';
    }
    //speak error
    speakText.onerrer = e =>{
        console.log('Error');
    }

    //selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

    //loop through voices
    voices.forEach(voice => {
        if(voice.name === selectedVoice){
            speakText.voice = voice;
        }
    });
    // Set pitcj and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    //speak
    synth.speak(speakText);
  }
};

//EVENT LISTENERS

//text form submit
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.getBoundingClientRect();
})

//Rate value change
rate.addEventListener('change', e => rateValue.textContent = rate.value);

//Pitch value change
pitch.addEventListener('change', e => rateValue.textContent = pitch.value);

//Voice select change
voiceSelect.addEventListener('change', e => speak());
