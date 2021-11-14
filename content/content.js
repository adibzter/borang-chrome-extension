const submitUrl = 'https://borang.skrin.xyz/submit';
// const submitUrl = 'http://localhost:5000/submit';

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

  const fromExtension = document.createElement('input');
  fromExtension.type = 'hidden';
  fromExtension.setAttribute('name', 'fromExtension');
  fromExtension.value = true;
  form.appendChild(fromExtension);

  form.submit();
}

// Post form locally
if (location.href === submitUrl) {
  const formUrl = document.querySelector('#formUrl').value;
  const counter = +document.querySelector('#counter').value;
  const body = document.querySelector('#body').value;

  for (let i = 0; i < counter - 1; i++) {
    console.log(i);
    fetch(formUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body,
    });
  }

  const message = document.createElement('p');
  document.body.appendChild(message);
  message.innerHTML = `
	${counter} form(s) submitted but it might not reach the server yet. Wait for 1 minute before closing this tab.
	<br><br>
	Since you are using Borang Chrome extension, you can submit unlimited form in the same time. But if you send too many, your PC might freeze.
	<br><br>
	Do not forget to give this extension 5 stars on <a href="https://chrome.google.com/webstore/detail/borang/mokcmggiibmlpblkcdnblmajnplennol" target="_blank">Chrome Web Store</a>
	<br><br>
	This is an open-source project. Feel free to contribute and learn the code.
	<br>
	Server repo: <a href="https://github.com/ADIBzTER/borang">https://github.com/ADIBzTER/borang</a>
	<br>
	Chrome Extension repo: <a href="https://github.com/ADIBzTER/borang-chrome-extension">https://github.com/ADIBzTER/borang-chrome-extension</a>
	`;
}
