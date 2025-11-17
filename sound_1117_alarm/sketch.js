let button;
let input1, input2, input3;
let alarmHour, alarmMinute, alarmSecond;
let alarmTriggered = false;
let showAlarmText = false;
let alarmSound;

function preload() {
  soundFormats('mp3');
  alarmSound = loadSound('beep.mp3');
}

function setup() {
  createCanvas(400, 400);

  createElement('h2', 'Hour:').position(100, 20);
  input1 = createInput();
  input1.position(100, 80);

  createElement('h2', 'Minute:').position(100, 80);
  input2 = createInput();
  input2.position(100, 140);

  createElement('h2', 'Second:').position(100, 140);
  input3 = createInput();
  input3.position(100, 200);

  button = createButton('Set Alarm');
  button.position(100, 250);
  button.mousePressed(setAlarm);
}

function draw() {
  background(220);
  console.log(input1.value() + "시" + input2.value() + "분" + input3.value() + "초");

  let h = hour();
  let m = minute();
  let s = second();

  // 현재 시간 표시
  textSize(16);
  fill(0);
  textAlign(LEFT, TOP);
  text("Current Time: " + nf(h, 2) + ":" + nf(m, 2) + ":" + nf(s, 2), 10, 10);

  // 알람 조건 확인
  if (h === alarmHour && m === alarmMinute && s === alarmSecond && !alarmTriggered) {
    if (!alarmSound.isPlaying()) {
      alarmSound.play();
    }
    alarmTriggered = true;
    showAlarmText = true;
    console.log("ALARM TRIGGERED at " + nf(h, 2) + ":" + nf(m, 2) + ":" + nf(s, 2));
  }

  // 알람 리셋 조건
  if (s !== alarmSecond) {
    alarmTriggered = false;
    showAlarmText = false;
  }

  // 알람 텍스트 표시
  if (showAlarmText) {
    fill(255, 0, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("ALARM!!!", 150, 350);
  }
}

function setAlarm() {
  alarmHour = int(input1.value());
  alarmMinute = int(input2.value());
  alarmSecond = int(input3.value());

  console.log("Alarm set for " + nf(alarmHour, 2) + ":" + nf(alarmMinute, 2) + ":" + nf(alarmSecond, 2));
}