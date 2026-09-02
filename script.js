(function () {
  "use strict";

  var form = document.getElementById("waitlist-form");
  var success = document.getElementById("form-success");
  var err = document.getElementById("form-error");
  var STORAGE_KEY = "personal-waymo-waitlist";

  function showSuccess() {
    if (success) success.hidden = false;
    if (form) form.hidden = true;
  }

  try {
    if (localStorage.getItem(STORAGE_KEY)) showSuccess();
  } catch (_) {}

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (err) { err.hidden = true; err.textContent = ""; }

    var email = document.getElementById("email");
    var age = document.getElementById("age18");
    var ok = true;
    var msg = "";

    if (!email || !email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      ok = false;
      msg = "Please enter a valid email.";
    } else if (!age || !age.checked) {
      ok = false;
      msg = "Confirm you are 18+ to join.";
    }

    if (!ok) {
      if (err) { err.hidden = false; err.textContent = msg; }
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        email: email.value.trim(),
        at: new Date().toISOString()
      }));
    } catch (_) {}

    showSuccess();
  });
})();
