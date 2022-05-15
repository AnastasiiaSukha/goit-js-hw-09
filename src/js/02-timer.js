
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let intervalId = null;
let userSelectDate = '';

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      userSelectDate = selectedDates[0].getTime();
      if (userSelectDate < options.defaultDate) {
    Notify.failure('Please choose a date in the future', {
      timeout: 1300,
      showOnlyTheLastOne: true,
      clickToClose: true,
    });
    refs.startBtn.disabled = true;
    return;
  }

    refs.startBtn.disabled = false;
    getTimeCount();
  },
};

flatpickr('#datetime-picker', options);


function getTimeCount() {
  const nowTime = Date.now();
  const timeDifference = userSelectDate - nowTime;
  const time = convertMs(timeDifference);
  console.log(time);

  if (timeDifference > 0) {
    updateCoundown(time);
  }

}

function updateCoundown({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}



function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};
refs.startBtn.addEventListener('click', () => {
  intervalId = setInterval(getTimeCount, 1000);
});
