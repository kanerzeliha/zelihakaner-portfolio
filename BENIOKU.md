# v7 + v8 — Tek sayfa akış, fotoğrafların ve yeni anlatım 📸

**Tek sayfa oldu.** Menüdeki linkler artık ayrı sayfaya gitmiyor, aynı sayfada ilgili
bölüme yumuşakça kaydırıyor. Sen kaydırdıkça menüde hangi bölümde olduğun
otomatik işaretleniyor. Sıralama: Ana Sayfa → Anlatım → Ne yapıyorum →
Projeler şeridi → Hakkımda → Projeler → Blog → İletişim.
(Proje ve yazı detayları hâlâ kendi sayfasında açılıyor, "Geri" ile dönüyorsun.)

**En başta sen varsın:** adın, ünvanın, kısa özetin ve **fotoğrafın** —
etrafında dönen degrade halka ve "İş fırsatlarına açık" rozetiyle.

**Fotoğraflar metnin içinde (pacomepertant tarzı):** hero'nun hemen altında,
seni anlatan büyük puntolu cümlelerin **içine gömülü** küçük fotoğraflar var;
üzerlerine gelince büyüyüp düzeliyorlar. Yapay zekâ illüstrasyonun da
"Ben Kimim" bölümünün kapak görseli oldu.

**Kayan yazı şeridi:** "yazılım mühendisliği ✦ yapay zeka ✦ veri analitiği ✦
endüstriyel otomasyon" sürekli akıyor.

⚠️ Kep havaya attığın **gerçek mezuniyet fotoğrafın yüklenemedi** (dosya bana
ulaşmadı). Eklemek istersen tekrar gönder ya da admin → Genel → profil fotoğrafı
bölümünden kendin yükle (hero fotoğrafının yerine geçer).

---

# v6 — Apple tarzı hareket + kayan projeler 🎬

- 🎞️ **Projeler kendiliğinden kayıyor**: ana sayfada kesintisiz akan bir şerit.
  Üzerine gelince durur, parmakla/fareyle sürükleyebilirsin. Projeler sayfasındaki
  ızgara aynen duruyor.
- ⬇️ **CV artık gerçekten iniyor**: CV'ni PDF'e çevirip siteye gömdüm.
  Buton "CV Talep Et" değil **"Profesyonel CV'yi İndir (PDF)"**.
  Güncellemek istersen: admin → Genel → 📄 CV PDF yükle.
- 🛣️ **Hakkımda'daki yolculuk artık gerçek bir yol**: ortada şeritli asfalt,
  yıllar yuvarlak levhalarda, kartlar sağlı sollu diziliyor ve sen kaydırdıkça
  yerlerine kayıyorlar. Telefonda tek şeride dönüyor.
- ✨ **Apple tarzı akış**: her bölüm sen kaydırdıkça yumuşakça yükselerek beliriyor,
  hero yazıları sırayla giriyor, istatistikler **sayarak** artıyor (4+, 30+, 1000+),
  altta yavaşça inip çıkan kaydırma ipucu var.
- 🔷 **Yeni "Ne yapıyorum" bölümü**: logondaki üç ikonun (yazılım / yapay zeka /
  veri) altıgen kartlı hâli — marka bütünlüğü için.
- 🎯 **Butonlar**: degrade dolgu ve üzerine gelince kayan ışık parlaması.

Not: Hareketi kapatmış cihazlarda (erişilebilirlik ayarı) animasyonlar otomatik
devre dışı kalır, site yine tam çalışır.

---

# v5 — Gece / Gündüz Modu 🌙☀️

- Sağ üstte **tema anahtarı** (güneş/ay ikonu). Tıkla, site anında koyu temaya geçer.
- Ziyaretçinin telefonu/bilgisayarı koyu moddaysa site **otomatik koyu** açılır;
  elle seçim yaparsa tercihi hatırlanır (sayfa gezerken, dil değiştirirken korunur).
- Koyu tema senin mavi paletinle uyumlu: gece lacivert zemin, açık mavi vurgular,
  logo hafif parlatılıyor. Açık tema hiç bozulmadı.
- Ek cila: sayfalar arası yumuşak geçiş + sağ altta **yukarı çık** butonu.

⚠️ Önemli: Admin panelinde hangi temayı kullanırsan kullan, **yayınladığın dosyaya
tema gömülmez** — ziyaretçi kendi tercihine göre görür. (Özellikle test ettim.)

---

# v4 — Yeni Mavi Marka 🔵

- Site artık yeni logonun **mavi paletinde** (gece lacivertinden canlı maviye,
  cyan vurgular). Beyaz tema aynen duruyor.
- **App bar, chatbot ve footer'da sadece ZK amblemi**; **giriş (hero) ve admin
  kapısında logonun tamamı** (isim + ünvan + üç ikon) kullanıldı.
- Yükleme aynı: bu zip'i olduğu gibi Netlify → Deploys alanına sürükle.

---

# ZK Portfolyo v3 — Yenilikler 🚀

- ↗ **Kart okları**: proje ve makale kartlarının sağ üstünde ok butonu var;
  ok, başlık veya "devamı" linki tıklanınca **kendi ayrı sayfası** açılır.
- 📝 **Makale sayfaları**: her blog yazısının tam metni artık kendi sayfasında
  (#/post/...). Projelerin de detay sayfası var (#/project/...) — admin panelinde
  her projeye "Detay sayfası uzun açıklama" alanı ekledim, istediğin kadar yaz.
- 🏠 **Ana sayfa**: dönen ünvan yazısı (Software Engineer → AI & Data Specialist →
  Full Stack Developer), slogan ve istatistik bandı (4+ yıl, 30+ proje...).
- 👤 **Hakkımda**: "Ben Kimim" hikâyesi (6 paragraf, TR+EN — admin'den düzenlenir),
  Yolculuk zaman çizelgesi (2022→2026, gerçek CV geçmişin).
- 🎓 **Sertifikalar** bölümü: admin → Beceriler sekmesinden virgülle ekle;
  boşken sitede görünmez (uydurma sertifika koymadım, sen ekleyeceksin).
- ✉️ İletişim formuna **Konu** alanı + menüye **İletişim** sayfası eklendi.

## ⚡ Yükleme (en kolay yol)
Bu zip'i **olduğu gibi** Netlify'a sürükle: Netlify panel → siten → **Deploys**
sekmesi → alttaki sürükle-bırak alanına zip dosyasını bırak. Bitti.
(index.html zip'in kökünde olduğu için direkt çalışır.)

---

# ZK Portfolyo v2 — Kullanım Rehberi 🎯

Bu sürümdeki yenilikler:
- 🇹🇷/🇬🇧 **Çift dil**: sağ üstteki TR | EN anahtarıyla tüm site dil değiştirir
  (ziyaretçinin tarayıcı diline göre otomatik açılır).
- 🔒 **Chatbot özel bilgi kilidi**: telefon, adres, yaş, doğum tarihi, ilişki durumu,
  öğrenci no gibi kişisel sorulara cevap vermez; e-posta/LinkedIn'e yönlendirir.
- 💬 **Görüş & İletişim formu**: ana sayfanın ve Hakkımda sayfasının altında.
- 🎨 Daha renkli beyaz tema (senin mor paletinle), **app bar'da büyük logo**.

Her şey yine **tek `index.html` dosyası** — nereden açarsan aç çalışır.

---

## 🔄 Netlify'daki siteyi bu sürümle değiştirme

Şu an sitende eski (çok dosyalı) sürüm var. Geçiş:

1. Bu `index.html`'i boş bir klasöre koy (ör. `sitem`).
2. https://app.netlify.com → sitene gir → **Deploys** sekmesi →
   klasörü sayfadaki sürükle-bırak alanına bırak.
   (Eski dosyaların hepsi silinir, yenisi geçer — istediğimiz de bu.)

## 🔒 Yönetim paneli

Yeni adres: **`siteadresin/#/admin`** (eskisi admin.html'di, artık böyle)
- İlk şifre: **`zeliha2026`** → Ayarlar'dan değiştir!
- Metinler artık çift dilli: her alanda 🇬🇧 EN ve 🇹🇷 TR kutusu var.
- Yayınlama: **⬆️ Yayınla** → inen tek `index.html`'i Netlify'a tekrar sürükle.

## 💬 İletişim formu mesajları nereye düşüyor?

Form **Netlify Forms** ile çalışır (ücretsiz, ayda 100 mesaj):
- Netlify panel → siten → **Forms** sekmesi → mesajlar orada listelenir.
- **Form notifications** ayarından her mesajda e-posta bildirimi alabilirsin.
- İlk mesajın görünmesi için formun bir kez yeni sürümle deploy edilmiş olması gerekir.
- Bilgisayarda dosyaya çift tıklayıp test edersen form otomatik gönderemez,
  e-posta uygulamanı açar — bu normal; canlı sitede otomatik çalışır.

## 🌐 zelihakaner.com adresini bağlama

1. **Domaini satın al** (yıllık ~10-15$): Namecheap, Cloudflare Registrar,
   GoDaddy veya Türkiye'den isimtescil.net / natro.com gibi bir kayıt firmasından
   `zelihakaner.com`'u ara ve satın al.
2. **Netlify'a ekle**: Netlify panel → siten → **Domain management** →
   **Add custom domain** → `zelihakaner.com` yaz.
3. Netlify iki seçenek sunar; kolayı: **Netlify DNS** kullan →
   Netlify'ın verdiği 4 nameserver adresini (dns1.p0X.nsone.net gibi)
   domaini aldığın firmanın panelinde **Nameservers** bölümüne yapıştır.
4. 1-24 saat içinde yayılır; **HTTPS/SSL sertifikasını Netlify otomatik** kurar.
   `www.zelihakaner.com` da otomatik yönlenir.

## ❓ Kısa notlar

- **Şifremi unuttum:** `index.html`'i Not Defteri ile aç, `password_hash` değerini
  şununla değiştir (şifre yine `zeliha2026` olur):
  `3a5224a8d7e926aed5bb7161f09c475cd90833cf2157733b84330fe82559c382`
- **Güvenlik:** Paneldeki değişiklikler önce sadece senin tarayıcında durur;
  canlıya almak dosyayı Netlify'a yüklemekle olur. Şifreyi bilen biri bile
  canlı sitene dokunamaz — asıl kilit Netlify hesabın.
- Chatbot API'siz çalışır: içerik neyse onu bilir, kişisel soruları reddeder.
