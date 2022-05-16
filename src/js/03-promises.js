
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
formEl.addEventListener('click', onSubmintForm);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
    resolve({ position, delay });
  } else {
    reject({ position, delay });
  }
    }, delay)
  
  })
};

function onSubmintForm(event) {
  event.preventDefault();

  const delay = Number(formEl.delay.value);
  const step = Number(formEl.step.value);
  const amount = Number(formEl.amount.value);
  let delayStart = delay;

  if (delayStart <= 0) {
    return;
  }
    for (let i = 0; i < amount; i += 1) {
      let countStart = i + 1;
  
      createPromise(countStart, delayStart)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
            clickToClose: true,
          });
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
            clickToClose: true,
          });
        });
      delayStart += step;
    };
}
  