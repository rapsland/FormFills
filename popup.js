document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("fill-btn").addEventListener("click", async () => {
    const profile = document.getElementById("profile-select").value;
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (tab?.id) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (profile) => {
          // This function runs in the content page context
          window.postMessage({ type: "FILL_FORM", profile }, "*");
        },
        args: [profile]
      });
    }
  });
});
