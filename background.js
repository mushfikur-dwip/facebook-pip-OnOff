let isEnabled = false;

function toggleEnabled() {
  isEnabled = !isEnabled;
  chrome.storage.local.set({ isEnabled: isEnabled });
  updateIcon();
  setTimeout(() => {
    chrome.tabs.reload();
  }, 1000);
}

function updateIcon() {
  const icon = isEnabled ? "icons/icon16.png" : "icons/icon32.png";
  chrome.action.setIcon({ path: { 16: icon, 32: icon, 48: icon } });
  chrome.action.setTitle({
    title: isEnabled ? "Facebook PiP Blocker: Enabled" : "Disabled",
  });
  chrome.action.setBadgeText({ text: isEnabled ? "ON" : "OFF" });
}

chrome.action.onClicked.addListener(() => {
  toggleEnabled();
});

chrome.storage.local.get("isEnabled", (data) => {
  isEnabled = data.isEnabled || false;
  updateIcon();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    isEnabled &&
    changeInfo.status === "complete" &&
    /^https?:\/\/(www\.)?facebook\.com\/.+\/videos\/.+$/i.test(tab.url)
  ) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["content.js"],
    });
  }
});
