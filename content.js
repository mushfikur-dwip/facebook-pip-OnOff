// This script runs in the context of the web page
chrome.storage.local.get(
  ["isEnabled", "tabPause"],
  ({ isEnabled, tabPause }) => {
    // Auto-close PiP
    if (isEnabled) {
      setInterval(() => {
        const closeBtn = document.querySelector(
          '[aria-label="Close Video and scroll"]'
        );
        if (closeBtn) {
          closeBtn.click();
          console.log("PiP video closed");
        }
      }, 1000);
    }

    // Pause/Play on Tab Switch
    if (tabPause) {
      function pauseVideo() {
        const pauseBtn = document.querySelector('[aria-label="Pause"]');
        if (pauseBtn) {
          pauseBtn.click();
          console.log("Video paused due to tab switch");
        }
      }

      function playVideo() {
        const playBtn = document.querySelector('[aria-label="Play"]');
        if (playBtn) {
          playBtn.click();
          console.log("Video resumed due to tab focus");
        }
      }

      window.addEventListener("blur", pauseVideo);
      window.addEventListener("focus", playVideo);
    }
  }
);
