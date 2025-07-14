// Extension state
let isEnabled = false;
let tabPause = false;
let whitelistEnabled = false;
let whitelist = [];

// Initialize default settings if first run
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(
    ["isEnabled", "tabPause", "timerInterval", "theme", "whitelistEnabled", "whitelist"], 
    (data) => {
      // Set defaults for any missing values
      const settings = {
        isEnabled: data.isEnabled !== undefined ? data.isEnabled : false,
        tabPause: data.tabPause !== undefined ? data.tabPause : false,
        timerInterval: data.timerInterval || 1000,
        theme: data.theme || "light",
        whitelistEnabled: data.whitelistEnabled || false,
        whitelist: data.whitelist || []
      };
      
      // Save default settings
      chrome.storage.local.set(settings);
      
      // Update local variables
      isEnabled = settings.isEnabled;
      tabPause = settings.tabPause;
      whitelistEnabled = settings.whitelistEnabled;
      whitelist = settings.whitelist;
      
      // Update icon
      updateIcon();
    }
  );
});

// Toggle enabled state
function toggleEnabled() {
  isEnabled = !isEnabled;
  chrome.storage.local.set({ isEnabled: isEnabled });
  updateIcon();
  updateActiveTabs();
}

// Update icon to reflect current state
function updateIcon() {
  // Define badge colors based on state
  let badgeColor = "#4267b2"; // Facebook blue
  let badgeText = "";
  
  if (isEnabled) {
    badgeText = "ON";
    badgeColor = "#45bd62"; // Green for active
  }
  
  // Apply icon and badge updates
  chrome.action.setIcon({ 
    path: {
      16: `icons/icon16${isEnabled ? "" : "-disabled"}.png`,
      32: `icons/icon32${isEnabled ? "" : "-disabled"}.png`,
      48: `icons/icon48${isEnabled ? "" : "-disabled"}.png`
    }
  });
  
  chrome.action.setTitle({
    title: isEnabled ? "Facebook PiP Blocker: Enabled" : "Facebook PiP Blocker: Disabled",
  });
  
  chrome.action.setBadgeText({ text: badgeText });
  chrome.action.setBadgeBackgroundColor({ color: badgeColor });
}

// Update all active Facebook tabs
function updateActiveTabs() {
  chrome.tabs.query({ url: "*://*.facebook.com/*" }, (tabs) => {
    tabs.forEach(tab => {
      chrome.tabs.reload(tab.id);
    });
  });
}

// Quick toggle with icon click (alternative to popup)
chrome.action.onClicked.addListener(() => {
  toggleEnabled();
});

// Load settings on startup
chrome.storage.local.get(
  ["isEnabled", "tabPause", "whitelistEnabled", "whitelist"], 
  (data) => {
    isEnabled = data.isEnabled || false;
    tabPause = data.tabPause || false;
    whitelistEnabled = data.whitelistEnabled || false;
    whitelist = data.whitelist || [];
    updateIcon();
  }
);

// Listen for settings changes
chrome.storage.onChanged.addListener((changes) => {
  if (changes.isEnabled) {
    isEnabled = changes.isEnabled.newValue;
    updateIcon();
  }
  
  if (changes.tabPause) {
    tabPause = changes.tabPause.newValue;
  }
  
  if (changes.whitelistEnabled) {
    whitelistEnabled = changes.whitelistEnabled.newValue;
  }
  
  if (changes.whitelist) {
    whitelist = changes.whitelist.newValue || [];
  }
});

// Content script injection for Facebook pages
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url && 
    tab.url.match(/^https?:\/\/(www\.)?facebook\.com/i)
  ) {
    // Check if the URL is whitelisted
    let shouldRun = true;
    
    if (whitelistEnabled && whitelist && whitelist.length > 0) {
      shouldRun = !whitelist.some(url => tab.url.includes(url));
    }
    
    if (isEnabled || tabPause) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["content.js"],
      });
    }
  }
});

// Track Facebook pages with videos to improve detection
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    isEnabled &&
    changeInfo.status === "complete" &&
    tab.url &&
    tab.url.match(/facebook\.com\/.+\/(videos|watch)/i)
  ) {
    // This is likely a video page, ensure our script is running
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["content.js"],
    });
  }
});
