const submitUrl = 'https://borang.skrin.xyz/submit';
// const submitUrl = 'http://localhost:5000/submit';

(function injectDiv() {
  let div = document.createElement('div');
  div.id = 'borang-div';
  div.textContent = 'Borang Is Activated';

  document.documentElement.append(div);
})();

let submitButton = document.querySelector(
  // '.freebirdFormviewerViewNavigationSubmitButton'
  // '.uArJ5e.UQuaGc.Y5sE8d.VkkpIf.NqnGTe'
  '.uArJ5e.UQuaGc.Y5sE8d.VkkpIf'
);

if (submitButton) {
  injectScript();
}

function injectScript() {
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
    const counter = +prompt('How many times should the form be submitted?');
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

  const fromExtension = document.createElement('input');
  fromExtension.type = 'hidden';
  fromExtension.setAttribute('name', 'fromExtension');
  fromExtension.value = true;
  form.appendChild(fromExtension);

  form.submit();
}

// Wait util
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Spam form if current path is /submit
(async function spamForm() {
  if (location.href !== submitUrl) {
    return;
  }

  const formUrl = document.querySelector('#formUrl').value;
  const counter = +document.querySelector('#counter').value;
  const body = document.querySelector('#body').value;

  for (let i = 0; i < counter - 1; i++) {
    await wait(10);

    fetch(formUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body,
    });
  }
})();
