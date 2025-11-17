let alarmInputs = [];
let alarms = [];
let alarmSound;
let showAlarmText = false;

function preload() {
  soundFormats('mp3');
  alarmSound = loadSound('beep.mp3');
}

function setup() {
  createCanvas(400, 600);

  for (let i = 0; i < 3; i++) {
    let yOffset = 40 + i * 180;

    createElement('h3', `Alarm ${i + 1}`).position(20, yOffset-20);

    createElement('span', 'Hour:').position(20, yOffset + 30);
    let hourInput = createInput().size(40).position(70, yOffset + 30);

    createElement('span', 'Minute:').position(130, yOffset + 30);
    let minuteInput = createInput().size(40).position(190, yOffset + 30);

    createElement('span', 'Second:').position(247, yOffset + 30);
    let secondInput = createInput().size(40).position(310, yOffset + 30);

    let button = createButton('Set Alarm');
    button.position(150, yOffset + 70);
    button.mousePressed(() => {
      let h = int(hourInput.value());
      let m = int(minuteInput.value());
      let s = int(secondInput.value());
      alarms.push({ h, m, s, triggered: false });
      console.log(`Alarm ${i + 1} set for ${nf(h, 2)}:${nf(m, 2)}:${nf(s, 2)}`);
    });

    alarmInputs.push({ hourInput, minuteInput, secondInput });
  }
}

function draw() {
  background(240);

  let h = hour();
  let m = minute();
  let s = second();

  textSize(16);
  fill(0);
  textAlign(LEFT, TOP);
  text("Current Time: " + nf(h, 2) + ":" + nf(m, 2) + ":" + nf(s, 2), 10, 10);

  showAlarmText = false;

  for (let alarm of alarms) {
    if (h === alarm.h && m === alarm.m && s === alarm.s && !alarm.triggered) {
      if (!alarmSound.isPlaying()) {
        alarmSound.play();
      }
      alarm.triggered = true;
      showAlarmText = true;
      console.log("ALARM TRIGGERED at " + nf(h, 2) + ":" + nf(m, 2) + ":" + nf(s, 2));
    }

    if (s !== alarm.s) {
      alarm.triggered = false;
    }
  }

  if (showAlarmText) {
    fill(255, 0, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("ALARM!!!", width / 2, height - 50);
  }
}