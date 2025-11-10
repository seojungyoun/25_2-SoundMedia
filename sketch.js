let whiteKeys = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
let blackKeys = ['C#4', 'D#4', '', 'F#4', 'G#4', 'A#4', ''];
let whiteLabels = ['도', '레', '미', '파', '솔', '라', '시', '도'];
let blackLabels = ['도♯', '레♯', '', '파♯', '솔♯', '라♯', ''];

let whiteKeyWidth, blackKeyWidth;
let whiteKeyObjs = [], blackKeyObjs = [];
let whiteOsc = [], blackOsc = [];

let currentNote = ''; // 현재 눌린 음계

function setup() {
  createCanvas(800, 350);
  whiteKeyWidth = width / whiteKeys.length;
  blackKeyWidth = whiteKeyWidth * 0.6;

  for (let i = 0; i < whiteKeys.length; i++) {
    let x = i * whiteKeyWidth;
    whiteKeyObjs.push({ x, y: 0, w: whiteKeyWidth, h: 250, note: whiteKeys[i], label: whiteLabels[i], playing: false });

    let osc = new p5.Oscillator();
    osc.setType('sine');
    osc.freq(midiToFreq(noteToMidi(whiteKeys[i])));
    osc.amp(0);
    osc.start();
    whiteOsc.push(osc);
  }

  for (let i = 0; i < blackKeys.length; i++) {
    if (blackKeys[i] === '') {
      blackKeyObjs.push(null);
      blackOsc.push(null);
      continue;
    }
    let x = (i + 1) * whiteKeyWidth - blackKeyWidth / 2;
    blackKeyObjs.push({ x, y: 0, w: blackKeyWidth, h: 150, note: blackKeys[i], label: blackLabels[i], playing: false });

    let osc = new p5.Oscillator();
    osc.setType('sine');
    osc.freq(midiToFreq(noteToMidi(blackKeys[i])));
    osc.amp(0);
    osc.start();
    blackOsc.push(osc);
  }
}

function draw() {
  background(255);

  // Draw white keys
  for (let i = 0; i < whiteKeyObjs.length; i++) {
    fill(whiteKeyObjs[i].playing ? '#ffd700' : '#ffffff');
    stroke(0);
    rect(whiteKeyObjs[i].x, whiteKeyObjs[i].y, whiteKeyObjs[i].w, whiteKeyObjs[i].h);
  }

  // Draw black keys
  for (let i = 0; i < blackKeyObjs.length; i++) {
    if (blackKeyObjs[i] === null) continue;
    fill(blackKeyObjs[i].playing ? '#ff4500' : '#000000');
    noStroke();
    rect(blackKeyObjs[i].x, blackKeyObjs[i].y, blackKeyObjs[i].w, blackKeyObjs[i].h);
  }

  // Draw current note (left bottom corner)
  if (currentNote !== '') {
    fill(0);
    textAlign(LEFT, BOTTOM);
    textSize(18);
    text(currentNote, 10, height - 10);
  }
}

function mousePressed() {
  for (let i = 0; i < blackKeyObjs.length; i++) {
    if (blackKeyObjs[i] === null) continue;
    let k = blackKeyObjs[i];
    if (mouseX > k.x && mouseX < k.x + k.w && mouseY > k.y && mouseY < k.y + k.h) {
      k.playing = true;
      blackOsc[i].amp(0.5, 0.05);
      currentNote = k.label;
      return;
    }
  }

  for (let i = 0; i < whiteKeyObjs.length; i++) {
    let k = whiteKeyObjs[i];
    if (mouseX > k.x && mouseX < k.x + k.w && mouseY > k.y && mouseY < k.y + k.h) {
      k.playing = true;
      whiteOsc[i].amp(0.5, 0.05);
      currentNote = k.label;
      return;
    }
  }
}

function mouseReleased() {
  for (let i = 0; i < whiteKeyObjs.length; i++) {
    whiteKeyObjs[i].playing = false;
    whiteOsc[i].amp(0, 0.5);
  }
  for (let i = 0; i < blackKeyObjs.length; i++) {
    if (blackKeyObjs[i] === null) continue;
    blackKeyObjs[i].playing = false;
    blackOsc[i].amp(0, 0.5);
  }
  currentNote = ''; // 마우스 떼면 음계 지우기
}

function noteToMidi(note) {
  const noteMap = {
    'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4,
    'F': 5, 'F#': 6, 'G': 7, 'G#': 8, 'A': 9,
    'A#': 10, 'B': 11
  };
  let pitch = note.length === 3 ? note.slice(0, 2) : note.slice(0, 1);
  let octave = parseInt(note.slice(-1));
  return 12 * (octave + 1) + noteMap[pitch];
}