/* ============================================================
   EASY CLEAN MOROCCO — Interactions
   ============================================================ */
(function () {
  "use strict";

  const doc = document.documentElement;
  const body = document.body;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const WHATSAPP_NUMBER = "212661285868";
  const LANG_KEY = "ecm-lang";

  /* ---------- En-tête au scroll ---------- */
  const header = document.getElementById("header");
  const onScroll = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Menu mobile ---------- */
  const burger = document.getElementById("burger");
  const mobileNav = document.getElementById("mobileNav");

  const closeMenu = () => {
    if (!mobileNav || !burger) return;
    mobileNav.classList.remove("is-open");
    mobileNav.setAttribute("aria-hidden", "true");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", doc.lang === "ar" ? "فتح القائمة" : "Ouvrir le menu");
    body.classList.remove("menu-open");
  };

  const openMenu = () => {
    if (!mobileNav || !burger) return;
    mobileNav.classList.add("is-open");
    mobileNav.setAttribute("aria-hidden", "false");
    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", doc.lang === "ar" ? "إغلاق القائمة" : "Fermer le menu");
    body.classList.add("menu-open");
  };

  if (burger && mobileNav) {
    burger.addEventListener("click", () => {
      if (mobileNav.classList.contains("is-open")) closeMenu();
      else openMenu();
    });
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && mobileNav.classList.contains("is-open")) {
        closeMenu();
        burger.focus();
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) closeMenu();
    });
  }

  /* ---------- Révélation au scroll ---------- */
  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  if (revealEls.length) {
    revealEls.forEach((el) => {
      const siblings = Array.from(el.parentElement.querySelectorAll(":scope > .reveal"));
      const index = siblings.indexOf(el);
      if (index > 0) el.style.transitionDelay = Math.min(index * 70, 280) + "ms";
    });

    if ("IntersectionObserver" in window && !reduceMotion) {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      revealEls.forEach((el) => revealObserver.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    }
  }

  /* ---------- Navigation active ---------- */
  const navLinks = Array.from(document.querySelectorAll(".nav__link"));
  if (navLinks.length && "IntersectionObserver" in window) {
    const map = new Map();
    navLinks.forEach((link) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) map.set(target, link);
    });
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((l) => l.classList.remove("is-active"));
          const link = map.get(entry.target);
          if (link) link.classList.add("is-active");
        });
      },
      { rootMargin: "-42% 0px -52% 0px", threshold: 0 }
    );
    map.forEach((_, section) => spy.observe(section));
  }

  /* ---------- Accordéon FAQ ---------- */
  const faqItems = Array.from(document.querySelectorAll(".faq-item"));
  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      faqItems.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ---------- Langue FR / AR ---------- */
  const langToggle = document.getElementById("langToggle");
  const metaDescription = document.querySelector('meta[name="description"]');
  const metaTitles = {
    fr: "Easy Clean Morocco — Nettoyage industriel, hygiène & sécurité au Maroc",
    ar: "Easy Clean Morocco — التنظيف الصناعي والنظافة والسلامة في المغرب"
  };
  const metaDescriptions = {
    fr: "Easy Clean Morocco accompagne les entreprises au Maroc : nettoyage industriel, prestations de nettoyage, produits et matériel, équipements de sécurité, dératisation et désinsectisation. Devis gratuit sous 24 h.",
    ar: "ترافق Easy Clean Morocco الشركات في المغرب: التنظيف الصناعي، خدمات التنظيف، المنتجات والمعدات، معدات السلامة، ومكافحة القوارض والحشرات. عرض سعر مجاني خلال 24 ساعة."
  };

  function applyLanguage(lang, persist) {
    const isAr = lang === "ar";
    doc.lang = lang;
    doc.dir = isAr ? "rtl" : "ltr";

    document.querySelectorAll("[data-ar]").forEach((el) => {
      if (!el.dataset.fr) el.dataset.fr = el.innerHTML;
      const dot = el.querySelector(":scope > .eyebrow__dot");
      const dotHTML = dot ? dot.outerHTML : "";
      el.innerHTML = isAr ? dotHTML + el.dataset.ar : el.dataset.fr;
    });

    document.querySelectorAll("[data-ar-ph]").forEach((el) => {
      if (!el.dataset.frPh) el.dataset.frPh = el.getAttribute("placeholder") || "";
      el.setAttribute("placeholder", isAr ? el.dataset.arPh : el.dataset.frPh);
    });

    document.querySelectorAll("[data-ar-label]").forEach((el) => {
      if (!el.dataset.frLabel) el.dataset.frLabel = el.getAttribute("aria-label") || "";
      el.setAttribute("aria-label", isAr ? el.dataset.arLabel : el.dataset.frLabel);
    });

    document.title = isAr
      ? (body.dataset.titleAr || metaTitles.ar)
      : (body.dataset.titleFr || metaTitles.fr);
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        isAr
          ? (body.dataset.descAr || metaDescriptions.ar)
          : (body.dataset.descFr || metaDescriptions.fr)
      );
    }

    if (langToggle) {
      const label = langToggle.querySelector(".lang-toggle__label");
      if (label) label.textContent = isAr ? "Français" : "العربية";
      langToggle.setAttribute("aria-label", isAr ? "Passer en français" : "Passer en arabe");
    }

    if (burger) {
      burger.setAttribute("aria-label", isAr ? "فتح القائمة" : "Ouvrir le menu");
    }

    if (persist) {
      try { localStorage.setItem(LANG_KEY, lang); } catch (error) { /* stockage indisponible */ }
    }
  }

  let storedLang = "fr";
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "ar" || saved === "fr") storedLang = saved;
  } catch (error) { /* stockage indisponible */ }
  applyLanguage(storedLang, false);

  if (langToggle) {
    langToggle.addEventListener("click", () => {
      const next = doc.lang === "ar" ? "fr" : "ar";
      applyLanguage(next, true);
    });
  }

  /* ---------- Formulaire → WhatsApp ---------- */
  const form = document.getElementById("quoteForm");
  if (!form) return;

  const status = document.getElementById("formStatus");
  const nameInput = form.querySelector("#name");
  const phoneInput = form.querySelector("#phone");
  const emailInput = form.querySelector("#email");
  const serviceInput = form.querySelector("#service");
  const consentInput = form.querySelector("#consent");
  const honeypot = form.querySelector("#website");

  const isArabic = () => doc.lang === "ar";

  const setInvalid = (input, invalid) => {
    if (!input) return;
    const field = input.closest(".field");
    if (field) field.classList.toggle("is-invalid", invalid);
    input.setAttribute("aria-invalid", invalid ? "true" : "false");
  };

  const emailIsValid = (value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  const phoneIsValid = (value) => value.replace(/[^\d]/g, "").length >= 8;

  [nameInput, phoneInput, emailInput, serviceInput, consentInput].forEach((input) => {
    if (!input) return;
    const eventName = input.type === "checkbox" || input.tagName === "SELECT" ? "change" : "input";
    input.addEventListener(eventName, () => {
      if (input === emailInput) setInvalid(input, !emailIsValid(input.value.trim()));
      else if (input === phoneInput) setInvalid(input, !phoneIsValid(input.value.trim()));
      else if (input === nameInput) setInvalid(input, !input.value.trim());
      else setInvalid(input, false);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (honeypot && honeypot.value.trim() !== "") return;

    const name = nameInput ? nameInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const company = (form.querySelector("#company")?.value || "").trim();
    const service = serviceInput ? serviceInput.value : "";
    const message = (form.querySelector("#message")?.value || "").trim();
    const consent = consentInput ? consentInput.checked : false;

    const invalidName = !name;
    const invalidPhone = !phoneIsValid(phone);
    const invalidEmail = !emailIsValid(email);
    const invalidService = !service;
    const invalidConsent = !consent;

    setInvalid(nameInput, invalidName);
    setInvalid(phoneInput, invalidPhone);
    setInvalid(emailInput, invalidEmail);
    setInvalid(serviceInput, invalidService);
    if (consentInput) consentInput.setAttribute("aria-invalid", invalidConsent ? "true" : "false");

    if (invalidName || invalidPhone || invalidEmail || invalidService || invalidConsent) {
      if (status) {
        status.textContent = isArabic()
          ? "يرجى التحقق من الحقول المحددة بالأحمر."
          : "Merci de vérifier les champs indiqués en rouge.";
        status.classList.add("is-error");
      }
      const firstInvalid = [nameInput, phoneInput, emailInput, serviceInput, consentInput].find(
        (input) => input && input.getAttribute("aria-invalid") === "true"
      );
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const lines = isArabic()
      ? [
          "مرحباً Easy Clean Morocco،",
          "",
          "الاسم: " + name,
          company ? "الشركة: " + company : "",
          "الهاتف: " + phone,
          email ? "البريد الإلكتروني: " + email : "",
          "الخدمة: " + service,
          message ? "الاحتياج: " + message : "",
          "",
          "أرغب في الحصول على عرض سعر. شكراً."
        ]
      : [
          "Bonjour Easy Clean Morocco,",
          "",
          "Nom : " + name,
          company ? "Société : " + company : "",
          "Téléphone : " + phone,
          email ? "E-mail : " + email : "",
          "Service : " + service,
          message ? "Besoin : " + message : "",
          "",
          "Je souhaite recevoir un devis. Merci."
        ];

    const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.filter(Boolean).join("\n"));

    if (status) {
      status.textContent = isArabic()
        ? "طلبكم جاهز. سيفتح واتساب بعد لحظات."
        : "Votre demande est prête. WhatsApp va s’ouvrir dans un instant.";
      status.classList.remove("is-error");
    }

    const opened = window.open(url, "_blank");
    if (opened) {
      try { opened.opener = null; } catch (error) { /* navigation externe */ }
    } else {
      window.location.href = url;
    }
  });
})();
