document.addEventListener("DOMContentLoaded", () => {
  const pipToggle = document.getElementById("pipToggle");
  const tabPauseToggle = document.getElementById("tabToggle");

  chrome.storage.local.get(["isEnabled", "tabPause"], (data) => {
    pipToggle.checked = data.isEnabled || false;
    tabPauseToggle.checked = data.tabPause || false;
  });

  pipToggle.addEventListener("change", () => {
    chrome.storage.local.set({ isEnabled: pipToggle.checked }, () => {
      reloadCurrentTab();
    });
  });

  tabPauseToggle.addEventListener("change", () => {
    chrome.storage.local.set({ tabPause: tabPauseToggle.checked }, () => {
      reloadCurrentTab();
    });
  });

  function reloadCurrentTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) chrome.tabs.reload(tabs[0].id);
    });
  }


// Send feedback via Email API (e.g. EmailJS or Formspree)
document.getElementById("sendFeedback").addEventListener("click", async () => {
  const feedback = document.getElementById("feedbackText").value.trim();
  if (!feedback) return alert("Please write your feedback before sending.");

  const res = await fetch("https://formspree.io/f/mqkrlyww", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: feedback,
      _replyto: "musfikurrahmandip@gmail.com",
    }),
  });

  if (res.ok) {
    alert("Thanks for your feedback!");
    document.getElementById("feedbackText").value = "";
  } else {
    alert("Failed to send feedback.");
  }
});
});