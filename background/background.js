async function filterTab() {
  let tabs = await chrome.tabs.query({
    url: '*://*/_submit?id=*',
  });

  tabs = tabs.filter((tab) => {
    return (
      tab.url.startsWith('http://localhost:5000/_submit?id=') ||
      tab.url.startsWith('https://borang.skrin.xyz/_submit?id=')
    );
  });

  if (tabs.length > 1) {
    const tabs = await chrome.tabs.query({
      currentWindow: true,
      active: true,
      url: '*://*/_submit?id=*',
    });
    if (tabs.length !== 0) {
      chrome.tabs.remove(tabs[0].id);
    }
  }
}

// chrome.tabs.onUpdated.addListener(filterTab);

chrome.runtime.onInstalled.addListener(async () => {
  await chrome.storage.local.set({ isBorangEnabled: true });
});
