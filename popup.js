document.addEventListener("DOMContentLoaded", () => {
  // UI Elements
  const pipToggle = document.getElementById("pipToggle");
  const tabPauseToggle = document.getElementById("tabToggle");
  const timerSlider = document.getElementById("timerSetting");
  const timerValue = document.getElementById("timerValue");
  const whitelistToggle = document.getElementById("whitelistToggle");
  const whitelistSection = document.getElementById("whitelistSection");
  const whitelistInput = document.getElementById("whitelistInput");
  const addWhitelistBtn = document.getElementById("addWhitelist");
  const whitelistItems = document.getElementById("whitelistItems");
  const themeToggle = document.getElementById("themeToggle");
  const navTabs = document.querySelectorAll(".nav-tab");
  const statusText = document.getElementById("statusText");
  const statusIcon = document.getElementById("statusIcon");

  // Initialize theme
  initTheme();

  // Load saved settings
  chrome.storage.local.get(
    ["isEnabled", "tabPause", "timerInterval", "theme", "whitelistEnabled", "whitelist"],
    (data) => {
      // Core settings
      pipToggle.checked = data.isEnabled || false;
      tabPauseToggle.checked = data.tabPause || false;
      
      // Timer settings
      const savedInterval = data.timerInterval || 1000;
      timerSlider.value = savedInterval;
      timerValue.textContent = savedInterval;
      
      // Whitelist settings
      whitelistToggle.checked = data.whitelistEnabled || false;
      whitelistSection.style.display = data.whitelistEnabled ? "block" : "none";
      
      // Load whitelist items
      if (data.whitelist && Array.isArray(data.whitelist)) {
        data.whitelist.forEach(item => addWhitelistItem(item));
      }
      
      // Update status indicators
      updateStatusIndicator(pipToggle.checked);
    }
  );

  // Tab navigation
  navTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const tabId = tab.getAttribute("data-tab");
      
      // Update active tab
      navTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      
      // Show active content
      document.querySelectorAll(".tab-content").forEach(content => {
        content.classList.remove("active");
      });
      document.getElementById(`${tabId}-content`).classList.add("active");
    });
  });

  // Theme toggle
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    
    document.documentElement.setAttribute("data-theme", newTheme);
    themeToggle.innerHTML = newTheme === "light" 
      ? '<i class="fas fa-moon"></i>' 
      : '<i class="fas fa-sun"></i>';
    
    chrome.storage.local.set({ theme: newTheme });
  });

  // Core toggle handlers
  pipToggle.addEventListener("change", () => {
    chrome.storage.local.set({ isEnabled: pipToggle.checked }, () => {
      updateStatusIndicator(pipToggle.checked);
      showToast(pipToggle.checked ? "PiP Auto-Close enabled" : "PiP Auto-Close disabled");
      reloadCurrentTab();
    });
  });

  tabPauseToggle.addEventListener("change", () => {
    chrome.storage.local.set({ tabPause: tabPauseToggle.checked }, () => {
      showToast(tabPauseToggle.checked ? "Tab Pause enabled" : "Tab Pause disabled");
      reloadCurrentTab();
    });
  });

  // Timer settings
  timerSlider.addEventListener("input", () => {
    timerValue.textContent = timerSlider.value;
    chrome.storage.local.set({ timerInterval: Number(timerSlider.value) }, () => {
      if (pipToggle.checked) {
        showToast(`Detection interval set to ${timerSlider.value}ms`);
        reloadCurrentTab();
      }
    });
  });

  // Whitelist functionality
  whitelistToggle.addEventListener("change", () => {
    const isEnabled = whitelistToggle.checked;
    whitelistSection.style.display = isEnabled ? "block" : "none";
    chrome.storage.local.set({ whitelistEnabled: isEnabled }, () => {
      showToast(isEnabled ? "Whitelist mode enabled" : "Whitelist mode disabled");
      if (pipToggle.checked) reloadCurrentTab();
    });
  });

  addWhitelistBtn.addEventListener("click", () => {
    const url = whitelistInput.value.trim();
    if (!url) return showToast("Please enter a valid URL", "error");
    
    chrome.storage.local.get(["whitelist"], (data) => {
      const whitelist = data.whitelist || [];
      if (whitelist.includes(url)) {
        return showToast("This URL is already in the whitelist", "error");
      }
      
      whitelist.push(url);
      chrome.storage.local.set({ whitelist }, () => {
        addWhitelistItem(url);
        whitelistInput.value = "";
        showToast("URL added to whitelist");
      });
    });
  });

  // Send feedback via Email API
  document.getElementById("sendFeedback").addEventListener("click", async () => {
    const feedback = document.getElementById("feedbackText").value.trim();
    if (!feedback) return showToast("Please write your feedback before sending", "error");

    try {
      const res = await fetch("https://formspree.io/f/xrbqvzkn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: feedback,
          _replyto: "musfikurrahmandip@gmail.com",
        }),
      });

      if (res.ok) {
        showToast("Thanks for your feedback!");
        document.getElementById("feedbackText").value = "";
      } else {
        showToast("Failed to send feedback", "error");
      }
    } catch (error) {
      showToast("Network error, please try again", "error");
    }
  });

  // Helper functions
  function reloadCurrentTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) chrome.tabs.reload(tabs[0].id);
    });
  }

  function addWhitelistItem(url) {
    const item = document.createElement("div");
    item.className = "whitelist-item";
    item.innerHTML = `
      <span>${url}</span>
      <button class="remove-whitelist" data-url="${url}">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    item.querySelector(".remove-whitelist").addEventListener("click", function() {
      const urlToRemove = this.getAttribute("data-url");
      chrome.storage.local.get(["whitelist"], (data) => {
        const whitelist = data.whitelist || [];
        const newWhitelist = whitelist.filter(item => item !== urlToRemove);
        chrome.storage.local.set({ whitelist: newWhitelist }, () => {
          item.remove();
          showToast("URL removed from whitelist");
        });
      });
    });
    
    whitelistItems.appendChild(item);
  }

  function showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
      toast.className = toast.className.replace("show", "");
    }, 3000);
  }

  function updateStatusIndicator(isEnabled) {
    if (isEnabled) {
      statusText.textContent = "Active";
      statusText.style.color = "var(--success-color)";
      statusIcon.innerHTML = '<i class="fas fa-shield-alt"></i>';
      statusIcon.style.color = "var(--success-color)";
    } else {
      statusText.textContent = "Inactive";
      statusText.style.color = "var(--danger-color)";
      statusIcon.innerHTML = '<i class="fas fa-shield-alt fa-slash"></i>';
      statusIcon.style.color = "var(--danger-color)";
    }
  }

  function initTheme() {
    chrome.storage.local.get(["theme"], (data) => {
      const savedTheme = data.theme || "light";
      document.documentElement.setAttribute("data-theme", savedTheme);
      
      themeToggle.innerHTML = savedTheme === "light" 
        ? '<i class="fas fa-moon"></i>' 
        : '<i class="fas fa-sun"></i>';
    });
  }
});