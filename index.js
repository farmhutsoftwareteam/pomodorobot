const { Client } = require('whatsapp-web.js');
const express = require('express');
const bodyParser = require('body-parser');
const qrcode = require('qrcode-terminal');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const client = new Client({
  
});

let timerId = null;
let workDuration = 25 * 60 * 1000; // 25 minutes in milliseconds
let breakDuration = 5 * 60 * 1000; // 5 minutes in milliseconds
let timerStatus = null;

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', async (message) => {
  console.log('Message received: ', message.body);
  const response = await handleMessage(message);
  client.sendMessage(message.from, response);
});

async function handleMessage(message) {
  const body = message.body.toLowerCase().trim();
  let response;

  switch (body) {
    case 'start':
      if (timerId !== null) {
        response = 'A timer is already running!';
      } else {
        timerStatus = 'work';
        response = `Starting a new Pomodoro timer of ${workDuration / 1000 / 60} minutes. Type "status" to check the time remaining.`;
        timerId = setInterval(() => {
          if (timerStatus === 'work') {
            workDuration -= 1000;
            if (workDuration <= 0) {
              clearInterval(timerId);
              timerId = null;
              timerStatus = null;
              response = 'Pomodoro completed! Take a break.';
            } else {
              response = `Working... ${workDuration / 1000 / 60} minutes left. Type "status" to check the time remaining.`;
            }
          } else if (timerStatus === 'break') {
            breakDuration -= 1000;
            if (breakDuration <= 0) {
              clearInterval(timerId);
              timerId = null;
              timerStatus = null;
              response = 'Break is over. Time to work again!';
            } else {
              response = `Taking a break... ${breakDuration / 1000 / 60} minutes left. Type "status" to check the time remaining.`;
            }
          }
          client.sendMessage(message.from, response);
        }, 1000);
      }
      break;
    case 'stop':
      if (timerId === null) {
        response = 'There is no timer running!';
      } else {
        clearInterval(timerId);
        timerId = null;
        timerStatus = null;
        response = 'Timer stopped.';
      }
      break;
    case 'work':
      const workMinutes = parseInt(message.body.split(' ')[1], 10);
      if (isNaN(workMinutes) || workMinutes <= 0) {
        response = 'Please specify a valid duration for the work interval in minutes.';
      } else {
        workDuration = workMinutes * 60 * 1000;
        response = `Work interval duration set to ${workMinutes} minutes.`;
      }
      break;
    case 'break':
      const breakMinutes = parseInt(message.body.split(' ')[1], 10);
      if (isNaN(breakMinutes) || breakMinutes <= 0) {
        response = 'Please specify a valid duration for the break interval in minutes.';
    } else {
      breakDuration = breakMinutes * 60 * 1000;
      response = `Break interval duration set to ${breakMinutes} minutes.`;
    }
    break;
  case 'status':
    if (timerId === null) {
      response = 'There is no timer running!';
    } else {
      const timeRemaining = timerStatus === 'work' ? workDuration : breakDuration;
      response = `${timerStatus.charAt(0).toUpperCase() + timerStatus.slice(1)} in progress... ${Math.ceil(
        timeRemaining / 1000 / 60,
      )} minutes remaining.`;
    }
    break;
  default:
    response =
      'Invalid command. Please use one of the following commands: start, stop, work [duration], break [duration], status.';
}
return response;
}

client.initialize();

app.listen(port, () => {
console.log(`Server running on port ${port}`);
});

