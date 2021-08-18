// const body = document.querySelector('body');
// const scriptElement = document.createElement('script');

// (async () => {
//   let script = await fetch('https://desperate.skrin.xyz/inject.js', {
//     mode: 'no-cors',
//   });
//   script = script.text();
//   console.log(script);
// })();

// Origin of the code https://phpcoder.tech/detect-url-change-in-javascript-without-refresh/
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    onUrlChange();
  }
}).observe(document, { subtree: true, childList: true });

function onUrlChange() {
  const submitButton = document.querySelector(
    '.freebirdFormviewerViewNavigationSubmitButton'
  );

  if (submitButton) {
    const submitUrl = 'https://desperate.skrin.xyz/submit';
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
    function submitForm(formUrl, submitNumber) {
      const url = document.createElement('input');
      url.type = 'hidden';
      url.setAttribute('name', 'url');
      url.value = formUrl;
      form.appendChild(url);
      const counter = document.createElement('input');
      counter.type = 'hidden';
      counter.setAttribute('name', 'counter');
      counter.value = submitNumber;
      form.appendChild(counter);
      form.submit();
    }
  }
}
