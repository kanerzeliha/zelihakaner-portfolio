/* =========================================================
   Zeliha Kaner — Portfolio runtime
   - content rendering (TR / EN)
   - light / dark theme with radial reveal transition
   - welcome intro (scroll-driven), neural network hero, ZK monogram
   - typing code stream
   - light streaks ("parıltı") & sparks
   ========================================================= */
(function () {
  "use strict";

  var DATA = JSON.parse(document.getElementById("zk-data").textContent);
  var root = document.documentElement;
  var REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  var lang = store.get("zk-lang");
  if (lang !== "tr" && lang !== "en") lang = (navigator.language || "tr").toLowerCase().indexOf("tr") === 0 ? "tr" : "en";

  function L(v) {
    if (v && typeof v === "object" && !Array.isArray(v)) return v[lang] || v.en || v.tr || "";
    return v == null ? "" : v;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }
  function paras(s) { return String(s || "").split(/\n\s*\n/).map(function (p) { return "<p>" + esc(p.trim()) + "</p>"; }).join(""); }

  /* ---------------- UI strings ---------------- */
  var T = {
    tr: {
      brandRole: "Yazılım Mühendisi", navAbout: "Hakkımda", navWork: "Projeler", navSystems: "Yetkinlikler", navBlog: "Blog", navContact: "İletişim",
      available: "Yeni fırsatlara açık", viewWork: "Projeleri gör", downloadCv: "CV'yi indir",
      selected: "Seçili iş", core: "Uzmanlık", philosophy: "Felsefe", status: "Durum", statusVal: "Fırsatlara açık", viewCase: "Vakayı incele",
      featured: "Öne çıkan uzmanlık", whatIDo: "Ne yapıyorum", whatIDoP: "Ham veriyi, üretim hattında ve sahada karar veren sistemlere dönüştürüyorum — modelden API'ye, sensörden panele.",
      workKicker: "Seçili projeler", workTitle: "Öne çıkan projeler", readMore: "İncele",
      skillsKicker: "Araç kutusu", skillsTitle: "Yetkinlikler", tools: "araç",
      xpKicker: "Kariyer", xpTitle: "Deneyim", details: "Detaylar", present: "Devam ediyor", now: "Şu an",
      aboutKicker: "Hikâyem", aboutTitle: "Hakkımda", readStory: "Hikâyenin tamamı", journey: "Yolculuk", education: "Eğitim",
      location: "Konum", languages: "Diller", gpa: "GNO",
      blogKicker: "Yazılar", blogTitle: "Teknik blog", blogSub: "Sahada öğrendiklerimi kısa ve uygulanabilir notlar olarak yazıyorum.", readPost: "Yazıyı oku",
      contactTitle: "Birlikte inşa edelim", contactP: "Bir rol, proje ya da fikir için yaz — genellikle 1-2 gün içinde dönüyorum.",
      formTitle: "İletişim", fName: "Adın", fEmail: "E-posta", fSubject: "Konu", fMsg: "Mesajın", send: "Gönder",
      sending: "Gönderiliyor…", sent: "Teşekkürler! Mesajın ulaştı.", sendErr: "Gönderilemedi — e-posta uygulaman açılıyor.",
      objective: "Amaç", whatIDid: "Ne yaptım", coreFeatures: "Öne çıkanlar", stack: "Teknolojiler", more: "Detaylı anlatım",
      achievements: "Katkılar", focus: "Odak", rights: "Tüm hakları saklıdır.",
      roleSub: "Yazılım Mühendisi · Yapay Zekâ & Veri",
      introKicker: "Zeliha Kaner — Portfolyo", welcome: "Hoş geldiniz", introHint: "Keşfetmek için kaydır", introSkip: "Atla →",
      introWords: ["Veri.", "Zekâ.", "Tasarım."], introFinal: "Hepsi *tek *bir *sistemde buluşuyor.",
      marquee: ["Yazılım mühendisliği", "Yapay zekâ", "Veri analitiği", "Bilgisayarlı görü", "Endüstriyel otomasyon", "RAG & LLM", "Süreç madenciliği", "IoT"],
      zkCap: "zeliha · kaner"
    },
    en: {
      brandRole: "Software Engineer", navAbout: "About", navWork: "Work", navSystems: "Systems", navBlog: "Blog", navContact: "Contact",
      available: "Open to opportunities", viewWork: "View work", downloadCv: "Download CV",
      selected: "Selected work", core: "Core expertise", philosophy: "Philosophy", status: "Status", statusVal: "Available", viewCase: "View case study",
      featured: "Featured expertise", whatIDo: "What I do", whatIDoP: "I turn raw data into systems that make decisions on the production line and in the field — from model to API, from sensor to dashboard.",
      workKicker: "Selected projects", workTitle: "Featured projects", readMore: "Explore",
      skillsKicker: "Toolbox", skillsTitle: "Skills", tools: "tools",
      xpKicker: "Career", xpTitle: "Experience", details: "Details", present: "Present", now: "Now",
      aboutKicker: "My story", aboutTitle: "About me", readStory: "Read the full story", journey: "Journey", education: "Education",
      location: "Location", languages: "Languages", gpa: "GPA",
      blogKicker: "Writing", blogTitle: "Technical blog", blogSub: "Short, practical notes on what I learn building real systems.", readPost: "Read post",
      contactTitle: "Let's build together", contactP: "Reach out about a role, a project or an idea — I usually reply within a day or two.",
      formTitle: "Contact", fName: "Your name", fEmail: "Email", fSubject: "Subject", fMsg: "Your message", send: "Send message",
      sending: "Sending…", sent: "Thank you! Your message arrived.", sendErr: "Couldn't send — opening your email app.",
      objective: "Objective", whatIDid: "What I did", coreFeatures: "Highlights", stack: "Stack", more: "In depth",
      achievements: "Contributions", focus: "Focus", rights: "All rights reserved.",
      roleSub: "Software Engineer · AI & Data",
      introKicker: "Zeliha Kaner — Portfolio", welcome: "Welcome", introHint: "Scroll to explore", introSkip: "Skip →",
      introWords: ["Data.", "Intelligence.", "Design."], introFinal: "All meeting in *one *system.",
      marquee: ["Software engineering", "Artificial intelligence", "Data analytics", "Computer vision", "Industrial automation", "RAG & LLM", "Process mining", "IoT"],
      zkCap: "zeliha · kaner"
    }
  };
  function t(k) { return (T[lang] && T[lang][k]) || T.en[k] || k; }

  /* ---------------- Icons ---------------- */
  var I = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v12M6 11l6 6 6-6M5 20h14"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .3"/></svg>',
    cube: '<svg viewBox="0 0 48 48"><path d="M24 4l17 10v20L24 44 7 34V14z"/><path d="M7 14l17 10 17-10M24 24v20"/><path d="M15.5 9l17 10M32.5 9l-17 10" opacity=".45"/></svg>',
    atom: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="3"/><ellipse cx="24" cy="24" rx="19" ry="7.5"/><ellipse cx="24" cy="24" rx="19" ry="7.5" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="19" ry="7.5" transform="rotate(-60 24 24)"/></svg>',
    eye: '<svg viewBox="0 0 48 48"><path d="M4 24s7-12 20-12 20 12 20 12-7 12-20 12S4 24 4 24z"/><circle cx="24" cy="24" r="6"/><path d="M6 6h7M6 6v7M42 6h-7M42 6v7M6 42h7M6 42v-7M42 42h-7M42 42v-7"/></svg>',
    nodes: '<svg viewBox="0 0 48 48"><circle cx="10" cy="12" r="4"/><circle cx="38" cy="12" r="4"/><circle cx="24" cy="26" r="5"/><circle cx="10" cy="40" r="4"/><circle cx="38" cy="40" r="4"/><path d="M13 14l7 9M35 14l-7 9M20 29l-7 8M28 29l7 8M14 12h20"/></svg>'
  };

  /* ---------------- Project art (SVG) ---------------- */
  function projArt(id) {
    if (id === "predictive-maintenance") {
      return '<svg viewBox="0 0 270 200" preserveAspectRatio="xMidYMid slice">' +
        '<rect class="soft" x="22" y="26" width="226" height="148" rx="10"/>' +
        '<path class="ink" d="M36 60h196M36 92h196M36 124h196M36 156h196" opacity=".25"/>' +
        '<path class="ink" stroke-dasharray="5 5" d="M36 78h196" opacity=".7"/>' +
        '<path class="ink draw" d="M36 140 L58 132 L74 136 L92 120 L108 126 L124 112 L138 118 L150 70 L162 122 L180 110 L196 116 L214 98 L232 104"/>' +
        '<circle class="hot-p" cx="150" cy="70" r="4"/><circle class="hot-p pulse" cx="150" cy="70" r="8" opacity=".35"/>' +
        '<rect class="inkf" x="36" y="36" width="54" height="7" rx="3.5" opacity=".8"/><rect class="soft" x="196" y="35" width="36" height="9" rx="4.5"/></svg>';
    }
    if (id === "cv-quality-control") {
      return '<svg viewBox="0 0 270 200" preserveAspectRatio="xMidYMid slice">' +
        '<rect class="soft" x="40" y="22" width="190" height="156" rx="8"/>' +
        '<g class="ink" opacity=".55"><path d="M60 50h40v24h30M60 96h70v40M150 40v60h56M170 130h40v30M80 150h50"/></g>' +
        '<g class="inkf" opacity=".85"><circle cx="100" cy="74" r="4"/><circle cx="130" cy="74" r="4"/><circle cx="130" cy="136" r="4"/><circle cx="206" cy="100" r="4"/><circle cx="170" cy="130" r="4"/></g>' +
        '<rect class="hot-s" style="stroke:rgb(var(--glow-pink));filter:drop-shadow(0 0 4px rgb(var(--glow-pink)))" x="118" y="62" width="26" height="26" rx="3"/><rect class="inkf" x="118" y="52" width="38" height="9" rx="2"/>' +
        '<rect class="ink" x="160" y="120" width="22" height="22" rx="3"/>' +
        '<rect class="scan" x="40" y="30" width="190" height="2" fill="rgb(var(--glow))" opacity=".85"/></svg>';
    }
    if (id === "smart-triage") {
      return '<svg viewBox="0 0 270 200" preserveAspectRatio="xMidYMid slice">' +
        '<rect class="soft" x="26" y="24" width="218" height="152" rx="12"/>' +
        '<path class="ink" d="M64 128a46 46 0 0 1 92 0" stroke-width="8" opacity=".25"/>' +
        '<path class="hot-s draw" d="M64 128a46 46 0 0 1 72-38" stroke-width="8" stroke-linecap="round"/>' +
        '<text x="110" y="124" text-anchor="middle" class="inkf" style="font:600 20px var(--font-body)">ESI 2</text>' +
        '<g class="inkf"><rect x="176" y="62" width="10" height="70" rx="3" opacity=".9"/><rect x="190" y="82" width="10" height="50" rx="3" opacity=".7"/><rect x="204" y="98" width="10" height="34" rx="3" opacity=".55"/><rect x="218" y="110" width="10" height="22" rx="3" opacity=".4"/></g>' +
        '<rect class="inkf" x="48" y="146" width="120" height="8" rx="4" opacity=".6"/><rect class="soft" x="176" y="144" width="52" height="12" rx="6"/></svg>';
    }
    if (id === "process-mining") {
      return '<svg viewBox="0 0 270 200" preserveAspectRatio="xMidYMid slice">' +
        '<g class="ink" opacity=".6"><path d="M50 100 C 80 60, 100 60, 120 70"/><path d="M50 100 C 80 140, 100 140, 120 130"/><path d="M140 70 C 160 80, 165 95, 175 100"/><path d="M140 130 C 160 120, 165 105, 175 100"/><path d="M195 100 H 225"/></g>' +
        '<path class="hot-s draw" d="M50 100 C 80 60, 100 60, 120 70 M140 70 C 160 80, 165 95, 175 100 H 225"/>' +
        '<g class="inkf"><circle cx="42" cy="100" r="9"/><rect x="118" y="60" width="24" height="20" rx="5"/><rect x="118" y="120" width="24" height="20" rx="5"/><circle cx="232" cy="100" r="9"/></g>' +
        '<circle class="hot-p" cx="185" cy="100" r="11"/><circle class="hot-p pulse" cx="185" cy="100" r="16" opacity=".3"/></svg>';
    }
    return '<svg viewBox="0 0 270 200"><rect class="soft" x="30" y="30" width="210" height="140" rx="12"/></svg>';
  }

  /* ---------------- ZK monogram ---------------- */
  var zkN = 0;
  function zkSVG(cls) {
    var id = "zkg" + (zkN++);
    return '<svg class="zk ' + cls + '" viewBox="0 0 220 140" aria-hidden="true"><defs><linearGradient id="' + id + '" gradientUnits="userSpaceOnUse" x1="10" y1="20" x2="200" y2="120"><stop offset="0" class="s1"/><stop offset=".55" class="s2"/><stop offset="1" class="s3"/></linearGradient></defs>' +
      '<g class="strokes" stroke="url(#' + id + ')"><path pathLength="1" d="M32 32 H98 L34 108 H102"/><path pathLength="1" d="M134 32 V108"/><path pathLength="1" d="M192 32 L136 74"/><path pathLength="1" d="M157 60 L196 108"/><path class="trace" pathLength="1" d="M32 32 H14 M102 108 H118"/></g>' +
      '<g class="nodes"><circle cx="12" cy="32" r="5.5"/><circle cx="120" cy="108" r="5.5"/><circle cx="134" cy="32" r="5.5"/><circle cx="192" cy="32" r="5.5"/><circle cx="196" cy="108" r="5.5"/></g></svg>';
  }

  /* ---------------- Render ---------------- */
  var ROT = [];
  function renderStatic() {
    root.lang = lang;
    $$("[data-t]").forEach(function (el) { el.textContent = t(el.getAttribute("data-t")); });
    $("#langBtn").textContent = lang === "tr" ? "EN" : "TR";
    $("#langBtn").setAttribute("aria-label", lang === "tr" ? "Switch to English" : "Türkçe'ye geç");
  }

  function renderHero() {
    var lines = (DATA.site.headline && DATA.site.headline[lang]) || ["Zeliha", "Kaner", ""];
    $("#heroTitle").innerHTML = lines.map(function (l, i) {
      return '<span class="ln' + (i === lines.length - 1 ? " dim" : "") + '"><span style="--i:' + i + '">' + esc(l) + "</span></span>";
    }).join("");
    ROT = (DATA.site.roles || []).map(L);
    $("#heroSub").innerHTML = '<span class="role">' + esc(DATA.personal_info.name) + ' — <span class="rotator" id="rotator"></span></span>' + esc(L(DATA.site.tagline));
    $("#heroCta").innerHTML =
      '<a class="btn shine" href="#work">' + esc(t("viewWork")) + I.arrow + "</a>" +
      '<a class="btn ghost" href="' + esc(DATA.cv_file) + '" download="Zeliha-Kaner-CV.pdf">' + I.down + esc(t("downloadCv")) + "</a>";
    startRotator();
  }

  var rotTimer;
  function startRotator() {
    clearTimeout(rotTimer);
    var el = $("#rotator"); if (!el || !ROT.length) return;
    if (REDUCE) { el.textContent = ROT[0]; return; }
    var i = 0, c = 0, del = false;
    (function tick() {
      var w = ROT[i];
      if (!del) { c++; el.textContent = w.slice(0, c); if (c === w.length) { del = true; rotTimer = setTimeout(tick, 2200); return; } }
      else { c--; el.textContent = w.slice(0, c); if (c === 0) { del = false; i = (i + 1) % ROT.length; } }
      rotTimer = setTimeout(tick, del ? 28 : 62);
    })();
  }

  function renderBento() {
    var triage = DATA.projects.filter(function (p) { return p.id === "smart-triage"; })[0] || DATA.projects[0];
    var g = DATA.gallery || [];
    var flow =
      '<svg class="flow" viewBox="0 0 300 120" aria-hidden="true">' +
      '<path d="M58 30 H92 M58 90 H92 M150 60 H184 M242 60 H262"/><path d="M121 42 V 48 M121 78 V 72"/>' +
      '<rect x="4" y="18" width="54" height="24" rx="4"/><text x="31" y="34" text-anchor="middle">MIMIC-IV</text>' +
      '<rect x="4" y="78" width="54" height="24" rx="4"/><text x="31" y="94" text-anchor="middle">Vitals</text>' +
      '<rect x="92" y="18" width="58" height="24" rx="4"/><text x="121" y="34" text-anchor="middle">Pandas</text>' +
      '<rect x="92" y="48" width="58" height="24" rx="4"/><text x="121" y="64" text-anchor="middle">ML Model</text>' +
      '<rect x="92" y="78" width="58" height="24" rx="4"/><text x="121" y="94" text-anchor="middle">Features</text>' +
      '<rect x="184" y="34" width="58" height="52" rx="4"/><text x="213" y="56" text-anchor="middle">Flask API</text><text x="213" y="70" text-anchor="middle">+ RAG</text>' +
      '<circle cx="268" cy="60" r="5"><animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/></circle>' +
      "</svg>";
    var items = lang === "tr"
      ? ["Yapay Zekâ & ML", "Bilgisayarlı Görü", "Endüstriyel IoT", "Veri Hatları"]
      : ["AI & Machine Learning", "Computer Vision", "Industrial IoT", "Data Pipelines"];
    var stats = DATA.stats || [];
    $("#bento").innerHTML =
      '<article class="glass b-work c-pink lift" data-reveal>' +
        '<div class="card-head"><span>' + esc(t("selected")) + '</span><span class="dots3"><i></i><i></i><i></i></span></div>' +
        '<div class="screen"><h3><span>01 / ' + esc(lang === "tr" ? "Akıllı Triyaj" : "Smart Triage") + '</span><small>···</small></h3>' + flow +
        '<div class="row-end"><button class="btn sm" type="button" data-open-project="' + esc(triage.id) + '">' + esc(t("viewCase")) + '</button><span class="dots3"><i></i><i></i><i></i></span></div></div>' +
      "</article>" +
      '<article class="glass b-core c-mint lift" data-reveal style="--d:.1s">' +
        '<div class="card-head"><span>' + esc(t("core")) + '</span><span class="dots3"><i></i><i></i><i></i></span></div>' +
        "<ul>" + items.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
        '<div class="mini-term" aria-hidden="true"><b>$</b> python train.py<br>epoch 12/12<br>loss 0.214<br>acc  <i>0.595</i><br><b>$</b> docker up<br>api :5000 ✓<br>mqtt ✓</div>' +
        '<div class="thumbs">' +
          '<button type="button" data-photo="profile" aria-label="Zeliha Kaner"><img src="' + esc(DATA.profile_image) + '" alt="Zeliha Kaner" loading="lazy"></button>' +
          (g[0] ? '<button type="button" data-photo="0" aria-label="' + esc(L(g[0].caption)) + '"><img src="' + esc(g[0].src) + '" alt="' + esc(L(g[0].caption)) + '" loading="lazy"></button>' : "") +
          (g[1] ? '<button type="button" data-photo="1" aria-label="' + esc(L(g[1].caption)) + '"><img src="' + esc(g[1].src) + '" alt="' + esc(L(g[1].caption)) + '" loading="lazy" style="object-position:center 30%"></button>' : "") +
        "</div>" +
      "</article>" +
      '<div class="b-side">' +
        '<article class="glass b-quote c-caramel lift" data-reveal style="--d:.2s"><div class="card-head"><span>' + esc(t("philosophy")) + '</span></div><p>' + esc(L(DATA.site.philosophy)) + "</p></article>" +
        '<article class="glass b-status c-brown beam lit" data-reveal style="--d:.28s"><div class="card-head"><span>' + esc(t("status")) + '</span><span class="badge-now">' + esc(t("now")) + "</span></div>" +
          '<div class="big">' + esc(t("statusVal")) + "</div>" +
          '<svg viewBox="0 0 200 46" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="wavefill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="var(--accent)" stop-opacity=".35"/><stop offset="1" stop-color="var(--accent)" stop-opacity="0"/></linearGradient></defs><path class="area" id="waveArea"/><path class="wave" id="wavePath"/></svg>' +
          '<div class="meta">' + stats.slice(0, 3).map(function (s) { return "<span><b>" + esc(s.value) + "</b> " + esc(L(s.label)) + "</span>"; }).join("") + "</div>" +
        "</article>" +
      "</div>";
  }

  function renderBand() {
    var cols = lang === "tr" ? [
      ["cube", "Yapay Zekâ & ML", "Tahmin ve sınıflandırma modelleri, RAG asistanları ve LLM entegrasyonu — Scikit-learn, PyTorch, LangChain."],
      ["eye", "Bilgisayarlı Görü", "OpenCV ve YOLOv8 ile üretim hattında gerçek zamanlı kusur tespiti ve kalite kontrol."],
      ["atom", "Endüstriyel IoT & Veri", "MQTT, InfluxDB ve Grafana ile sensörden canlı panele uzanan veri hatları."]
    ] : [
      ["cube", "AI & Machine Learning", "Prediction and classification models, RAG assistants and LLM integration — Scikit-learn, PyTorch, LangChain."],
      ["eye", "Computer Vision", "Real-time defect detection and quality control on production lines with OpenCV and YOLOv8."],
      ["atom", "Industrial IoT & Data", "Data pipelines from sensor to live dashboard with MQTT, InfluxDB and Grafana."]
    ];
    $("#band").innerHTML =
      '<div data-reveal><p class="kicker">' + esc(t("featured")) + '</p><h2 class="h2 glint" style="margin-top:6px">' + esc(t("whatIDo")) + "</h2><p>" + esc(t("whatIDoP")) + '</p>' +
      '<a class="btn sm shine" href="' + esc(DATA.cv_file) + '" download="Zeliha-Kaner-CV.pdf">' + I.down + esc(t("downloadCv")) + "</a></div>" +
      cols.map(function (c, i) {
        return '<div data-reveal style="--d:' + (0.1 + i * 0.1) + 's"><div class="exp-ico">' + I[c[0]] + "</div><h3>" + esc(c[1]) + "</h3><p>" + esc(c[2]) + "</p></div>";
      }).join("");
  }

  function renderProjects() {
    var cats = lang === "tr"
      ? { "predictive-maintenance": "IoT · Kestirimci bakım", "cv-quality-control": "Görü · Kalite kontrol", "smart-triage": "Sağlık · TÜBİTAK", "process-mining": "Süreç · Optimizasyon" }
      : { "predictive-maintenance": "IoT · Predictive", "cv-quality-control": "Vision · Quality", "smart-triage": "Health · TÜBİTAK", "process-mining": "Process · Optimization" };
    $("#rail").innerHTML = DATA.projects.map(function (p, i) {
      return '<article class="glass proj lift beam tilt ' + ["c-mint", "c-pink", "c-caramel", "c-brown"][i % 4] + '" data-reveal style="--d:' + (i * 0.08) + 's" data-open-project="' + esc(p.id) + '" tabindex="0" role="button" aria-label="' + esc(L(p.title)) + '">' +
        '<div class="art">' + projArt(p.id) + "</div>" +
        '<div class="body"><span class="meta">' + esc(cats[p.id] || "") + "</span><h3>" + esc(L(p.title)) + "</h3><p>" + esc(L(p.objective)) + "</p>" +
        '<div class="tags">' + (p.tags || []).slice(0, 3).map(function (x) { return '<span class="chip">' + esc(x) + "</span>"; }).join("") + "</div>" +
        '<span class="btn sm">' + esc(t("readMore")) + "</span></div></article>";
    }).join("");
    setupPager();
  }

  function renderSystems() {
    var max = Math.max.apply(null, DATA.skills.map(function (s) { return s.items.length; }));
    $("#skills").innerHTML = DATA.skills.map(function (s) {
      return '<div class="sk"><div class="sk-top"><b>' + esc(L(s.category)) + "</b><span>" + s.items.length + " " + esc(t("tools")) + '</span></div>' +
        '<div class="bar"><i style="--w:' + Math.round((s.items.length / max) * 100) + '%"></i></div>' +
        '<div class="chips">' + s.items.map(function (x) { return '<span class="chip">' + esc(x) + "</span>"; }).join("") + "</div></div>";
    }).join("");
    $("#xp").innerHTML = DATA.experience.map(function (e, i) {
      return '<article class="glass xp lift tilt' + (i === 0 ? " beam c-brown" : "") + '" data-open-xp="' + i + '" tabindex="0" role="button" aria-label="' + esc(L(e.role) + " — " + e.company) + '">' +
        '<div class="logo"><img src="' + esc(e.logo) + '" alt="" loading="lazy"></div>' +
        (e.current ? '<span class="badge-now">' + esc(t("now")) + "</span>" : "") +
        "<h3>" + esc(L(e.role)) + '</h3><span class="co">' + esc(e.company) + '</span><span class="when">' + esc(period(e)) + " · " + esc(L(e.location)) + "</span>" +
        (i === 0 ? '<p class="focus">' + esc(L(e.focus)) + "</p>" : "") +
        '<span class="btn sm ghost">' + esc(t("details")) + "</span></article>";
    }).join("");
  }
  function period(e) { return e.current ? String(e.period).replace(/[–-]\s*$/, "– " + t("present")) : e.period; }

  function renderAbout() {
    var story = L(DATA.about_story).split(/\n\s*\n/);
    var langs = (DATA.personal_info.languages || []).map(function (l) { return L(l.name) + " " + L(l.level).split(" ")[0]; }).join(" · ");
    $("#aboutGrid").innerHTML =
      '<aside class="glass portrait" data-reveal><div class="ph"><img src="' + esc(DATA.hero_image) + '" alt="Zeliha Kaner" loading="lazy"><div class="cap"><b>' + esc(DATA.personal_info.name) + "</b><span>" + esc(L(DATA.site.hero_role)) + "</span></div></div>" +
      '<div class="facts"><div><span>' + esc(t("location")) + "</span><b>" + esc(L(DATA.personal_info.location)) + "</b></div>" +
      "<div><span>" + esc(t("languages")) + "</span><b>" + esc(langs) + "</b></div>" +
      '<div><span>E-mail</span><b><a href="mailto:' + esc(DATA.contact.email) + '">' + esc(DATA.contact.email) + "</a></b></div></div></aside>" +
      '<div data-reveal style="--d:.12s"><div class="story"><p class="lead">' + esc(L(DATA.site.hero_paragraph)) + "</p>" + paras(story.slice(0, 2).join("\n\n")) +
      '<button class="link-more" type="button" id="openStory">' + esc(t("readStory")) + " " + I.arrow.replace("<svg", '<svg width="16" height="16"') + "</button></div>" +
      '<div class="stats">' + (DATA.stats || []).map(function (s) {
        var m = String(s.value).match(/^(\d+)(.*)$/);
        return '<div class="glass stat ' + ["c-mint", "c-pink", "c-caramel", "c-brown"][arguments[1] % 4] + '"><b data-count="' + (m ? m[1] : "") + '" data-suffix="' + esc(m ? m[2] : "") + '">' + esc(s.value) + "</b><span>" + esc(L(s.label)) + "</span></div>";
      }).join("") + "</div>" +
      '<p class="kicker">' + esc(t("journey")) + '</p><div class="timeline">' + (DATA.timeline || []).map(function (x) {
        return '<div class="tl"><b>' + esc(x.year) + "</b>" + esc(L(x.text)) + "</div>";
      }).join("") + "</div>" +
      '<div class="edu">' + (DATA.education || []).map(function (e) {
        return '<div class="glass"><b>' + esc(e.institution) + "</b><span>" + esc(L(e.degree)) + " · " + esc(e.years) + (e.gpa ? " · " + esc(t("gpa")) + " " + esc(e.gpa) : "") + "</span></div>";
      }).join("") + "</div></div>";
  }

  function renderBlog() {
    var fmt = function (d) { try { return new Date(d + "T12:00:00").toLocaleDateString(lang === "tr" ? "tr-TR" : "en-GB", { day: "numeric", month: "long", year: "numeric" }); } catch (e) { return d; } };
    $("#posts").innerHTML = (DATA.blog || []).map(function (p, i) {
      return '<article class="glass post lift beam tilt ' + (i % 2 ? "c-mint" : "c-pink") + '" data-reveal style="--d:' + (i * 0.1) + 's" data-open-post="' + esc(p.id) + '" tabindex="0" role="button">' +
        "<time>" + esc(fmt(p.date)) + "</time><h3>" + esc(L(p.title)) + "</h3><p>" + esc(L(p.excerpt)) + '</p><span class="arrow">' + esc(t("readPost")) + I.arrow + "</span></article>";
    }).join("");
  }

  function renderContact() {
    var c = DATA.contact;
    $("#contactGrid").innerHTML =
      '<div class="glass c-card beam" data-reveal><h2 class="glint">' + esc(t("contactTitle")) + "</h2><p>" + esc(t("contactP")) + "</p>" +
      '<div class="c-links"><a href="mailto:' + esc(c.email) + '">' + I.mail + esc(c.email) + '</a><a href="' + esc(c.linkedin) + '" target="_blank" rel="noopener">' + I.linkedin + 'LinkedIn</a><a href="' + esc(c.github) + '" target="_blank" rel="noopener">' + I.github + "GitHub</a></div>" +
      '<a class="btn sm ghost" href="' + esc(DATA.cv_file) + '" download="Zeliha-Kaner-CV.pdf">' + I.down + esc(t("downloadCv")) + "</a></div>" +
      '<div class="contact-orb" id="contactOrb" data-reveal aria-hidden="true"><span class="orbit"></span><span class="orbit o2"></span>' + zkSVG("zk-big") + '<span class="cap">' + esc(t("zkCap")) + "</span></div>" +
      '<form class="glass c-card form" id="contactForm" data-reveal style="--d:.12s" novalidate>' +
        '<h2 style="font-size:26px">' + esc(t("formTitle")) + "</h2>" +
        '<input type="hidden" name="form-name" value="contact"><p class="hp"><label>Bot <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>' +
        '<label for="f-name">' + esc(t("fName")) + '</label><input class="field" id="f-name" name="name" required autocomplete="name">' +
        '<label for="f-email">' + esc(t("fEmail")) + '</label><input class="field" id="f-email" name="email" type="email" required autocomplete="email">' +
        '<label for="f-subject" class="sr-only">' + esc(t("fSubject")) + '</label><input class="field" id="f-subject" name="subject" placeholder="' + esc(t("fSubject")) + '">' +
        '<label for="f-msg" class="sr-only">' + esc(t("fMsg")) + '</label><textarea class="field" id="f-msg" name="message" required placeholder="' + esc(t("fMsg")) + '"></textarea>' +
        '<button class="btn shine" type="submit">' + esc(t("send")) + I.arrow + "</button>" +
        '<p class="form-msg" id="formMsg" role="status"></p>' +
      "</form>";
    $("#footer").innerHTML =
      '<span class="sig">' + zkSVG("zk-sm") + "<span>© " + new Date().getFullYear() + " " + esc(DATA.personal_info.name) + " — " + esc(L(DATA.site.footer_note)) + "</span></span>" +
      '<nav><a href="#work">' + esc(t("navWork")) + '</a><a href="#about">' + esc(t("navAbout")) + '</a><a href="#contact">' + esc(t("navContact")) + "</a></nav>" +
      '<div class="socials"><a href="' + esc(c.linkedin) + '" target="_blank" rel="noopener" aria-label="LinkedIn">' + I.linkedin + '</a><a href="' + esc(c.github) + '" target="_blank" rel="noopener" aria-label="GitHub">' + I.github + '</a><a href="mailto:' + esc(c.email) + '" aria-label="E-mail">' + I.mail + "</a></div>";
    $("#contactForm").addEventListener("submit", onSubmit);
  }

  function renderIntro() {
    var mark = $("#introMark"); if (!mark) return;
    if (!mark.firstChild) mark.innerHTML = '<span class="orb"></span><span class="orb o2"></span>' + zkSVG("zk-intro");
    var dust = $("#introDust");
    if (dust && !dust.firstChild) {
      var cols = ["var(--pink)", "var(--accent)", "var(--brown)", "var(--pink-2)"], h = "";
      for (var d = 0; d < 34; d++) {
        h += '<span style="left:' + (Math.random() * 100).toFixed(1) + "%;--s:" + (2 + Math.random() * 4).toFixed(1) + "px;--c:" + cols[d % 4] +
          ";--d:" + (7 + Math.random() * 9).toFixed(1) + "s;--dl:-" + (Math.random() * 14).toFixed(1) + "s;--x:" + ((Math.random() - .5) * 160).toFixed(0) + 'px"></span>';
      }
      dust.innerHTML = h;
    }
    var w = t("welcome");
    $("#introTitle").innerHTML = w.split("").map(function (c, i) {
      return '<span class="ch"><span style="--i:' + i + '">' + (c === " " ? "&nbsp;" : esc(c)) + "</span></span>";
    }).join("");
    $("#introWords").innerHTML = t("introWords").map(function (x) { return "<span>" + esc(x) + "</span>"; }).join("");
    $("#introFinal").innerHTML = t("introFinal").split(" ").map(function (w) {
      return '<span class="w">' + (w[0] === "*" ? "<em>" + esc(w.slice(1)) + "</em>" : esc(w)) + "</span>";
    }).join(" ") + '<span class="ul"></span>';
    typeSub();
    if (introUpdate) introUpdate();
  }
  var subTimer;
  function typeSub() {
    var el = $("#introSub"); if (!el) return;
    clearTimeout(subTimer);
    var txt = t("roleSub"), i = 0;
    if (REDUCE) { el.textContent = txt; return; }
    el.textContent = "";
    (function step() { el.textContent = txt.slice(0, ++i); if (i < txt.length) subTimer = setTimeout(step, 38 + Math.random() * 40); })();
  }
  document.addEventListener("pointerover", function (e) {
    var c = e.target.closest && e.target.closest("#introTitle .ch"); if (!c) return;
    c.classList.add("hop"); setTimeout(function () { c.classList.remove("hop"); }, 380);
    var r = c.getBoundingClientRect(); streaks.burstAt(r.left + r.width / 2, r.top + r.height * .3, 6);
  });

  function renderMarquee() {
    var items = t("marquee"), grp = '<div class="grp">' + items.map(function (x) { return '<span class="it">' + esc(x) + '</span><span class="star">✦</span>'; }).join("") + "</div>";
    $("#marqueeTrack").innerHTML = grp + grp + grp;
  }

  function renderAll() {
    renderStatic(); renderIntro(); renderMarquee(); renderHero(); renderBento(); renderBand(); renderProjects(); renderSystems(); renderAbout(); renderBlog(); renderContact();
    observeReveal();
    bindFloaters();
    bindPointerFx();
  }

  /* ---------------- Contact form ---------------- */
  function onSubmit(ev) {
    ev.preventDefault();
    var f = ev.target, msg = $("#formMsg");
    if (!f.checkValidity()) { f.reportValidity(); return; }
    var fd = new FormData(f);
    var mailto = function () {
      location.href = "mailto:" + DATA.contact.email + "?subject=" + encodeURIComponent(fd.get("subject") || "Portfolio") +
        "&body=" + encodeURIComponent(fd.get("message") + "\n\n— " + fd.get("name") + " <" + fd.get("email") + ">");
    };
    if (location.protocol === "file:") { msg.textContent = t("sendErr"); mailto(); return; }
    msg.textContent = t("sending");
    fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(fd).toString() })
      .then(function (r) { if (!r.ok) throw 0; msg.textContent = t("sent"); f.reset(); burst(f.getBoundingClientRect()); })
      .catch(function () { msg.textContent = t("sendErr"); mailto(); });
  }

  /* ---------------- Modal ---------------- */
  var modal = $("#modal"), modalBody = $("#modalBody");
  function openModal(html, cls) {
    modal.className = "modal" + (cls ? " " + cls : "");
    modalBody.innerHTML = html;
    modalBody.scrollTop = 0;
    if (typeof modal.showModal === "function") { if (!modal.open) modal.showModal(); } else modal.setAttribute("open", "");
  }
  function closeModal() { if (modal.open) { if (modal.close) modal.close(); else modal.removeAttribute("open"); } }
  modal.addEventListener("close", function () { if (/^#\/(project|post)\//.test(location.hash)) history.replaceState(null, "", location.pathname + location.search); });
  $("#modalClose").addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });

  function openProject(id) {
    var p = DATA.projects.filter(function (x) { return x.id === id; })[0]; if (!p) return;
    openModal('<div class="art">' + projArt(p.id) + '</div><p class="kicker">' + esc(t("workKicker")) + '</p><h2 id="modalTitle">' + esc(L(p.title)) + "</h2>" +
      "<h4>" + esc(t("objective")) + "</h4><p>" + esc(L(p.objective)) + "</p>" +
      "<h4>" + esc(t("whatIDid")) + "</h4><p>" + esc(L(p.what_i_did)) + "</p>" +
      "<h4>" + esc(t("coreFeatures")) + "</h4><p>" + esc(L(p.core_features)) + "</p>" +
      (L(p.details) ? "<h4>" + esc(t("more")) + "</h4>" + paras(L(p.details)) : "") +
      "<h4>" + esc(t("stack")) + '</h4><div class="tags">' + (p.tags || []).map(function (x) { return '<span class="chip">' + esc(x) + "</span>"; }).join("") + "</div>" +
      (p.link ? '<p style="margin-top:18px"><a class="btn sm" href="' + esc(p.link) + '" target="_blank" rel="noopener">GitHub ' + I.arrow + "</a></p>" : ""));
    history.replaceState(null, "", "#/project/" + id);
  }
  function openPost(id) {
    var p = (DATA.blog || []).filter(function (x) { return x.id === id; })[0]; if (!p) return;
    openModal('<p class="kicker">' + esc(p.date) + '</p><h2 id="modalTitle">' + esc(L(p.title)) + "</h2>" + paras(L(p.body)));
    history.replaceState(null, "", "#/post/" + id);
  }
  function openXp(i) {
    var e = DATA.experience[i]; if (!e) return;
    openModal('<div style="display:flex;gap:14px;align-items:center;margin-bottom:6px"><div class="xp"><div class="logo" style="margin:0"><img src="' + esc(e.logo) + '" alt=""></div></div><p class="kicker">' + esc(e.company) + " · " + esc(period(e)) + "</p></div>" +
      '<h2 id="modalTitle">' + esc(L(e.role)) + "</h2><p>" + esc(L(e.location)) + "</p>" +
      "<h4>" + esc(t("focus")) + "</h4><p>" + esc(L(e.focus)) + "</p>" +
      "<h4>" + esc(t("achievements")) + "</h4><ul>" + (e.achievements || []).map(function (a) {
        var s = L(a), k = s.indexOf(":");
        return "<li>" + (k > 0 && k < 48 ? "<b>" + esc(s.slice(0, k)) + "</b>" + esc(s.slice(k)) : esc(s)) + "</li>";
      }).join("") + "</ul>");
  }
  function openPhoto(key) {
    var src, cap;
    if (key === "profile") { src = DATA.profile_image; cap = DATA.personal_info.name; }
    else { var g = DATA.gallery[+key]; if (!g) return; src = g.src; cap = L(g.caption); }
    openModal('<figure><img src="' + esc(src) + '" alt="' + esc(cap) + '"><figcaption>' + esc(cap) + "</figcaption></figure>", "photo");
  }

  document.addEventListener("click", function (e) {
    var el;
    if ((el = e.target.closest("[data-open-project]"))) { e.preventDefault(); openProject(el.getAttribute("data-open-project")); }
    else if ((el = e.target.closest("[data-open-post]"))) openPost(el.getAttribute("data-open-post"));
    else if ((el = e.target.closest("[data-open-xp]"))) openXp(+el.getAttribute("data-open-xp"));
    else if ((el = e.target.closest("[data-photo]"))) openPhoto(el.getAttribute("data-photo"));
    else if (e.target.closest("#openStory")) openModal('<p class="kicker">' + esc(t("aboutKicker")) + '</p><h2 id="modalTitle">' + esc(t("aboutTitle")) + "</h2>" + paras(L(DATA.about_story)));
    else if ((el = e.target.closest('.nav-links a'))) { $("#nav").classList.remove("open"); $("#menuBtn").setAttribute("aria-expanded", "false"); }
  });
  document.addEventListener("keydown", function (e) {
    if ((e.key === "Enter" || e.key === " ") && e.target.matches("[role=button][tabindex]")) { e.preventDefault(); e.target.click(); }
  });

  /* ---------------- Routing (old #/ links) ---------------- */
  function route() {
    var h = location.hash, m;
    if ((m = h.match(/^#\/project\/(.+)$/))) openProject(decodeURIComponent(m[1]));
    else if ((m = h.match(/^#\/post\/(.+)$/))) openPost(decodeURIComponent(m[1]));
    else if ((m = h.match(/^#\/(about|projects|blog|contact)$/))) {
      var map = { about: "about", projects: "work", blog: "blog", contact: "contact" };
      var el = document.getElementById(map[m[1]]); if (el) setTimeout(function () { el.scrollIntoView(); }, 50);
    }
  }
  window.addEventListener("hashchange", route);

  /* ---------------- Reveal + counters ---------------- */
  var io;
  function observeReveal() {
    if (io) io.disconnect();
    var els = $$("[data-reveal], .skills, .sec-head .glint, .stats");
    if (REDUCE || !("IntersectionObserver" in window)) { els.forEach(function (el) { el.classList.add("in"); }); return; }
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target; el.classList.add("in"); io.unobserve(el);
        if (el.classList.contains("stats")) countUp(el);
        if (el.matches(".sec-head, .c-card, .proj:first-child")) streaks.spawnNear(el.getBoundingClientRect());
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }
  function countUp(box) {
    $$("[data-count]", box).forEach(function (b) {
      var n = +b.getAttribute("data-count"), suf = b.getAttribute("data-suffix") || ""; if (!n) return;
      var t0 = performance.now(), d = 1400;
      (function f(now) { var k = Math.min(1, (now - t0) / d); k = 1 - Math.pow(1 - k, 3); b.textContent = Math.round(n * k) + suf; if (k < 1) requestAnimationFrame(f); })(t0);
    });
  }

  /* ---------------- Projects rail pager ---------------- */
  function setupPager() {
    var rail = $("#rail"), pager = $("#pager");
    var pages = function () { return Math.max(1, Math.round(rail.scrollWidth / rail.clientWidth)); };
    function draw() {
      var n = pages(), cur = Math.round(rail.scrollLeft / Math.max(1, rail.scrollWidth - rail.clientWidth) * (n - 1)) || 0;
      if (n <= 1) { pager.innerHTML = ""; return; }
      pager.innerHTML = Array.apply(null, Array(n)).map(function (_, i) { return '<button type="button" aria-label="' + (i + 1) + '" class="' + (i === cur ? "on" : "") + '" data-p="' + i + '"></button>'; }).join("");
    }
    rail.onscroll = function () { clearTimeout(rail._t); rail._t = setTimeout(draw, 80); };
    pager.onclick = function (e) { var b = e.target.closest("[data-p]"); if (b) rail.scrollTo({ left: +b.getAttribute("data-p") * rail.clientWidth, behavior: "smooth" }); };
    $("#railPrev").onclick = function () { rail.scrollBy({ left: -rail.clientWidth * .8, behavior: "smooth" }); };
    $("#railNext").onclick = function () { rail.scrollBy({ left: rail.clientWidth * .8, behavior: "smooth" }); };
    draw(); window.addEventListener("resize", draw);
  }

  /* ---------------- Status wave ---------------- */
  (function wave() {
    var tt = 0;
    function frame() {
      var p = $("#wavePath"), a = $("#waveArea");
      if (p) {
        var d = "M0 30";
        for (var x = 0; x <= 200; x += 5) {
          var y = 26 + Math.sin(x * .045 + tt) * 7 + Math.sin(x * .11 + tt * 1.7) * 3 + Math.sin(x * .02 - tt * .5) * 4;
          d += " L" + x + " " + y.toFixed(2);
        }
        p.setAttribute("d", d); a.setAttribute("d", d + " L200 46 L0 46 Z");
      }
      tt += .03;
      if (!REDUCE) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  })();

  /* ---------------- Floating cubes & dots ---------------- */
  var floaters = [];
  function bindFloaters() {
    $$(".cube, .dot").forEach(function (n) { n.remove(); });
    floaters = [];
    var spec = [
      ["#hero", [[58, 72, 30, 18], [88, 66, 22, 14], [74, 18, 18, 20], [46, 40, 0, 0], [94, 30, 0, 0], [8, 88, 26, 22]]],
      ["#work", [[4, 8, 26, 16], [96, 30, 20, 12], [60, 2, 0, 0]]],
      ["#systems", [[50, 4, 22, 18], [97, 70, 28, 14], [2, 60, 0, 0]]],
      ["#about", [[94, 10, 24, 20], [30, 96, 0, 0]]],
      ["#contact", [[6, 20, 22, 16], [92, 80, 26, 18], [50, 6, 0, 0]]]
    ];
    spec.forEach(function (s) {
      var host = $(s[0]); if (!host) return;
      s[1].forEach(function (c, i) {
        var el = document.createElement("div");
        if (c[2]) {
          el.className = "cube"; el.innerHTML = '<div class="c"><i></i><i></i><i></i><i></i><i></i><i></i></div>';
          el.style.setProperty("--s", c[2] + "px"); el.style.setProperty("--t", c[3] + "s");
        } else el.className = "dot";
        el.style.left = c[0] + "%"; el.style.top = c[1] + "%";
        el.setAttribute("aria-hidden", "true");
        el._depth = c[2] ? .08 + (i % 3) * .06 : .04;
        host.appendChild(el); floaters.push(el);
      });
    });
    onScroll();
  }

  /* ---------------- Scroll: nav state, dots, parallax ---------------- */
  var sections = ["hero", "work", "systems", "about", "blog", "contact"];
  $("#scrollDots").innerHTML = sections.map(function (s) { return '<a href="#' + s + '" data-s="' + s + '"></a>'; }).join("");
  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var vh = innerHeight, cur = "hero";
      var sp = $("#introSpace"), base = sp ? sp.offsetHeight : 0, max = document.documentElement.scrollHeight - vh - base;
      $("#progress").style.transform = "scaleX(" + Math.max(0, Math.min(1, (scrollY - base) / Math.max(1, max))).toFixed(4) + ")";
      sections.forEach(function (id) { var el = document.getElementById(id); if (el && el.getBoundingClientRect().top < vh * .45) cur = id; });
      $$("#scrollDots a").forEach(function (a) { a.classList.toggle("active", a.getAttribute("data-s") === cur); });
      $$(".nav-links a").forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + cur); });
      if (!REDUCE) floaters.forEach(function (f) {
        var r = f.parentNode.getBoundingClientRect();
        f.style.transform = "translate3d(0," + ((r.top + r.height / 2 - vh / 2) * -f._depth).toFixed(1) + "px,0)";
      });
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  /* ---------------- Code stream ---------------- */
  var CODE = [
    "# triage/pipeline.py",
    "from sklearn.ensemble import RandomForestClassifier",
    "df = load_mimic_ed(\"triage_vitals.parquet\")",
    "X, y = build_features(df), df[\"esi_level\"]",
    "model = RandomForestClassifier(n_estimators=400).fit(X, y)",
    "risk = model.predict_proba(X_new)[:, 0]",
    "",
    "# iot/bridge.py",
    "client.subscribe(\"factory/line-3/vibration\", qos=1)",
    "if anomaly_score(window) > THRESHOLD:",
    "    alert(machine_id, severity=\"high\")",
    "",
    "# vision/inspect.py",
    "boxes = yolo.predict(frame, conf=0.45)",
    "defects = [b for b in boxes if b.cls == \"missing_solder\"]",
    "return {\"defects\": len(defects), \"status\": \"OPTIMAL\"}",
    "",
    "# rag/assistant.py",
    "chain = RetrievalQA.from_chain_type(llm, retriever=store.as_retriever())",
    "answer = chain.invoke(\"Why was patient 1042 marked ESI 2?\")"
  ];
  function hl(s) {
    if (/^\s*#/.test(s)) return '<span class="tk-c">' + esc(s) + "</span>";
    var out = "", re = /("[^"]*"?)|(\b(?:from|import|if|for|in|return|def|class|and|or|not|with|as)\b)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][\w]*)(?=\()/g, last = 0, m;
    while ((m = re.exec(s))) {
      out += esc(s.slice(last, m.index));
      if (m[1]) out += '<span class="tk-s">' + esc(m[1]) + "</span>";
      else if (m[2]) out += '<span class="tk-k">' + m[2] + "</span>";
      else if (m[3]) out += '<span class="tk-n">' + m[3] + "</span>";
      else out += '<span class="tk-f">' + esc(m[4]) + "</span>";
      last = re.lastIndex;
    }
    return out + esc(s.slice(last));
  }
  (function codeStream() {
    var box = $("#codeRows"); if (!box) return;
    var li = 0, ci = 0, num = 12, MAX = 8, cur = null;
    function newRow() {
      cur = document.createElement("div"); cur.className = "row cur";
      cur.innerHTML = '<span class="n">' + (num++) + '</span><span class="t"></span>';
      $$(".row", box).forEach(function (r) { r.classList.remove("cur"); });
      box.appendChild(cur);
      while (box.children.length > MAX) box.removeChild(box.firstChild);
    }
    if (REDUCE) { CODE.slice(0, MAX).forEach(function (l) { newRow(); cur.querySelector(".t").innerHTML = hl(l); }); return; }
    for (var k = 0; k < 5; k++) { newRow(); cur.querySelector(".t").innerHTML = hl(CODE[li]); li++; }
    newRow();
    (function step() {
      var line = CODE[li % CODE.length];
      if (ci <= line.length) {
        cur.querySelector(".t").innerHTML = hl(line.slice(0, ci));
        ci += 1 + (Math.random() < .25 ? 1 : 0);
        setTimeout(step, 22 + Math.random() * 40);
      } else {
        li++; ci = 0; newRow();
        setTimeout(step, line ? 260 + Math.random() * 260 : 120);
      }
    })();
  })();

  /* =========================================================
     Neural mesh — living background network behind the page.
     Drifting neurons link up when close; signals hop node to
     node (chain reactions); links near the cursor light up.
     ========================================================= */
  /* Soft pastel sparkle palette: mint, blush, lavender, butter, peach, sky */
  var SPARK = {
    light: [[150, 190, 170], [215, 160, 175], [175, 165, 205], [210, 185, 135], [215, 170, 145], [150, 180, 205]],
    dark: [[190, 222, 205], [236, 196, 208], [205, 198, 232], [232, 214, 170], [236, 205, 182], [190, 210, 230]]
  };
  function sparkPal() { return SPARK[root.getAttribute("data-theme") === "dark" ? "dark" : "light"]; }
  function pick() { var P = sparkPal(); return P[Math.floor(Math.random() * P.length)]; }

  var mesh = (function () {
    var cv = document.createElement("canvas"); cv.id = "mesh"; cv.setAttribute("aria-hidden", "true");
    document.body.insertBefore(cv, $("#streaks"));
    var ctx = cv.getContext("2d"), W = 0, H = 0, DPR = 1, small = false, D = 150;
    var nodes = [], sig = [], col = {}, px = -1e4, py = -1e4, running = false, last = 0, acc = 0, nextSig = 0;
    function rgb(c) {
      c = (c || "").trim();
      if (c[0] === "#") { var n = parseInt(c.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
      var m = c.match(/\d+(\.\d+)?/g); return m ? m.slice(0, 3).map(Number) : [200, 200, 200];
    }
    function readColors() {
      var cs = getComputedStyle(root);
      ["muted", "faint", "brown"].forEach(function (k) { col[k] = rgb(cs.getPropertyValue("--" + k)); });
      col.g = rgb(cs.getPropertyValue("--glow")); col.p = rgb(cs.getPropertyValue("--glow-pink")); col.w = rgb(cs.getPropertyValue("--glow-2"));
      col.dark = root.getAttribute("data-theme") !== "light";
    }
    function rgba(c, a) { return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")"; }
    function size() {
      small = innerWidth < 820; DPR = 1;
      W = innerWidth; H = innerHeight; cv.width = W * DPR; cv.height = H * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      D = small ? 120 : 160;
      var N = Math.round(Math.min(small ? 38 : 80, W * H / (small ? 9000 : 15000)));
      while (nodes.length < N) nodes.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25, f: 0, ci: Math.floor(Math.random() * 6) });
      nodes.length = N;
    }
    function near(n) {
      var best = [], i, m, dx, dy, d;
      for (i = 0; i < nodes.length; i++) { m = nodes[i]; if (m === n) continue; dx = m.x - n.x; dy = m.y - n.y; d = dx * dx + dy * dy; if (d < D * D) best.push(m); }
      return best;
    }
    function fire(n, depth) {
      n.f = 1;
      if (depth > 5) return;
      var nb = near(n); if (!nb.length) return;
      var k = Math.min(nb.length, 1 + (Math.random() < .5 ? 1 : 0));
      for (var i = 0; i < k; i++) sig.push({ a: n, b: nb[Math.floor(Math.random() * nb.length)], t: 0, sp: 1.6 + Math.random(), d: depth, c: sparkPal()[n.ci] });
    }
    function poke(x, y, r) {
      r = r || 70;
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i], dx = n.x - x, dy = n.y - y;
        if (dx * dx + dy * dy < r * r && n.f < .3 && sig.length < 90) fire(n, 3);
      }
    }
    function step(dt) {
      var s = dt / 16.7;
      nodes.forEach(function (n) {
        n.x += n.vx * s; n.y += n.vy * s;
        var dx = n.x - px, dy = n.y - py, d2 = dx * dx + dy * dy;
        if (d2 < 140 * 140 && d2 > 1) { var d = Math.sqrt(d2), f = (140 - d) / 140 * .5 * s; n.x += dx / d * f; n.y += dy / d * f; }
        if (n.x < -20) n.x = W + 20; if (n.x > W + 20) n.x = -20; if (n.y < -20) n.y = H + 20; if (n.y > H + 20) n.y = -20;
        n.f = Math.max(0, n.f - dt / 700);
      });
      for (var i = sig.length - 1; i >= 0; i--) {
        var g = sig[i]; g.t += dt / 1000 * g.sp;
        if (g.t >= 1) { sig.splice(i, 1); if (Math.random() < .7 && sig.length < 90) fire(g.b, g.d + 1); else g.b.f = 1; }
      }
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      var i, j, a, b, dx, dy, d, al, hot;
      ctx.lineWidth = 1;
      for (i = 0; i < nodes.length; i++) {
        a = nodes[i];
        for (j = i + 1; j < nodes.length; j++) {
          b = nodes[j]; dx = a.x - b.x; dy = a.y - b.y; d = dx * dx + dy * dy;
          if (d > D * D) continue;
          d = Math.sqrt(d); al = (1 - d / D);
          var mx = (a.x + b.x) / 2 - px, my = (a.y + b.y) / 2 - py;
          hot = Math.max(0, 1 - Math.sqrt(mx * mx + my * my) / 190);
          ctx.strokeStyle = hot > .02 ? rgba(sparkPal()[i % 6], al * (.15 + hot * .8)) : rgba(col.muted, al * (col.dark ? .16 : .2));
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      // signals (neon)
      ctx.lineCap = "round";
      sig.forEach(function (g) {
        var x1 = g.a.x + (g.b.x - g.a.x) * g.t, y1 = g.a.y + (g.b.y - g.a.y) * g.t, t0 = Math.max(0, g.t - .3);
        var x0 = g.a.x + (g.b.x - g.a.x) * t0, y0 = g.a.y + (g.b.y - g.a.y) * t0;
        ctx.strokeStyle = rgba(g.c, .18); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
        ctx.strokeStyle = rgba(g.c, .7); ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
      });
      // neurons
      nodes.forEach(function (n) {
        var c = sparkPal()[n.ci];
        if (n.f > .02) {
          ctx.fillStyle = rgba(c, .16 * n.f); ctx.beginPath(); ctx.arc(n.x, n.y, 9 * n.f + 3, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = rgba(c, .35 + n.f * .65); ctx.beginPath(); ctx.arc(n.x, n.y, 2 + n.f * 2.4, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = rgba(c, n.f * .5); ctx.beginPath(); ctx.arc(n.x, n.y, 3 + (1 - n.f) * 14, 0, Math.PI * 2); ctx.stroke();
        } else {
          ctx.fillStyle = rgba(c, col.dark ? .45 : .55); ctx.beginPath(); ctx.arc(n.x, n.y, 1.7, 0, Math.PI * 2); ctx.fill();
        }
      });
    }
    function frame(now) {
      if (!running) return;
      var dt = Math.min(64, now - (last || now)); last = now; acc += dt;
      if (small && acc < 33) { requestAnimationFrame(frame); return; }
      if (now > nextSig) { if (sig.length < 60) fire(nodes[Math.floor(Math.random() * nodes.length)], 0); nextSig = now + 380 + Math.random() * 600; }
      step(acc); acc = 0; draw();
      requestAnimationFrame(frame);
    }
    function setRun() { var on = !document.hidden && !REDUCE; if (on && !running) { running = true; last = 0; requestAnimationFrame(frame); } if (!on) running = false; }
    readColors(); size();
    window.addEventListener("resize", function () { size(); if (REDUCE) draw(); });
    window.addEventListener("pointermove", function (e) { px = e.clientX; py = e.clientY; }, { passive: true });
    document.addEventListener("pointerleave", function () { px = py = -1e4; });
    document.addEventListener("visibilitychange", setRun);
    if (REDUCE) draw(); else setRun();
    return { poke: poke, readColors: function () { readColors(); if (REDUCE) draw(); } };
  })();

  /* =========================================================
     Neon light streaks ("parıltı") — braided, interactive.
     - comets often travel in braided pairs / trios
     - heads that meet throw sparks and a bright link
     - cursor bends nearby comets; click launches a braid
     - passing comets wake neurons in the mesh
     ========================================================= */
  var streaks = (function () {
    var cv = $("#streaks"), ctx = cv.getContext("2d"), W = 0, H = 0, DPR = 1;
    var comets = [], sparks = [], links = [], running = false, glow = [64, 240, 165], glow2 = [255, 244, 250], glowP = [255, 90, 150], dark = true;
    var px = -1e4, py = -1e4;
    function readColors() {
      var cs = getComputedStyle(root);
      glow = cs.getPropertyValue("--glow").split(",").map(Number);
      glow2 = cs.getPropertyValue("--glow-2").split(",").map(Number);
      glowP = cs.getPropertyValue("--glow-pink").split(",").map(Number);
      dark = root.getAttribute("data-theme") !== "light";
    }
    function size() { DPR = Math.min(devicePixelRatio || 1, 1.5); W = innerWidth; H = innerHeight; cv.width = W * DPR; cv.height = H * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0); }
    function rgba(c, a) { return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")"; }
    function bez(p, t) {
      var u = 1 - t;
      return [u * u * u * p[0][0] + 3 * u * u * t * p[1][0] + 3 * u * t * t * p[2][0] + t * t * t * p[3][0],
              u * u * u * p[0][1] + 3 * u * u * t * p[1][1] + 3 * u * t * t * p[2][1] + t * t * t * p[3][1]];
    }
    // position on the curve, braided around it and bent toward the cursor
    function pos(c, t) {
      var h = bez(c.p, t);
      if (c.amp) {
        var h2 = bez(c.p, Math.min(1, t + .01)), dx = h2[0] - h[0], dy = h2[1] - h[1], l = Math.hypot(dx, dy) || 1;
        var o = Math.sin(t * Math.PI * c.turns + c.ph) * c.amp * Math.sin(t * Math.PI);
        h = [h[0] - dy / l * o, h[1] + dx / l * o];
      }
      var mx = px - h[0], my = py - h[1], d = Math.hypot(mx, my);
      if (d < 260 && d > 1) { var f = (1 - d / 260) * 40; h = [h[0] + mx / d * f, h[1] + my / d * f]; }
      return h;
    }
    function spawn(a, b, dur, opt) {
      if (REDUCE) return;
      opt = opt || {};
      var r = function (n) { return (Math.random() - .5) * n; };
      a = a || (Math.random() < .5 ? [-60, H * (.15 + Math.random() * .75)] : [W * Math.random(), H + 60]);
      b = b || [W + 60, H * (Math.random() * .85)];
      var c1 = [a[0] + (b[0] - a[0]) * .3 + r(W * .5), a[1] + (b[1] - a[1]) * .3 + r(H * .6)];
      var c2 = [a[0] + (b[0] - a[0]) * .7 + r(W * .5), a[1] + (b[1] - a[1]) * .7 + r(H * .6)];
      var n = 1;
      var t0 = performance.now(), d = (dur || 2000) * 2.8 + Math.random() * 2500, amp = 18 + Math.random() * 24, turns = 1.5 + Math.random() * 1.5;
      for (var i = 0; i < n; i++) {
        comets.push({ p: [a, c1, c2, b], t0: t0 + i * 40, dur: d, amp: amp, turns: turns, ph: i * Math.PI * 2 / n, col: pick(), veil: 34 + Math.random() * 46, w: 1.4 + Math.random() * 1.2, fade: 1, h: null });
      }
      if (!running) { running = true; requestAnimationFrame(loop); }
    }
    function spawnNear(rect) {
      var y = rect.top + rect.height * (.2 + Math.random() * .6);
      spawn([-40, y + (Math.random() - .5) * 200], [W + 40, rect.top + Math.random() * rect.height], 2100);
    }
    function burstAt(x, y, n) {
      for (var i = 0; i < n; i++) {
        var a = Math.random() * Math.PI * 2, s = .6 + Math.random() * 3;
        sparks.push({ c: pick(), x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, t0: performance.now(), life: 600 + Math.random() * 900, r: .8 + Math.random() * 1.8 });
      }
      if (!running) { running = true; requestAnimationFrame(loop); }
    }
    function loop(now) {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "source-over";
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      for (var i = comets.length - 1; i >= 0; i--) {
        var c = comets[i], k = (now - c.t0) / c.dur;
        if (k < 0) continue;
        k = Math.min(1, k);
        var e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2, G = c.col;
        if (k >= 1) c.fade -= .02;
        var fa = k >= 1 ? Math.max(c.fade, 0) : Math.min(1, k * 6);
        // sample the visible part of the veil (long, no head)
        var span = .5, N = 46, pts = [], nrm = [];
        for (var q = 0; q <= N; q++) {
          var tt = e - span + span * q / N; if (tt < 0 || tt > 1) continue;
          var a1 = pos(c, tt), a2 = pos(c, Math.min(1, tt + .004)), dx = a2[0] - a1[0], dy = a2[1] - a1[1], l = Math.hypot(dx, dy) || 1;
          pts.push([a1[0], a1[1], q / N]); nrm.push([-dy / l, dx / l]);
        }
        if (pts.length > 3) {
          // tulle: a soft wide wash + many fine translucent threads
          var strands = 9, width = c.veil;
          for (var sI = -1; sI < strands; sI++) {
            ctx.beginPath();
            for (var j = 0; j < pts.length; j++) {
              var P = pts[j], Nn = nrm[j], tw = Math.sin(P[2] * Math.PI);           // taper at both ends
              var off = sI < 0 ? 0 : ((sI / (strands - 1)) - .5) * width * tw + Math.sin(P[2] * 9 + now / 900 + sI) * 4 * tw;
              var x = P[0] + Nn[0] * off, y = P[1] + Nn[1] * off;
              if (j === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            if (sI < 0) { ctx.strokeStyle = rgba(G, .07 * fa); ctx.lineWidth = width * .9; }
            else { ctx.strokeStyle = rgba(G, (.10 + (sI % 3 === 0 ? .08 : 0)) * fa); ctx.lineWidth = sI % 4 === 0 ? 1.4 : .8; }
            ctx.stroke();
          }
          if (Math.random() < .08) mesh.poke(pts[pts.length >> 1][0], pts[pts.length >> 1][1], 50);
        }
        if (k >= 1 && c.fade <= 0) comets.splice(i, 1);
      }
      // soft click dust (tiny, slow, fading)
      for (var si = sparks.length - 1; si >= 0; si--) {
        var p = sparks[si], al = 1 - (now - p.t0) / p.life;
        if (al <= 0) { sparks.splice(si, 1); continue; }
        p.x += p.vx * .5; p.y += p.vy * .5 - .15; p.vx *= .97; p.vy *= .97;
        ctx.fillStyle = rgba(p.c || glow, al * .35);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 2.2, 0, Math.PI * 2); ctx.fill();
      }
      if (comets.length || sparks.length) requestAnimationFrame(loop);
      else { running = false; ctx.clearRect(0, 0, W, H); }
    }
    size(); readColors();
    window.addEventListener("resize", size);
    window.addEventListener("pointermove", function (e) { px = e.clientX; py = e.clientY; }, { passive: true });
    document.addEventListener("pointerleave", function () { px = py = -1e4; });
    document.addEventListener("pointerdown", function (e) {
      if (REDUCE || e.target.closest("a, button, input, textarea, dialog, [role=button], #heroStage")) return;
      burstAt(e.clientX, e.clientY, 14); mesh.poke(e.clientX, e.clientY, 140);
      if (!inHero()) spawn([e.clientX, e.clientY], [Math.random() < .5 ? -60 : W + 60, H * Math.random()], 1800, { n: 2 });
    });
    function inHero() {
      var h = document.getElementById("hero"); if (!h) return false;
      var r = h.getBoundingClientRect(); return r.bottom > innerHeight * .45 && r.top < innerHeight * .5;
    }
    (function ambient() {
      if (!document.hidden && !REDUCE && root.classList.contains("hero-go") && !inHero()) spawn();
      setTimeout(ambient, 3800 + Math.random() * 3200);
    })();
    return { spawn: spawn, spawnNear: spawnNear, burstAt: burstAt, readColors: readColors };
  })();
  function burst(rect) { streaks.burstAt(rect.left + rect.width / 2, rect.top + rect.height / 2, 46); }

  /* =========================================================
     Neural network (hero) — 2D canvas, slow 3D rotation.
     Forward pass = green signals, backprop = pink signals,
     busy connections warm up to brown.
     ========================================================= */
  var neural = (function () {
    var host = $("#heroStage");
    if (!host) return { readColors: function () {}, kick: function () {} };
    var cv = document.createElement("canvas"); host.appendChild(cv);
    var ctx = cv.getContext("2d");
    var LAYERS = [6, 9, 12, 12, 9, 4], LABELS = ["x", "h¹", "h²", "h³", "h⁴", "ŷ"];
    var nodes = [], edges = [], pulses = [], col = {}, W = 0, H = 0, DPR = 1;
    var small = false, running = false, visible = true, last = 0, acc = 0;

    function rgb(c) {
      c = (c || "").trim();
      if (c[0] === "#") { var n = parseInt(c.length === 4 ? c[1] + c[1] + c[2] + c[2] + c[3] + c[3] : c.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
      var m = c.match(/\d+(\.\d+)?/g); return m ? m.slice(0, 3).map(Number) : [200, 200, 200];
    }
    function readColors() {
      var cs = getComputedStyle(root);
      ["text", "muted", "faint", "accent", "pink", "brown", "bg"].forEach(function (k) { col[k] = rgb(cs.getPropertyValue("--" + k)); });
    }
    function rgba(c, a) { return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")"; }

    // build the network
    var L = LAYERS.length;
    LAYERS.forEach(function (n, li) {
      for (var i = 0; i < n; i++) {
        nodes.push({ li: li, x: (li - (L - 1) / 2) * .42, y: (i - (n - 1) / 2) * .158, z: (Math.random() - .5) * .55, act: 0, out: [], inn: [] });
      }
    });
    nodes.forEach(function (a) {
      nodes.forEach(function (b) {
        if (b.li === a.li + 1 && Math.random() < .72) {
          var e = { a: a, b: b, w: Math.random() * 2 - 1, heat: 0 };
          edges.push(e); a.out.push(e); b.inn.push(e);
        }
      });
    });
    var inputs = nodes.filter(function (n) { return n.li === 0; }), outputs = nodes.filter(function (n) { return n.li === L - 1; });

    function fire(node, dir) {
      node.act = 1;
      var list = dir > 0 ? node.out : node.inn;
      if (!list.length) return;
      var k = 1 + Math.floor(Math.random() * (dir > 0 ? 3 : 2));
      for (var i = 0; i < k; i++) {
        var e = list[Math.floor(Math.random() * list.length)];
        pulses.push({ e: e, t: 0, dir: dir, sp: .9 + Math.random() * .6 });
      }
    }
    function forward() { fire(inputs[Math.floor(Math.random() * inputs.length)], 1); }
    function backward() { fire(outputs[Math.floor(Math.random() * outputs.length)], -1); }

    var ang = 0, tilt = .2, mx = 0, my = 0, tmx = 0, tmy = 0, S = 1, cx = 0, cy = 0;
    window.addEventListener("pointermove", function (e) { tmx = e.clientX / innerWidth - .5; tmy = e.clientY / innerHeight - .5; }, { passive: true });

    function project(n) {
      var ca = Math.cos(ang), sa = Math.sin(ang), ct = Math.cos(tilt), st = Math.sin(tilt);
      var x = n.x * ca + n.z * sa, z = -n.x * sa + n.z * ca;
      var y = n.y * ct - z * st; z = n.y * st + z * ct;
      var f = 2.8 / (2.8 + z);
      n.sx = cx + x * f * S; n.sy = cy + y * f * S; n.f = f; n.d = z;
    }

    function size() {
      small = innerWidth < 820;
      DPR = Math.min(devicePixelRatio || 1, small ? 1.25 : 1.6);
      var r = host.getBoundingClientRect(); W = r.width; H = r.height;
      cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      S = small ? Math.min(W * .4, H * .6) : Math.min(W * .44, H * .46); cx = W * .5; cy = H * .48;
    }

    // ---- mouse interaction: hover lights a neuron, click fires the network
    var hov = null, ripples = [], lx = -1e4, ly = -1e4;
    function nearest(x, y, max) {
      var best = null, bd = max * max;
      nodes.forEach(function (n) { var dx = n.sx - x, dy = n.sy - y, d = dx * dx + dy * dy; if (d < bd) { bd = d; best = n; } });
      return best;
    }
    host.addEventListener("pointermove", function (e) {
      var r = host.getBoundingClientRect(); lx = e.clientX - r.left; ly = e.clientY - r.top;
      var h = nearest(lx, ly, 34);
      if (h && h !== hov) { h.act = Math.max(h.act, .6); }
      hov = h; host.style.cursor = h ? "pointer" : "crosshair";
    });
    host.addEventListener("pointerleave", function () { hov = null; lx = ly = -1e4; });
    host.addEventListener("pointerdown", function (e) {
      var r = host.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      var n = nearest(x, y, 1e4); if (!n) return;
      ripples.push({ x: x, y: y, t0: performance.now(), c: Math.random() < .5 ? "pink" : "accent" });
      nodes.forEach(function (m) { var dx = m.sx - x, dy = m.sy - y; if (dx * dx + dy * dy < 110 * 110) m.act = 1; });
      for (var i = 0; i < 4; i++) fire(n, 1);
      for (var j = 0; j < 3; j++) fire(n, -1);
      n.act = 1; n.boom = 1;
      streaks.burstAt(e.clientX, e.clientY, 26);
      if (!running) draw();
    });

    var nextF = 0, nextB = 2500;
    function step(dt, now) {
      mx += (tmx - mx) * .04; my += (tmy - my) * .04;
      ang = Math.sin(now / 9000) * .55 + mx * .5 - .15;
      tilt = .22 + my * .25;
      if (now > nextF) { forward(); if (Math.random() < .4) forward(); nextF = now + 260 + Math.random() * 300; }
      if (now > nextB) { backward(); nextB = now + 1800 + Math.random() * 1600; }
      for (var i = pulses.length - 1; i >= 0; i--) {
        var p = pulses[i]; p.t += dt / 1000 * p.sp; p.e.heat = Math.min(1, p.e.heat + dt / 600);
        if (p.t >= 1) {
          pulses.splice(i, 1);
          var tgt = p.dir > 0 ? p.e.b : p.e.a; tgt.act = 1;
          var cont = p.dir > 0 ? tgt.li < L - 1 : tgt.li > 0;
          if (cont && Math.random() < (p.dir > 0 ? .7 : .55) && pulses.length < 140) fire(tgt, p.dir);
        }
      }
      nodes.forEach(function (n) { n.act = Math.max(0, n.act - dt / 900); if (n.boom) n.boom = Math.max(0, n.boom - dt / 900); });
      if (hov) hov.act = Math.max(hov.act, .45);
      edges.forEach(function (e) { e.heat = Math.max(0, e.heat - dt / 1400); });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      nodes.forEach(project);
      // edges
      ctx.lineWidth = 1;
      edges.forEach(function (e) {
        var a = .05 + Math.abs(e.w) * .1;
        ctx.strokeStyle = rgba(col.muted, a * (e.a.f + e.b.f) / 2);
        ctx.beginPath(); ctx.moveTo(e.a.sx, e.a.sy); ctx.lineTo(e.b.sx, e.b.sy); ctx.stroke();
        if (e.heat > .02) {
          ctx.strokeStyle = rgba(col.brown, e.heat * .55);
          ctx.lineWidth = 1 + e.heat; ctx.beginPath(); ctx.moveTo(e.a.sx, e.a.sy); ctx.lineTo(e.b.sx, e.b.sy); ctx.stroke(); ctx.lineWidth = 1;
        }
      });
      // hovered neuron: light up its connections
      if (hov) {
        hov.out.concat(hov.inn).forEach(function (e) {
          ctx.strokeStyle = rgba(e.a === hov ? col.accent : col.pink, .75); ctx.lineWidth = 1.6;
          ctx.beginPath(); ctx.moveTo(e.a.sx, e.a.sy); ctx.lineTo(e.b.sx, e.b.sy); ctx.stroke();
        });
        ctx.lineWidth = 1;
      }
      // click ripples
      var nowR = performance.now();
      for (var ri = ripples.length - 1; ri >= 0; ri--) {
        var rp = ripples[ri], k = (nowR - rp.t0) / 1100;
        if (k >= 1) { ripples.splice(ri, 1); continue; }
        for (var ring = 0; ring < 3; ring++) {
          var kk = k - ring * .14; if (kk <= 0) continue;
          ctx.strokeStyle = rgba(ring % 2 ? col.pink : col.accent, (1 - kk) * .7); ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(rp.x, rp.y, 8 + kk * 120, 0, Math.PI * 2); ctx.stroke();
        }
      }
      ctx.lineWidth = 1;
      // pulses
      pulses.forEach(function (p) {
        var A = p.dir > 0 ? p.e.a : p.e.b, B = p.dir > 0 ? p.e.b : p.e.a;
        var t1 = p.t, t0 = Math.max(0, p.t - .18), c = p.dir > 0 ? col.accent : col.pink;
        var x1 = A.sx + (B.sx - A.sx) * t1, y1 = A.sy + (B.sy - A.sy) * t1, x0 = A.sx + (B.sx - A.sx) * t0, y0 = A.sy + (B.sy - A.sy) * t0;
        var g = ctx.createLinearGradient(x0, y0, x1, y1); g.addColorStop(0, rgba(c, 0)); g.addColorStop(1, rgba(c, .95));
        ctx.strokeStyle = rgba(c, .16); ctx.lineWidth = 7; ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
        ctx.strokeStyle = g; ctx.lineWidth = 2.2;
        ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
      });
      // nodes, far first
      nodes.slice().sort(function (a, b) { return b.d - a.d; }).forEach(function (n) {
        var r = (n.li === 0 || n.li === L - 1 ? 5.5 : 4.5) * n.f * (n === hov ? 1.6 : 1) * (1 + (n.boom || 0) * .8);
        if (n.act > .01) {
          ctx.strokeStyle = rgba(n.li === L - 1 ? col.pink : col.accent, n.act * .45);
          ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(n.sx, n.sy, r + (1 - n.act) * 14, 0, Math.PI * 2); ctx.stroke();
        }
        ctx.fillStyle = rgba(col.bg, 1); ctx.beginPath(); ctx.arc(n.sx, n.sy, r, 0, Math.PI * 2); ctx.fill();
        if (n.act > .01) { ctx.fillStyle = rgba(n.li === L - 1 ? col.pink : col.accent, n.act); ctx.fill(); }
        ctx.strokeStyle = rgba(col.text, .55 + .35 * n.f - .3); ctx.lineWidth = 1.3; ctx.stroke();
      });
      // layer labels
      ctx.font = "11px " + getComputedStyle(root).getPropertyValue("--font-mono");
      ctx.textAlign = "center"; ctx.fillStyle = rgba(col.faint, .9);
      for (var li = 0; li < L; li++) {
        var col_ = nodes.filter(function (n) { return n.li === li; });
        var bx = col_.reduce(function (s, n) { return s + n.sx; }, 0) / col_.length;
        var by = Math.max.apply(null, col_.map(function (n) { return n.sy; }));
        ctx.fillText(LABELS[li], bx, by + 26);
      }
    }

    function frame(now) {
      if (!running) return;
      var dt = Math.min(64, now - (last || now)); last = now;
      acc += dt;
      if (small && acc < 32) { requestAnimationFrame(frame); return; }   // ~30fps on phones
      step(acc, now); acc = 0; draw();
      requestAnimationFrame(frame);
    }
    function setRun() {
      var on = visible && !document.hidden && !REDUCE;
      if (on && !running) { running = true; last = 0; requestAnimationFrame(frame); }
      if (!on) running = false;
    }

    readColors(); size();
    window.addEventListener("resize", function () { size(); if (!running) draw(); });
    document.addEventListener("visibilitychange", setRun);
    if ("IntersectionObserver" in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; setRun(); }).observe(host);
    if (REDUCE) { inputs.forEach(function (n) { n.act = .8; }); outputs[1].act = .8; draw(); }
    else setRun();

    return {
      readColors: function () { readColors(); if (!running) draw(); },
      kick: function () { for (var i = 0; i < 4; i++) forward(); }
    };
  })();

  /* ---------------- Theme switch with radial reveal ---------------- */
  function setTheme(next, x, y) {
    var apply = function () {
      root.setAttribute("data-theme", next);
      store.set("zk-theme2", next);
      $('meta[name="theme-color"]').setAttribute("content", next === "light" ? "#ffffff" : "#2f2019");
      streaks.readColors(); mesh.readColors();
      neural.readColors(); neural.kick();
    };
    var after = function () {
      streaks.burstAt(x, y, 18);
    };
    if (!document.startViewTransition || REDUCE) { apply(); after(); return; }
    var r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    var vt = document.startViewTransition(apply);
    vt.ready.then(function () {
      root.animate({ clipPath: ["circle(0px at " + x + "px " + y + "px)", "circle(" + r + "px at " + x + "px " + y + "px)"] },
        { duration: 900, easing: "cubic-bezier(.7,0,.2,1)", pseudoElement: "::view-transition-new(root)" });
    });
    vt.finished.then(after);
  }
  $("#themeBtn").addEventListener("click", function (e) {
    var r = e.currentTarget.getBoundingClientRect();
    setTheme(root.getAttribute("data-theme") === "light" ? "dark" : "light", r.left + r.width / 2, r.top + r.height / 2);
  });
  $("#langBtn").addEventListener("click", function () {
    lang = lang === "tr" ? "en" : "tr"; store.set("zk-lang", lang);
    renderAll();
    $$("[data-reveal], .skills, .stats, .glint").forEach(function (el) { if (el.getBoundingClientRect().top < innerHeight) el.classList.add("in"); });
  });
  $("#menuBtn").addEventListener("click", function () {
    var n = $("#nav"), o = n.classList.toggle("open");
    this.setAttribute("aria-expanded", o ? "true" : "false");
  });

  /* ---------------- Intro: scroll-driven welcome ---------------- */
  var introUpdate = null;
  (function intro() {
    var el = $("#intro"), space = $("#introSpace");
    var heroGo = function () {
      if (root.classList.contains("hero-go")) return;
      root.classList.add("hero-go");
      setTimeout(function () { neural.kick(); }, 500);
    };
    // Reduced motion or deep link into the page: no intro.
    var deep = /^#(?!hero$|top$|$)./.test(location.hash);
    if (!el || REDUCE || deep) {
      if (el) el.remove(); if (space) space.remove();
      heroGo(); return;
    }
    root.classList.add("intro-on");
    var clamp = function (v) { return v < 0 ? 0 : v > 1 ? 1 : v; };
    var seg = function (p, a, b) { return clamp((p - a) / (b - a)); };
    var ease = function (k) { return k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; };
    var curTop = $("#curTop"), curBot = $("#curBot"), line = $("#introLine"), stage = $("#introStage"), bar = $("#introBar"), hint = $("#introHint"), finalEl = $("#introFinal"), skip = $("#introSkip");
    var lastP = -1, raf = 0;

    introUpdate = function () {
      var H = space.offsetHeight, p = clamp(scrollY / H);
      lastP = p;
      // 1) letters of "Hoş geldiniz" drift apart and lift away
      var chs = $$("#introTitle .ch"), n = chs.length;
      chs.forEach(function (c, i) {
        var k = ease(seg(p, .03 + i * .012, .2 + i * .012));
        var spread = (i - (n - 1) / 2) * 26 * k;
        c.style.transform = "translate3d(" + spread.toFixed(1) + "px," + (-90 * k).toFixed(1) + "px,0) rotate(" + ((i % 2 ? 1 : -1) * 8 * k).toFixed(1) + "deg)";
        c.style.opacity = (1 - k).toFixed(3);
        c.style.filter = k > .01 ? "blur(" + (6 * k).toFixed(1) + "px)" : "";
      });
      // monogram grows a little, then fades with the stage
      var mk = $("#introMark .zk");
      if (mk) mk.style.transform = "scale(" + (1 + seg(p, 0, .5) * .35).toFixed(3) + ") translateY(" + (seg(p, 0, .5) * 30).toFixed(1) + "px)";
      // 2) three words: Veri. Zekâ. Tasarım.
      $$("#introWords span").forEach(function (w, i) {
        var a = .15 + i * .1, kin = ease(seg(p, a, a + .06)), kout = ease(seg(p, a + .09, a + .14));
        w.style.opacity = (kin * (1 - kout)).toFixed(3);
        w.style.transform = "translateY(" + ((1 - kin) * 40 - kout * 40).toFixed(1) + "px) scale(" + (.94 + kin * .06 + kout * .1).toFixed(3) + ")";
      });
      // word illustrations draw themselves
      $$("#introArt svg").forEach(function (sv, i) {
        var a = .15 + i * .1, kin = ease(seg(p, a - .02, a + .07)), kout = ease(seg(p, a + .09, a + .14));
        sv.style.setProperty("--k", kin.toFixed(3));
        sv.style.opacity = (kin * (1 - kout) * .9).toFixed(3);
        sv.style.transform = "scale(" + (.9 + kin * .1 + kout * .15).toFixed(3) + ") rotate(" + ((i - 1) * 4 * (1 - kin)).toFixed(2) + "deg)";
      });
      // ghost ZK in the background
      var gh = $("#introGhost");
      if (gh) gh.style.transform = "translate(-50%,-50%) scale(" + (.8 + p * .7).toFixed(3) + ") rotate(" + (-6 + p * 12).toFixed(2) + "deg)";
      if (gh) gh.style.opacity = (.5 * (1 - seg(p, .6, .8))).toFixed(3);
      // 3) final sentence
      var fin = ease(seg(p, .46, .54)), fout = ease(seg(p, .62, .7));
      finalEl.style.opacity = (fin * (1 - fout)).toFixed(3);
      finalEl.style.transform = "translateY(calc(-50% + " + ((1 - fin) * 30 - fout * 20).toFixed(1) + "px))";
      var ws = $$("#introFinal .w"), lit = seg(p, .47, .6) * ws.length;
      ws.forEach(function (w, i) { w.classList.toggle("on", i < lit); });
      var ul = $("#introFinal .ul"); if (ul) ul.style.setProperty("--u", ease(seg(p, .55, .63)).toFixed(3));
      // stage fades as words start
      stage.style.opacity = (1 - seg(p, .08, .16)).toFixed(3);
      hint.style.opacity = (1 - seg(p, 0, .05)).toFixed(3);
      // 4) light line + curtains open
      line.style.transform = "scaleX(" + ease(seg(p, .62, .74)).toFixed(3) + ")";
      line.style.opacity = (1 - seg(p, .84, .94)).toFixed(3);
      if (p > .7 && !introUpdate.shot) {
        introUpdate.shot = 1;
        streaks.burstAt(innerWidth / 2, innerHeight / 2, 40);
      }
      if (p < .6) introUpdate.shot = 0;
      var o = ease(seg(p, .72, .99));
      curTop.style.transform = "translateY(" + (-101 * o).toFixed(2) + "%)";
      curBot.style.transform = "translateY(" + (101 * o).toFixed(2) + "%)";
      bar.style.transform = "scaleX(" + p.toFixed(4) + ")";
      skip.style.opacity = (1 - seg(p, .8, .9)).toFixed(3);
      el.classList.toggle("done", p >= .995);
      root.classList.toggle("intro-on", p < .9);
      if (p > .8) heroGo();
    };
    window.addEventListener("scroll", function () { if (!raf) raf = requestAnimationFrame(function () { raf = 0; introUpdate(); }); }, { passive: true });
    window.addEventListener("resize", introUpdate);
    skip.addEventListener("click", function () { window.scrollTo({ top: space.offsetHeight, behavior: "smooth" }); });
  })();

  /* ---------------- Marquee (scroll-velocity aware) ---------------- */
  (function marquee() {
    var tr = $("#marqueeTrack"); if (!tr || REDUCE) return;
    var x = 0, v = 0, lastY = scrollY, dir = -1;
    (function f() {
      var dy = scrollY - lastY; lastY = scrollY;
      if (dy) dir = dy > 0 ? -1 : 1;
      v += (Math.min(18, Math.abs(dy)) * .25 - v) * .1;
      var g = tr.firstChild; var w = g ? g.offsetWidth : 1000;
      x += dir * (.5 + v);
      if (x <= -w) x += w; if (x > 0) x -= w;
      tr.style.transform = "translate3d(" + x.toFixed(1) + "px,0,0) skewX(" + (-dir * Math.min(v, 6) * .6).toFixed(2) + "deg)";
      requestAnimationFrame(f);
    })();
  })();

  /* ---------------- Magnetic buttons + card tilt ---------------- */
  var FINE = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  function bindPointerFx() {
    if (!FINE || REDUCE) return;
    $$(".btn, .pill, .nav-tools .icon-btn").forEach(function (b) {
      if (b._mag) return; b._mag = 1;
      b.addEventListener("pointermove", function (e) {
        var r = b.getBoundingClientRect();
        b.style.translate = ((e.clientX - r.left - r.width / 2) * .22).toFixed(1) + "px " + ((e.clientY - r.top - r.height / 2) * .3).toFixed(1) + "px";
      });
      b.addEventListener("pointerleave", function () { b.style.translate = ""; });
    });
    $$(".tilt").forEach(function (c) {
      if (c._tilt) return; c._tilt = 1;
      c.addEventListener("pointermove", function (e) {
        var r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        c.style.setProperty("--mx", (px * 100).toFixed(1) + "%"); c.style.setProperty("--my", (py * 100).toFixed(1) + "%");
        c.style.transform = "perspective(900px) rotateX(" + ((.5 - py) * 7).toFixed(2) + "deg) rotateY(" + ((px - .5) * 9).toFixed(2) + "deg) translateY(-4px)";
      });
      c.addEventListener("pointerleave", function () { c.style.transform = ""; });
    });
  }

  renderAll();
  route();
  if (introUpdate) introUpdate();
})();
