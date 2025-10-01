# 🚀 Hızlı Başlangıç Rehberi

Resume Optimizer AI projesini 10 dakikada çalıştırın!

## 📋 Gereksinimler

- Node.js 18+ ([İndir](https://nodejs.org/))
- npm veya yarn
- Anthropic API Key ([Ücretsiz $5 kredi](https://console.anthropic.com/))
- Git

## ⚡ Hızlı Kurulum

### 1. Anthropic API Key Al (2 dakika)

```
1. https://console.anthropic.com/ adresine git
2. Hesap oluştur (GitHub ile giriş yapabilirsin)
3. API Keys → Create Key
4. Key'i kopyala (sk-ant-xxxxx formatında)
```

### 2. Backend Kurulumu (3 dakika)

```bash
# Backend klasörüne git
cd backend

# Dependencies yükle
npm install

# .env dosyası oluştur
cp .env.example .env

# .env dosyasını düzenle ve API key'ini ekle
# ANTHROPIC_API_KEY=sk-ant-xxxxx yazmalısın
```

**Windows için .env oluşturma:**
```bash
notepad .env
```

Aşağıdaki içeriği yapıştır:
```env
PORT=3000
NODE_ENV=development
ANTHROPIC_API_KEY=sk-ant-xxxxx  # Buraya kendi key'ini yaz
CORS_ORIGIN=http://localhost:5173
MAX_FILE_SIZE=10485760
```

Kaydet ve kapat.

### 3. Backend'i Çalıştır (1 dakika)

```bash
npm run dev
```

✅ Çıktı:
```
🚀 Resume Optimizer API running on port 3000
📍 Health check: http://localhost:3000/api/health
🔧 Environment: development
```

**Test et:**
```bash
# Yeni terminal aç
curl http://localhost:3000/api/health
```

### 4. Frontend Kurulumu (2 dakika)

```bash
# Yeni terminal aç
cd frontend

# Dependencies yükle
npm install
```

### 5. Frontend'i Çalıştır (1 dakika)

```bash
npm run dev
```

✅ Çıktı:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 6. Tarayıcıda Aç (1 dakika)

```
http://localhost:5173
```

🎉 **Tebrikler!** Resume Optimizer çalışıyor!

---

## 🧪 İlk Test

1. http://localhost:5173 aç
2. Test CV'si yükle (PDF veya DOCX)
3. "CV'yi Analiz Et" butonuna tıkla
4. 10-30 saniye bekle
5. Sonuçları gör!

**Test CV'si yoksa:** [Örnek CV indir](https://www.google.com/search?q=sample+resume+pdf)

---

## 🐛 Sorun Giderme

### Backend Başlamıyor

**Hata:** `ANTHROPIC_API_KEY is not configured`

**Çözüm:**
```bash
# .env dosyasını kontrol et
cat backend/.env

# API key var mı ve doğru mu?
# Yoksa .env.example'dan kopyala
cp backend/.env.example backend/.env
# Sonra düzenle
```

### Frontend Backend'e Bağlanamıyor

**Hata:** `Network Error` veya `CORS error`

**Çözüm:**
1. Backend çalışıyor mu kontrol et (http://localhost:3000/api/health)
2. Frontend'de proxy ayarları doğru mu? (`vite.config.js`)
3. Backend `.env` dosyasında `CORS_ORIGIN=http://localhost:5173` var mı?

### Port Zaten Kullanılıyor

**Hata:** `Port 3000 is already in use`

**Çözüm:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Veya farklı port kullan
# backend/.env dosyasında PORT=3001 yap
```

### NPM Install Hatası

**Çözüm:**
```bash
# npm cache temizle
npm cache clean --force

# Tekrar dene
rm -rf node_modules
npm install

# Veya yarn kullan
yarn install
```

---

## 📁 Proje Yapısı

```
resume-optimizer-ai/
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── server.js       # Ana server
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # AI & Parser
│   │   └── utils/          # Helpers
│   ├── .env                # Environment variables (sen oluştur)
│   └── package.json
│
├── frontend/               # React Widget
│   ├── src/
│   │   ├── App.jsx        # Ana component
│   │   ├── components/    # Upload & Results
│   │   └── styles/        # Tailwind CSS
│   └── package.json
│
├── README.md              # Ana dokümantasyon
├── DEPLOYMENT.md          # Deploy rehberi
├── WORDPRESS_EMBED.md     # WordPress entegrasyon
└── SETUP_GUIDE.md         # Bu dosya
```

---

## 🎯 Sonraki Adımlar

### Geliştirme

1. **Kodu düzenle:**
   - Backend: `backend/src/` klasöründeki dosyalar
   - Frontend: `frontend/src/` klasöründeki dosyalar

2. **Otomatik reload:**
   - Backend: `npm run dev` (node --watch)
   - Frontend: Vite otomatik reload yapar

### Test

```bash
# Backend test
curl -X POST http://localhost:3000/api/resume/analyze \
  -F "file=@/path/to/resume.pdf"

# Frontend test
# Tarayıcıda http://localhost:5173
```

### Production Deploy

1. **README.md oku** - Detaylı özellikler
2. **DEPLOYMENT.md oku** - Railway/Vercel deploy
3. **WORDPRESS_EMBED.md oku** - WordPress entegrasyon

---

## 💡 İpuçları

### 1. Development Workflow

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev

# Terminal 3: Git, test, vb.
```

### 2. Hot Reload

Her iki taraf da otomatik reload yapar:
- Backend: Node.js `--watch` flag
- Frontend: Vite HMR

Dosya değiştir → Otomatik yenile 🎉

### 3. Debugging

**Backend logs:**
```javascript
// server.js'de console.log kullan
console.log('Debug:', data);
```

**Frontend logs:**
```javascript
// Browser Console (F12)
console.log('Debug:', data);
```

### 4. API Test (Postman yerine)

```bash
# cURL kullan
curl -X POST http://localhost:3000/api/resume/analyze \
  -H "Content-Type: multipart/form-data" \
  -F "file=@resume.pdf"

# Veya Thunder Client (VS Code extension)
```

---

## 🔑 API Key Güvenliği

**ASLA:**
- ❌ API key'i git'e commit etme
- ❌ Frontend'e API key koyma
- ❌ Screenshot'ta API key gösterme

**HER ZAMAN:**
- ✅ `.env` dosyasında sakla
- ✅ `.gitignore`'da `.env` var
- ✅ Backend'de kullan (frontend'de DEĞİL)

---

## 📚 Ek Kaynaklar

- [Claude AI Docs](https://docs.anthropic.com/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [React Docs](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 🤝 Yardım

Takıldığın yer mi var?

1. **README.md oku** - Detaylı dokümantasyon
2. **Console/Logs kontrol et** - Hata mesajları
3. **Google/StackOverflow** - Hata mesajını ara
4. **GitHub Issues** - Yeni issue aç

---

## ✅ Kurulum Checklist

Kurulum tamamlandı mı kontrol et:

- [ ] Node.js 18+ kurulu
- [ ] Anthropic API key alındı
- [ ] Backend dependencies yüklendi (`npm install`)
- [ ] Backend `.env` dosyası oluşturuldu
- [ ] Backend çalışıyor (http://localhost:3000)
- [ ] Frontend dependencies yüklendi
- [ ] Frontend çalışıyor (http://localhost:5173)
- [ ] Test CV analizi yapıldı
- [ ] Sonuçlar görüntülendi

Hepsi ✅ ise **hazırsın!** 🎉

---

**Son Güncelleme:** 2025-01-01
**Versiyon:** 1.0.0
