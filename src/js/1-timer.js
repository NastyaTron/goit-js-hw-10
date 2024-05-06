import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputEl = document.querySelector('#datetime-picker');
const refs = {
  faceClock: document.querySelector('.timer'),
  dayEl: document.querySelector('[data-days]'),
  hourEl: document.querySelector('[data-hours]'),
  minuteEl: document.querySelector('[data-minutes]'),
  secondEl: document.querySelector('[data-seconds]'),
  startBtn: document.querySelector('[data-start]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate) {
      if (selectedDate.getTime() > Date.now()) {
        userSelectedDate = selectedDate;
        refs.startBtn.disabled = false;
      } else {
        userSelectedDate = null;
        refs.startBtn.disabled = true;
        window.alert('Please choose a date in the future');
      }
    }
  },
};
flatpickr(inputEl, options);

let userSelectedDate = null;
let intervalId = null;
refs.startBtn.disabled = true;

const time = {
  start() {
    if (userSelectedDate) {
      refs.startBtn.disabled = true;
      inputEl.disabled = true;
      intervalId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = userSelectedDate.getTime() - currentTime;

        if (deltaTime <= 0) {
          clearInterval(intervalId);
          refs.startBtn.disabled = true;
          inputEl.disabled = false;
        } else {
          const time1 = convertMs(deltaTime);
          updateClockface(time1);
        }
      }, 1000);
    }
  },
};

refs.startBtn.addEventListener('click', onClickStart);
function onClickStart() {
  time.start();
}

function convertMs(ms) {
  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return {
    days: addLeadingZero(days),
    hours: addLeadingZero(hours),
    minutes: addLeadingZero(minutes),
    seconds: addLeadingZero(seconds),
  };
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.dayEl.textContent = days;
  refs.hourEl.textContent = hours;
  refs.minuteEl.textContent = minutes;
  refs.secondEl.textContent = seconds;
}

iziToast.show({
  title: 'Hey',
  message: 'What would you like to add?',
});
