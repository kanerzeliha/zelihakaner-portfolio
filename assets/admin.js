/* =========================================================
   Yönetici paneli — /#/admin
   İçeriği (zk-data) form olarak düzenler.
   - "Kaydet ve önizle": yalnızca bu tarayıcıda taslak olarak saklar.
   - "Yayınla": güncel içerikle yeni index.html indirir.
   ========================================================= */
(function () {
  "use strict";
  var KEY = "zk-draft", OK = "zk-admin-ok";
  var LABELS = {
    site: "Genel", personal_info: "Kişisel bilgiler", contact: "İletişim", about_story: "Hikâye", education: "Eğitim",
    experience: "Deneyim", skills: "Yetkinlikler", projects: "Projeler", blog: "Blog", stats: "İstatistikler",
    timeline: "Yolculuk", gallery: "Galeri", certificates: "Sertifikalar", hero_image: "Hakkımda fotoğrafı",
    profile_image: "Profil fotoğrafı", cv_file: "CV dosyası"
  };
  var CSS =
    ".zka{position:fixed;inset:0;z-index:500;background:var(--bg);color:var(--text);overflow:auto;font:15px/1.5 var(--font-body)}" +
    ".zka *{box-sizing:border-box}.zka-top{position:sticky;top:0;z-index:2;display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:14px 20px;background:var(--bg);border-bottom:1px solid var(--line-strong)}" +
    ".zka-top h1{font:500 22px var(--font-display);margin-right:auto}" +
    ".zka button{font:500 11px var(--font-mono);letter-spacing:.08em;text-transform:uppercase;padding:10px 14px;border-radius:8px;border:1px solid var(--line-strong);background:transparent;color:var(--text);cursor:pointer}" +
    ".zka button:hover{border-color:var(--text)}.zka button.pri{background:var(--text);color:var(--bg);border-color:var(--text)}.zka button.acc{background:var(--accent);color:var(--accent-ink);border-color:var(--accent)}" +
    ".zka-body{display:grid;grid-template-columns:220px 1fr;gap:24px;max-width:1180px;margin:0 auto;padding:24px 20px 80px}" +
    ".zka-tabs{display:flex;flex-direction:column;gap:4px;position:sticky;top:84px;align-self:start}.zka-tabs button{text-align:left}.zka-tabs button.on{background:var(--text);color:var(--bg)}" +
    ".zka label{display:block;font:500 10.5px var(--font-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin:12px 0 4px}" +
    ".zka input,.zka textarea{width:100%;padding:9px 11px;border:1px solid var(--line-strong);border-radius:8px;background:var(--surface-solid);color:var(--text);font:14px/1.5 var(--font-body)}" +
    ".zka textarea{min-height:96px;resize:vertical}.zka input:focus,.zka textarea:focus{outline:none;border-color:var(--accent)}" +
    ".zka-pair{display:grid;grid-template-columns:1fr 1fr;gap:10px}.zka-pair span{font:10px var(--font-mono);color:var(--faint)}" +
    ".zka-box{border:1px solid var(--line-strong);border-radius:12px;padding:6px 16px 16px;margin:12px 0;background:var(--blk-1)}" +
    ".zka-item{border:1px solid var(--line);border-radius:10px;padding:4px 14px 14px;margin:10px 0;background:var(--bg)}.zka-item>.zka-row{display:flex;gap:6px;justify-content:flex-end;margin-top:10px}" +
    ".zka-item>.zka-row button,.zka-add{padding:6px 10px;font-size:10px}.zka-note{color:var(--muted);font-size:13px;margin:0 0 6px}" +
    ".zka-login{max-width:360px;margin:18vh auto;padding:0 20px;text-align:center}.zka-login h1{font:500 30px var(--font-display);margin-bottom:6px}.zka-login input{margin:16px 0 10px;text-align:center}.zka-err{color:var(--accent);min-height:1.4em;font-size:13px}" +
    "@media(max-width:760px){.zka-body{grid-template-columns:1fr}.zka-tabs{position:static;flex-direction:row;flex-wrap:wrap}.zka-pair{grid-template-columns:1fr}}";

  function el(tag, attrs, kids) {
    var n = document.createElement(tag), k;
    for (k in attrs || {}) { if (k === "text") n.textContent = attrs[k]; else if (k.slice(0, 2) === "on") n[k] = attrs[k]; else n.setAttribute(k, attrs[k]); }
    (kids || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }
  function sha(s) {
    if (!window.crypto || !crypto.subtle) return Promise.reject(new Error("no-crypto"));
    return crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)).then(function (b) {
      return Array.prototype.map.call(new Uint8Array(b), function (x) { return ("0" + x.toString(16)).slice(-2); }).join("");
    });
  }
  function isPair(v) { var k = Object.keys(v); return k.length > 0 && k.every(function (x) { return x === "tr" || x === "en"; }); }
  function blank(v) {
    if (Array.isArray(v)) return [];
    if (v && typeof v === "object") { var o = {}; Object.keys(v).forEach(function (k) { o[k] = blank(v[k]); }); return o; }
    return typeof v === "boolean" ? false : "";
  }
  function nice(k) { return LABELS[k] || String(k).replace(/_/g, " "); }

  function field(obj, key, long) {
    var v = obj[key] == null ? "" : String(obj[key]);
    var big = long || v.length > 70 || v.indexOf("\n") >= 0;
    var i = el(big ? "textarea" : "input", {});
    i.value = v;
    i.oninput = function () { obj[key] = i.value; };
    return i;
  }
  function render(obj, key, root) {
    var v = obj[key], wrap = el("div");
    if (Array.isArray(v)) {
      var box = el("div", { "class": root ? "" : "zka-box" });
      if (!root) box.appendChild(el("label", { text: nice(key) }));
      var list = el("div");
      var draw = function () {
        list.innerHTML = "";
        v.forEach(function (item, idx) {
          var it = el("div", { "class": "zka-item" });
          if (item && typeof item === "object" && !isPair(item)) Object.keys(item).forEach(function (k) { it.appendChild(render(item, k)); });
          else it.appendChild(render(v, idx));
          it.appendChild(el("div", { "class": "zka-row" }, [
            idx > 0 ? el("button", { type: "button", text: "↑ Yukarı", onclick: function () { v.splice(idx - 1, 0, v.splice(idx, 1)[0]); draw(); } }) : null,
            el("button", { type: "button", text: "Sil", onclick: function () { if (confirm("Bu öğe silinsin mi?")) { v.splice(idx, 1); draw(); } } })
          ]));
          list.appendChild(it);
        });
      };
      draw();
      box.appendChild(list);
      box.appendChild(el("button", { type: "button", "class": "zka-add", text: "+ Ekle", onclick: function () { v.push(v.length ? blank(v[v.length - 1]) : ""); draw(); } }));
      wrap.appendChild(box); return wrap;
    }
    if (v && typeof v === "object") {
      if (isPair(v)) {
        if (typeof key !== "number") wrap.appendChild(el("label", { text: nice(key) }));
        var long = String(v.tr || v.en || "").length > 70;
        if (Array.isArray(v.tr)) { wrap.appendChild(render(v, "tr")); wrap.appendChild(render(v, "en")); return wrap; }
        wrap.appendChild(el("div", { "class": "zka-pair" }, [
          el("div", {}, [el("span", { text: "TR" }), field(v, "tr", long)]),
          el("div", {}, [el("span", { text: "EN" }), field(v, "en", long)])
        ]));
        return wrap;
      }
      var b = el("div", { "class": root ? "" : "zka-box" });
      if (!root) b.appendChild(el("label", { text: nice(key) }));
      Object.keys(v).forEach(function (k) { b.appendChild(render(v, k)); });
      wrap.appendChild(b); return wrap;
    }
    if (typeof v === "boolean") {
      var c = el("input", { type: "checkbox" }); c.checked = v; c.style.width = "auto"; c.onchange = function () { obj[key] = c.checked; };
      wrap.appendChild(el("label", {}, [c, document.createTextNode(" " + nice(key))])); return wrap;
    }
    if (typeof key !== "number") wrap.appendChild(el("label", { text: nice(key) }));
    wrap.appendChild(field(obj, key));
    return wrap;
  }

  function open(DATA) {
    if (document.querySelector(".zka")) return;
    if (!document.getElementById("zka-css")) document.head.appendChild(el("style", { id: "zka-css", text: CSS }));
    var work = JSON.parse(JSON.stringify(DATA));
    work.admin = work.admin || {};
    var rootEl = el("div", { "class": "zka" });
    document.body.appendChild(rootEl);
    document.documentElement.style.overflow = "hidden";
    function close() { rootEl.remove(); document.documentElement.style.overflow = ""; history.replaceState(null, "", location.pathname); }

    function login() {
      var pw = el("input", { type: "password", placeholder: "Şifre", autocomplete: "current-password" }), err = el("p", { "class": "zka-err" });
      var go = function () {
        sha(pw.value).then(function (h) {
          if (h === work.admin.password_hash) { try { sessionStorage.setItem(OK, "1"); } catch (e) {} editor(); }
          else err.textContent = "Şifre yanlış.";
        }).catch(function () { err.textContent = "Bu tarayıcıda şifre doğrulanamıyor; siteyi https adresinden aç."; });
      };
      pw.onkeydown = function (e) { if (e.key === "Enter") go(); };
      rootEl.innerHTML = "";
      rootEl.appendChild(el("div", { "class": "zka-login" }, [
        el("h1", { text: "Yönetici paneli" }), el("p", { "class": "zka-note", text: "Devam etmek için şifreni gir." }),
        pw, el("button", { "class": "pri", type: "button", text: "Giriş", onclick: go }), el("button", { type: "button", text: "Vazgeç", onclick: close }), err
      ]));
      pw.focus();
    }

    function editor() {
      var keys = Object.keys(work).filter(function (k) { return k !== "admin"; });
      var simple = keys.filter(function (k) { return typeof work[k] !== "object" || work[k] === null; });
      var tabsList = keys.filter(function (k) { return simple.indexOf(k) < 0; });
      var cur = tabsList[0], pane = el("div"), tabs = el("div", { "class": "zka-tabs" });
      function show(k) {
        cur = k; pane.innerHTML = "";
        pane.appendChild(el("h2", { text: nice(k), style: "font:500 26px var(--font-display);margin-bottom:4px" }));
        if (k === "site") { pane.appendChild(el("p", { "class": "zka-note", text: "Görseller ve CV için assets/ klasöründeki dosya yolunu yaz (örn. assets/profile.webp)." })); simple.forEach(function (s) { pane.appendChild(render(work, s)); }); }
        pane.appendChild(render(work, k, true));
        Array.prototype.forEach.call(tabs.children, function (b) { b.className = b.getAttribute("data-k") === k ? "on" : ""; });
        rootEl.scrollTop = 0;
      }
      tabsList.forEach(function (k) { tabs.appendChild(el("button", { type: "button", "data-k": k, text: nice(k), onclick: function () { show(k); } })); });

      function saveDraft() { try { localStorage.setItem(KEY, JSON.stringify(work)); } catch (e) { alert("Taslak kaydedilemedi."); return false; } return true; }
      function publish() {
        saveDraft();
        fetch(location.pathname, { cache: "no-store" }).then(function (r) { if (!r.ok) throw 0; return r.text(); }).then(function (html) {
          var json = JSON.stringify(work, null, 1).replace(/<\//g, "<\\/");
          var re = /(<script id="zk-data" type="application\/json">)[\s\S]*?(<\/script>)/;
          if (!re.test(html)) throw 0;
          var out = html.replace(re, function (m, a, b) { return a + "\n" + json + "\n" + b; });
          var a = el("a", { href: URL.createObjectURL(new Blob([out], { type: "text/html" })), download: "index.html" });
          document.body.appendChild(a); a.click(); a.remove();
          alert("index.html indirildi. Canlıya almak için bu dosyayı GitHub deposundaki index.html ile değiştir.");
        }).catch(function () { alert("Dosya hazırlanamadı. Paneli canlı site adresinden açıp tekrar dene."); });
      }
      rootEl.innerHTML = "";
      rootEl.appendChild(el("div", { "class": "zka-top" }, [
        el("h1", { text: "Yönetici paneli" }),
        el("button", { "class": "pri", type: "button", text: "Kaydet ve önizle", onclick: function () { if (saveDraft()) { history.replaceState(null, "", location.pathname); location.reload(); } } }),
        el("button", { "class": "acc", type: "button", text: "Yayınla (index.html indir)", onclick: publish }),
        el("button", { type: "button", text: "Taslağı sil", onclick: function () { if (confirm("Bu tarayıcıdaki taslak silinsin ve yayındaki içeriğe dönülsün mü?")) { try { localStorage.removeItem(KEY); } catch (e) {} history.replaceState(null, "", location.pathname); location.reload(); } } }),
        el("button", { type: "button", text: "Şifre değiştir", onclick: function () {
          var p = prompt("Yeni şifre (en az 8 karakter):"); if (!p) return; if (p.length < 8) { alert("Şifre en az 8 karakter olmalı."); return; }
          sha(p).then(function (h) { work.admin.password_hash = h; alert("Şifre değişti. Kalıcı olması için Yayınla'ya bas."); });
        } }),
        el("button", { type: "button", text: "Çık", onclick: function () { try { sessionStorage.removeItem(OK); } catch (e) {} close(); } })
      ]));
      rootEl.appendChild(el("div", { "class": "zka-body" }, [tabs, pane]));
      show(cur);
    }

    var ok = false; try { ok = sessionStorage.getItem(OK) === "1"; } catch (e) {}
    if (ok) editor(); else login();
  }
  window.ZKAdmin = { open: open };
})();
