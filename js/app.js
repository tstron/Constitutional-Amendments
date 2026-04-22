(function () {
  "use strict";

  // Mobile nav toggle (used on every page)
  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("#nav");

  if (header && navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var isOpen = header.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen);
      document.body.classList.toggle("nav-open", isOpen);
    });

    document.querySelectorAll(".nav-list a").forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      });
    });
  }

  // Amendment rendering (only on pages that provide data)
  var AMENDMENTS_DATA = window.AMENDMENTS_DATA;
  if (!AMENDMENTS_DATA || !AMENDMENTS_DATA.length) return;

  var singlePageContainer = document.querySelector("[data-amendment-page]");
  var listContainer = document.querySelector("[data-amendments-container]");

  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function renderSectionBlock(section) {
    var title = escapeHtml(section.title);
    var body = escapeHtml(section.body);
    return (
      '<div class="amendment-section-block">' +
      '<h3 class="amendment-section-title">' + title + "</h3>" +
      '<p class="amendment-section-body">' + body + "</p>" +
      "</div>"
    );
  }

  function renderVersionContent(version, amendmentId, isActive) {
    var versionId = amendmentId + "-" + version.id;
    var activeClass = isActive ? " is-active" : "";
    var sectionsHtml = version.content
      .map(function (s) {
        return renderSectionBlock(s);
      })
      .join("");
    return (
      '<div class="amendment-version-content' +
      activeClass +
      '" id="' +
      escapeHtml(versionId) +
      '" data-version-id="' +
      escapeHtml(version.id) +
      '" role="tabpanel">' +
      sectionsHtml +
      "</div>"
    );
  }

  function renderVersionHistory(versions, amendmentId, activeVersionId) {
    if (!versions || versions.length <= 1) return "";

    var buttons = versions
      .map(function (v) {
        var isActive = v.id === activeVersionId ? " is-active" : "";
        var label = escapeHtml(v.label);
        return (
          '<li><button type="button" class="version-history-btn' +
          isActive +
          '" data-version-id="' +
          escapeHtml(v.id) +
          '" data-amendment-id="' +
          escapeHtml(amendmentId) +
          '">' +
          label +
          "</button></li>"
        );
      })
      .join("");

    return (
      '<div class="version-history">' +
      '<p class="version-history-title">Version history</p>' +
      '<ul class="version-history-list">' +
      buttons +
      "</ul>" +
      "</div>"
    );
  }

  function renderAmendment(amendment) {
    var versions = amendment.versions;
    var firstVersion = versions[0];
    var versionOptions = versions
      .map(function (v) {
        return (
          '<option value="' +
          escapeHtml(v.id) +
          '"' +
          (v.id === firstVersion.id ? " selected" : "") +
          ">" +
          escapeHtml(v.label) +
          "</option>"
        );
      })
      .join("");

    var versionPanels = versions
      .map(function (v, i) {
        return renderVersionContent(v, amendment.id, i === 0);
      })
      .join("");

    var versionHistoryHtml =
      renderVersionHistory(versions, amendment.id, firstVersion.id) || "";

    var card = document.createElement("article");
    card.className = "amendment-card";
    card.setAttribute("data-amendment-id", amendment.id);

    card.innerHTML =
      '<div class="amendment-card-header">' +
      '<h2 class="amendment-card-title">' +
      escapeHtml(amendment.title) +
      "</h2>" +
      '<div class="version-select-wrap">' +
      '<label for="version-select-' +
      escapeHtml(amendment.id) +
      '">Version</label>' +
      '<select class="version-select" id="version-select-' +
      escapeHtml(amendment.id) +
      '" aria-label="Select version">' +
      versionOptions +
      "</select>" +
      "</div>" +
      "</div>" +
      '<div class="amendment-body">' +
      versionPanels +
      versionHistoryHtml +
      "</div>";

    var select = card.querySelector(".version-select");
    var versionContents = card.querySelectorAll(".amendment-version-content");
    var historyButtons = card.querySelectorAll(".version-history-btn");

    function setActiveVersion(versionId) {
      versionContents.forEach(function (panel) {
        panel.classList.toggle(
          "is-active",
          panel.getAttribute("data-version-id") === versionId
        );
      });
      historyButtons.forEach(function (btn) {
        btn.classList.toggle(
          "is-active",
          btn.getAttribute("data-version-id") === versionId
        );
      });
      if (select) select.value = versionId;
    }

    if (select) {
      select.addEventListener("change", function () {
        setActiveVersion(select.value);
      });
    }

    historyButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        setActiveVersion(btn.getAttribute("data-version-id"));
      });
    });

    return card;
  }

  function renderSingleAmendmentPage(container) {
    var amendmentId = container.getAttribute("data-amendment-page");
    if (!amendmentId) return;
    var amendment = AMENDMENTS_DATA.filter(function (a) {
      return a.id === amendmentId;
    })[0];
    if (!amendment) return;

    var versions = amendment.versions;
    var firstVersion = versions[0];
    var versionOptions = versions
      .map(function (v) {
        return (
          '<option value="' +
          escapeHtml(v.id) +
          '"' +
          (v.id === firstVersion.id ? " selected" : "") +
          ">" +
          escapeHtml(v.label) +
          "</option>"
        );
      })
      .join("");

    var versionPanels = versions
      .map(function (v, i) {
        return renderVersionContent(v, amendment.id, i === 0);
      })
      .join("");

    var versionHistoryHtml =
      renderVersionHistory(versions, amendment.id, firstVersion.id) || "";

    var wrap = document.createElement("div");
    wrap.className = "amendment-single-content";
    wrap.innerHTML =
      '<div class="version-select-wrap amendment-single-version">' +
      '<label for="version-select-' +
      escapeHtml(amendment.id) +
      '">Version</label>' +
      '<select class="version-select" id="version-select-' +
      escapeHtml(amendment.id) +
      '" aria-label="Select version">' +
      versionOptions +
      "</select>" +
      "</div>" +
      '<div class="amendment-body">' +
      versionPanels +
      versionHistoryHtml +
      "</div>";

    container.appendChild(wrap);

    var select = wrap.querySelector(".version-select");
    var versionContents = wrap.querySelectorAll(".amendment-version-content");
    var historyButtons = wrap.querySelectorAll(".version-history-btn");

    function setActiveVersion(versionId) {
      versionContents.forEach(function (panel) {
        panel.classList.toggle(
          "is-active",
          panel.getAttribute("data-version-id") === versionId
        );
      });
      historyButtons.forEach(function (btn) {
        btn.classList.toggle(
          "is-active",
          btn.getAttribute("data-version-id") === versionId
        );
      });
      if (select) select.value = versionId;
    }

    if (select) {
      select.addEventListener("change", function () {
        setActiveVersion(select.value);
      });
    }
    historyButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        setActiveVersion(btn.getAttribute("data-version-id"));
      });
    });
  }

  if (singlePageContainer) {
    renderSingleAmendmentPage(singlePageContainer);
  } else if (listContainer) {
    AMENDMENTS_DATA.forEach(function (amendment) {
      listContainer.appendChild(renderAmendment(amendment));
    });
  }
})();
