window.addEventListener("message", (event) => {
  if (event.data.type === "FILL_FORM") {
    fillForm(event.data.profile);
  }
});

function fillForm(profile) {
  const inputs = document.querySelectorAll("input, select, textarea");
  
  inputs.forEach(el => {
    let value = "";
    if (profile === "standard") {
      value = getStandardValue(el);
    } else if (profile === "edge") {
      value = "±!@#$%^&*()_+=[]{}|;:',.<>?";
    }

    if (el.tagName === "SELECT") {
      if (el.options.length > 0) el.selectedIndex = 1;
    } else {
      el.value = value;
    }

    // Trigger events for React/Vue
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  });
}

function getStandardValue(el) {
  const name = (el.name || el.id || el.placeholder || "").toLowerCase();
  if (name.includes("email")) return "test@example.com";
  if (name.includes("vorname")) return "Max";
  if (name.includes("nachname")) return "Mustermann";
  if (name.includes("telefon")) return "0123456789";
  if (name.includes("plz")) return "10115";
  return "TestDaten";
}
