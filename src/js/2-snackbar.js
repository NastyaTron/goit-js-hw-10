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
      console.log(`✅ Fulfilled promise in ${delay}ms`);
    })
    .catch(delay => console.log(`❌ Rejected promise in ${delay}ms`));
}
