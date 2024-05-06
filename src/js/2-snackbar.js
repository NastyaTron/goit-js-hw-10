const form = document.querySelector('.form');
const input = document.querySelector('.js-input');
const clickFulfilled = document.querySelector('.js-click-ful');
const clickRejected = document.querySelector('.js-click-rej');

form.addEventListener('submit', onFormSubmit);
function onFormSubmit(event) {
  console.log(event);
  const promise = new Promise((resolve, reject) => {
    setTimeout(params => {}), inputText;
  });
  input.addEventListener('input', event => {
    event.preventDefault();
    const inputText = event.currentTarget.value;
    console.log(inputText);
  });
}
