let latestM3U8 = '';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'NEW_M3U8') {
    latestM3U8 = message.url;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_M3U8') {
    sendResponse({ url: latestM3U8 });
  }
});

chrome.webRequest.onCompleted.addListener(
  (details) => {
    const url = details.url;
    if (url.includes(".m3u8")) {
      latestM3U8 = url;
      chrome.storage.local.set({ latestM3U8: url });
    }
  },
  { urls: ["<all_urls>"] }
);

