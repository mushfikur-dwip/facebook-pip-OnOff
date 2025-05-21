// This script runs in the context of the web page
// and can interact with the page's DOM.
chrome.storage.local.get("isEnabled", ({ isEnabled }) => {
  if (isEnabled) {
    let pipInterval = setInterval(() => {
      const closeBtn = document.querySelector(
        '[aria-label="Close Video and scroll"]'
      );
      if (closeBtn) {
        closeBtn.click();
        console.log("PiP video closed");
      }
    }, 1000);

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

    window.addEventListener("blur", () => {
      pauseVideo();
    });

    window.addEventListener("focus", () => {
      playVideo();
    });
  }
});
