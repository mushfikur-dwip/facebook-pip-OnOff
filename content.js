// This script runs in the context of the web page
chrome.storage.local.get(
  ["isEnabled", "tabPause", "timerInterval", "whitelistEnabled", "whitelist"],
  ({ isEnabled, tabPause, timerInterval, whitelistEnabled, whitelist }) => {
    // Check if current URL is in whitelist
    if (whitelistEnabled && whitelist && whitelist.length > 0) {
      const currentUrl = window.location.href;
      const isWhitelisted = whitelist.some(url => currentUrl.includes(url));
      
      if (isWhitelisted) {
        console.log("This page is whitelisted. PiP blocking disabled.");
        isEnabled = false;
      }
    }

    // Auto-close PiP with configurable timer
    if (isEnabled) {
      // Use default 1000ms if not set
      const interval = timerInterval || 1000;
      
      // PiP detection and closing - no visual overlay
      setInterval(() => {
        const closeBtn = document.querySelector(
          '[aria-label="Close Video and scroll"]'
        );
        
        if (closeBtn) {
          closeBtn.click();
          console.log("PiP video closed");
        }
      }, interval);
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
