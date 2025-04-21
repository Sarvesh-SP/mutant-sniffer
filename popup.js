chrome.runtime.sendMessage({ type: 'GET_M3U8' }, (response) => {
  const urlDiv = document.getElementById('url');
  if (response?.url) {
    urlDiv.textContent = response.url;
    document.getElementById('copy').onclick = () => {
      navigator.clipboard.writeText(response.url);
      alert('Copied to clipboard!');
    };
  } else {
    urlDiv.textContent = 'No .m3u8 found yet.';
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const urlDisplay = document.getElementById("urlDisplay");
  const copyBtn = document.getElementById("copyBtn");

  chrome.storage.local.get("latestM3U8", (data) => {
    const url = data.latestM3U8;
    if (url) {
      urlDisplay.textContent = `ffmpeg -i ${url} -c copy -bsf:a aac_adtstoasc output.mp4
`;
    } else {
      urlDisplay.textContent = "No .m3u8 found yet.";
    }
  });

  copyBtn.addEventListener("click", () => {
    chrome.storage.local.get("latestM3U8", (data) => {
      if (data.latestM3U8) {
        navigator.clipboard.writeText(data.latestM3U8);
      }
    });
  });
});


