/**
 * Feedback form: submit to same-origin /api/feedback (works when site is deployed on Vercel).
 */
(function () {
  var form = document.getElementById("feedback-form");
  var statusEl = document.getElementById("feedback-status");
  if (!form || !statusEl) return;

  function setStatus(message, isError) {
    statusEl.textContent = message;
    statusEl.className = "feedback-status " + (isError ? "feedback-status-error" : "feedback-status-success");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
    }
    setStatus("", false);

    var payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
      amendment: form.amendment.value.trim() || null,
      website: form.website.value.trim(),
    };

    var apiUrl = window.location.origin + "/api/feedback";
    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(function (res) {
        return res.json().then(function (data) {
          if (res.ok) {
            setStatus(data.message || "Thank you. Your feedback has been received.", false);
            form.reset();
          } else {
            setStatus(data.error || "Something went wrong. Please try again.", true);
          }
        });
      })
      .catch(function () {
        setStatus("Unable to send. Check your connection and try again.", true);
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Send feedback";
        }
      });
  });
})();
