(function () {
  "use strict";

  var form = document.getElementById("waitlist-form");
  var success = document.getElementById("form-success");
  var yearEl = document.getElementById("year");
  var STORAGE_KEY = "personal-waymo-waitlist";

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function showSuccess() {
    if (success) success.hidden = false;
    if (form) form.hidden = true;
  }

  // Restore prior local join state (optional)
  try {
    if (localStorage.getItem(STORAGE_KEY)) {
      showSuccess();
    }
  } catch (_) {
    /* ignore */
  }

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var email = document.getElementById("email");
    var age = document.getElementById("age18");
    var emailError = document.getElementById("email-error");
    var ageError = document.getElementById("age-error");
    var emailField = email && email.closest(".field");
    var ageField = age && age.closest(".field");
    var ok = true;

    if (emailField) emailField.classList.remove("invalid");
    if (ageField) ageField.classList.remove("invalid");
    if (emailError) emailError.hidden = true;
    if (ageError) ageError.hidden = true;

    var emailVal = email ? email.value.trim() : "";
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
    if (!emailOk) {
      ok = false;
      if (emailField) emailField.classList.add("invalid");
      if (emailError) emailError.hidden = false;
    }

    if (!age || !age.checked) {
      ok = false;
      if (ageField) ageField.classList.add("invalid");
      if (ageError) ageError.hidden = false;
    }

    if (!ok) return;

    var payload = {
      email: emailVal,
      firstName: (document.getElementById("firstName") || {}).value || "",
      city: (document.getElementById("city") || {}).value || "",
      membership: (document.getElementById("membership") || {}).value || "",
      role: (document.getElementById("role") || {}).value || "",
      age18: true,
      marketing: !!(document.getElementById("marketing") || {}).checked,
      savedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (_) {
      /* ignore quota / private mode */
    }

    // No network post — client-side success only. Wire Formspree later if needed.
    showSuccess();
    if (success) success.scrollIntoView({ behavior: "smooth", block: "center" });
  });
})();
