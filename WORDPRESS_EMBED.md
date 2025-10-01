# WordPress Embed Rehberi

Bu dosya Resume Optimizer widget'ını WordPress sitenize nasıl ekleyeceğinizi anlatır.

## Yöntem 1: Script Tag (Önerilen) ⭐

### Adım 1: WordPress Admin Paneline Giriş

1. WordPress sitenizin admin paneline giriş yapın
2. Sayfalar → Yeni Ekle veya mevcut bir sayfayı düzenle

### Adım 2: HTML Bloğu Ekle

1. Blok ekleyici (+) butonuna tıklayın
2. "Özel HTML" bloğunu seçin
3. Aşağıdaki kodu yapıştırın:

```html
<!-- Resume Optimizer Widget -->
<div id="resume-optimizer-root"></div>
<script>
  (function() {
    // Create container if not exists
    if (!document.getElementById('resume-optimizer-root')) {
      var container = document.createElement('div');
      container.id = 'resume-optimizer-root';
      document.currentScript.parentNode.insertBefore(container, document.currentScript);
    }

    // Load widget script
    var script = document.createElement('script');
    script.src = 'https://your-frontend-url.vercel.app/widget.js';
    script.type = 'module';
    script.async = true;
    document.head.appendChild(script);

    // Load widget styles
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://your-frontend-url.vercel.app/widget.css';
    document.head.appendChild(link);
  })();
</script>
```

### Adım 3: URL'leri Güncelle

**Local Test için:**
```html
script.src = 'http://localhost:5173/widget.js';
link.href = 'http://localhost:5173/widget.css';
```

**Production için:**
```html
script.src = 'https://your-app.railway.app/widget.js';
link.href = 'https://your-app.railway.app/widget.css';
```

### Adım 4: Yayınla

Sayfayı kaydedin ve yayınlayın!

---

## Yöntem 2: iFrame

Daha basit ama daha az esnek bir yöntem:

```html
<iframe
  src="https://your-frontend-url.vercel.app"
  width="100%"
  height="800px"
  frameborder="0"
  style="border: none; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
</iframe>
```

**Avantajları:**
- Çok basit kurulum
- Stil çakışması yok

**Dezavantajları:**
- Sabit yükseklik gerekiyor
- Responsive tasarım sınırlı

---

## Yöntem 3: Shortcode (Plugin ile)

### functions.php'ye Ekle

WordPress temanızın `functions.php` dosyasına ekleyin:

```php
<?php
// Resume Optimizer Shortcode
function resume_optimizer_shortcode() {
    ob_start();
    ?>
    <div id="resume-optimizer-root"></div>
    <script>
      (function() {
        var script = document.createElement('script');
        script.src = 'https://your-app.railway.app/widget.js';
        script.type = 'module';
        script.async = true;
        document.head.appendChild(script);

        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://your-app.railway.app/widget.css';
        document.head.appendChild(link);
      })();
    </script>
    <?php
    return ob_get_clean();
}
add_shortcode('resume_optimizer', 'resume_optimizer_shortcode');
?>
```

### Kullanım

Herhangi bir sayfada veya yazıda:

```
[resume_optimizer]
```

---

## Özelleştirme

### Genişlik ve Yükseklik

```html
<div id="resume-optimizer-root" style="max-width: 800px; margin: 0 auto;"></div>
```

### Padding Ekle

```html
<div id="resume-optimizer-root" style="padding: 20px;"></div>
```

### Arka Plan Rengi

```html
<div id="resume-optimizer-root" style="background: #f9fafb; padding: 20px; border-radius: 8px;"></div>
```

---

## Sorun Giderme

### Widget Görünmüyor

1. **Console hatalarını kontrol edin:**
   - F12 tuşuna basın
   - Console sekmesine bakın
   - CORS hatası var mı?

2. **URL'leri kontrol edin:**
   - Script URL doğru mu?
   - Backend çalışıyor mu?

3. **Cache temizleyin:**
   - WordPress cache
   - Browser cache
   - CDN cache (varsa)

### CORS Hatası

Backend `.env` dosyasında:

```env
CORS_ORIGIN=https://mindtrellis.com,http://localhost:5173
```

### Stil Çakışması

WordPress temasıyla stil çakışması varsa, widget'ı iframe içinde kullanın.

---

## Test Checklist

- [ ] Widget sayfada görünüyor
- [ ] Dosya yükleme çalışıyor
- [ ] Analiz butonu çalışıyor
- [ ] Sonuçlar görüntüleniyor
- [ ] Mobile cihazlarda düzgün görünüyor
- [ ] Console'da hata yok

---

## Örnek Sayfalar

### Tam Sayfa Widget

```html
<div style="min-height: 100vh; padding: 40px 20px;">
  <div id="resume-optimizer-root"></div>
  <script src="https://your-app.railway.app/widget.js" type="module"></script>
</div>
```

### Sidebar Widget

```html
<div style="max-width: 400px;">
  <div id="resume-optimizer-root"></div>
  <script src="https://your-app.railway.app/widget.js" type="module"></script>
</div>
```

---

## Güvenlik

- ✅ HTTPS kullanın (production için)
- ✅ CORS ayarlarını doğru yapın
- ✅ File upload limitlerini ayarlayın
- ✅ API key'leri environment variable'da saklayın

---

## Destek

Sorun yaşıyorsanız:

1. Backend loglarını kontrol edin
2. Frontend console'ı kontrol edin
3. Network sekmesinde istekleri kontrol edin
4. README.md dosyasını okuyun

İyi kullanımlar! 🚀
