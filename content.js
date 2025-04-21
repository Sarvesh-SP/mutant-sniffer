const m3u8Links = new Set();

const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.name.includes('.m3u8')) {
      m3u8Links.add(entry.name);
      chrome.runtime.sendMessage({
        type: 'NEW_M3U8',
        url: entry.name
      });
    }
  }
});

observer.observe({ type: 'resource', buffered: true });
