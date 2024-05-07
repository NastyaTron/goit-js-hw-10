import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');
const inputEl = document.querySelector('.js-input');
const clickFulfilled = document.querySelector('.js-click-ful');
const clickRejected = document.querySelector('.js-click-rej');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const delay = inputEl.valueAsNumber;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (clickFulfilled.checked) {
        resolve(delay);
      } else if (clickRejected.checked) {
        reject(delay);
      }
    }, delay);
  });
  promise
    .then(delay => {
      iziToast.error({
        timeout: false,
        position: 'topRight',
        message: `✅ Fulfilled promise in ${delay}ms`,
        messageColor: '#fff',
        backgroundColor: '#5cc285',
        close: false,
        closeOnClick: true,
        icon: false,
      });
      removeForm();
    })
    .catch(delay => {
      iziToast.error({
        timeout: false,
        position: 'topRight',
        message: `❌ Rejected promise in ${delay}ms`,
        messageColor: '#fff',
        backgroundColor: '#d37a7a',
        close: false,
        closeOnClick: true,
        icon: false,
      });
      removeForm();
    });
}

function removeForm() {
  inputEl.value = '';
  clickFulfilled.checked = false;
  clickRejected.checked = false;
}
