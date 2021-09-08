(function injectDiv() {
  let div = document.createElement('div');
  div.id = 'borang-div';
  div.textContent = 'Borang Is Activated';

  document.documentElement.append(div);
})();

let submitButton = document.querySelector(
  '.freebirdFormviewerViewNavigationSubmitButton'
);

if (submitButton) {
  injectScript();
}

function injectScript() {
  const submitUrl = 'https://borang.skrin.xyz/submit';
  // const submitUrl = 'http://localhost:5000/submit';
  let script = document.querySelector('body > script');
  let clone = script.cloneNode(true);
  clone.setAttribute('type', 'text/javascript');
  let body = document.querySelector('body');
  body.appendChild(clone);
  const form = document.querySelector('form');
  const formUrl = form.action;
  form.method = 'POST';
  form.action = submitUrl;
  submitButton.onclick = async (e) => {
    const counter = +prompt('How many time you want to submit this form?');
    if (!counter) {
      alert('Please enter a number');
      return;
    }
    submitForm(formUrl, counter);
  };
}

function submitForm(formUrl, submitNumber) {
  const url = document.createElement('input');
  url.type = 'hidden';
  url.setAttribute('name', 'url');
  url.value = formUrl;
  const form = document.querySelector('form');
  form.appendChild(url);
  const counter = document.createElement('input');
  counter.type = 'hidden';
  counter.setAttribute('name', 'counter');
  counter.value = submitNumber;
  form.appendChild(counter);
  form.submit();
}
