const submitUrl = 'https://borang.skrin.xyz/submit';
// const submitUrl = 'http://localhost:5000/submit';

chrome.storage.local.get(['isBorangEnabled']).then((result) => {
  injectDiv(result.isBorangEnabled);

  if (result.isBorangEnabled) {
    enableBorang();
  }
});

function injectDiv(isBorangEnabled) {
  if (location.pathname.startsWith('/_submit')) {
    return;
  }

  const div = document.createElement('div');
  div.id = 'borang-div';
  div.textContent = isBorangEnabled ? 'Borang Enabled' : 'Borang Disabled';

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = isBorangEnabled;
  input.onchange = async (e) => {
    await chrome.storage.local.set({ isBorangEnabled: e.target.checked });
    location.reload();
  };

  document.documentElement.append(div);
  div.prepend(input);
}

function enableBorang() {
  let submitButton = document.querySelector(
    // these used to be the selectors for the submit button, keep here for reference
    // maybe what can be done is to query button element with text 'Submit'
    // '.freebirdFormviewerViewNavigationSubmitButton'
    // '.uArJ5e.UQuaGc.Y5sE8d.VkkpIf.NqnGTe'
    '.uArJ5e.UQuaGc.Y5sE8d.VkkpIf'
  );

  if (submitButton) {
    const form = document.querySelector('form');

    submitButton.onclick = () => {
      const formUrl = form.action;
      form.method = 'POST';
      form.action = submitUrl;

      const counter = +prompt('How many times should the form be submitted?');
      if (!counter) {
        alert('Please enter a number');
        return;
      }
      submitForm(formUrl, counter);
    };
  }
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
