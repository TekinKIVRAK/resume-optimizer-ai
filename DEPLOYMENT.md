# Deployment Rehberi

Bu dosya Resume Optimizer projesini production ortamına nasıl deploy edeceğinizi adım adım anlatır.

## 🎯 Genel Bakış

**Backend:** Railway.app (Node.js API)
**Frontend:** Vercel veya Railway (React Widget)
**Tahmini Süre:** 15-20 dakika

---

## 📦 Backend Deployment (Railway)

### Adım 1: Railway Hesabı Oluştur

1. https://railway.app/ adresine git
2. "Start a New Project" tıkla
3. GitHub ile giriş yap

### Adım 2: GitHub Repository Oluştur

```bash
cd /c/Users/tknkv/Desktop/Start-up/resume-optimizer-ai
git init
git add .
git commit -m "Initial commit: Resume Optimizer AI"

# GitHub'da yeni repo oluştur (mindtrellis/resume-optimizer)
git remote add origin https://github.com/YOUR_USERNAME/resume-optimizer.git
git branch -M main
git push -u origin main
```

### Adım 3: Railway'de Deploy Et

1. Railway dashboard → "New Project"
2. "Deploy from GitHub repo" seç
3. Repository'yi seç: `resume-optimizer`
4. Root Directory: `backend` (önemli!)
5. "Deploy" tıkla

### Adım 4: Environment Variables Ayarla

Railway dashboard → Variables sekmesi:

```env
ANTHROPIC_API_KEY=sk-ant-xxxxx
PORT=3000
NODE_ENV=production
CORS_ORIGIN=https://mindtrellis.com,https://your-frontend.vercel.app
MAX_FILE_SIZE=10485760
```

**ANTHROPIC_API_KEY Almak İçin:**
1. https://console.anthropic.com/ git
2. API Keys → Create Key
3. Key'i kopyala ve Railway'e ekle

### Adım 5: Build Settings (Eğer gerekirse)

Settings → Build Command:
```bash
npm install
```

Settings → Start Command:
```bash
npm start
```

### Adım 6: Domain Ayarla (Opsiyonel)

1. Settings → Domains
2. Generate Domain → `resume-api-production.up.railway.app`
3. Veya custom domain ekle

### Adım 7: Test Et

```bash
curl https://your-app.railway.app/api/health
```

Beklenen yanıt:
```json
{
  "status": "healthy",
  "timestamp": "2025-01-01T00:00:00.000Z",
  "environment": "production"
}
```

---

## 🎨 Frontend Deployment (Vercel)

### Adım 1: Vercel Hesabı Oluştur

1. https://vercel.com/ git
2. GitHub ile giriş yap

### Adım 2: Build Settings Güncelle

`frontend/vite.config.js` dosyasını güncelle:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/', // Production için
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});
```

### Adım 3: Environment Variable

`frontend/.env.production` oluştur:

```env
VITE_API_URL=https://your-app.railway.app
```

### Adım 4: Vercel'de Deploy

**Yöntem 1: Vercel CLI**

```bash
npm i -g vercel
cd frontend
vercel
```

**Yöntem 2: Vercel Dashboard**

1. Vercel Dashboard → New Project
2. Import Git Repository
3. Root Directory: `frontend`
4. Framework Preset: Vite
5. Environment Variables ekle:
   - `VITE_API_URL` = `https://your-app.railway.app`
6. Deploy

### Adım 5: Build Ayarları

Vercel otomatik algılar ama manuel ayar gerekirse:

- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Adım 6: Domain

Vercel otomatik bir domain verir:
- `your-app.vercel.app`

Custom domain eklemek için:
1. Settings → Domains
2. Add Domain → `resume.mindtrellis.com`

---

## 🔄 Frontend Alternatif: Railway'de Deploy

Frontend'i de Railway'de deploy edebilirsin:

1. Railway → New Project → Deploy from GitHub
2. Root Directory: `frontend`
3. Build Command: `npm run build`
4. Start Command: `npx serve -s dist -p $PORT`

`package.json`'a ekle:
```json
{
  "scripts": {
    "start": "serve -s dist -p ${PORT:-3000}"
  },
  "dependencies": {
    "serve": "^14.2.0"
  }
}
```

---

## ✅ Post-Deployment Checklist

### Backend Test

```bash
# Health check
curl https://your-app.railway.app/api/health

# Resume analyze (file upload test)
curl -X POST https://your-app.railway.app/api/resume/analyze \
  -F "file=@/path/to/test-resume.pdf"
```

### Frontend Test

1. https://your-frontend.vercel.app aç
2. CV yükle
3. Analiz et
4. Sonuçları kontrol et

### WordPress Test

1. WordPress sayfasına script'i ekle
2. Sayfayı aç
3. Widget'ın yüklendiğini kontrol et
4. CV analizi yap

---

## 🔧 CORS Ayarları

Backend `.env` dosyasında `CORS_ORIGIN` değişkenine tüm frontend URL'lerini ekle:

```env
CORS_ORIGIN=https://mindtrellis.com,https://your-app.vercel.app,https://www.mindtrellis.com
```

Railway'de bu değişkeni güncelle ve restart et.

---

## 📊 Monitoring & Logs

### Railway Logs

```bash
railway logs
# veya
railway logs --tail
```

Dashboard → Deployments → View Logs

### Vercel Logs

Dashboard → Project → Deployments → Logs

---

## 🔄 Continuous Deployment

Her commit'te otomatik deploy:

1. **Railway:** GitHub repo'ya push yaptığında otomatik deploy olur
2. **Vercel:** GitHub repo'ya push yaptığında otomatik deploy olur

```bash
# Değişiklik yap
git add .
git commit -m "feat: Add new feature"
git push

# Railway ve Vercel otomatik deploy eder
```

---

## 💰 Maliyet Optimizasyonu

### Railway

**Free Tier:**
- $5 kredi/ay
- 500 saat/ay (1 service için ~20 gün)

**Hobby Plan:** $5/ay
- $5 kredi + usage-based pricing
- Küçük projeler için yeterli

### Vercel

**Free Tier:**
- 100 GB bandwidth/ay
- Unlimited requests
- Hobby projeler için yeterli

**Toplam:** $0-10/ay

---

## 🚨 Sorun Giderme

### Backend Çalışmıyor

1. Railway logs kontrol et
2. Environment variables doğru mu?
3. `ANTHROPIC_API_KEY` geçerli mi?

```bash
railway logs --tail
```

### CORS Hatası

Backend `CORS_ORIGIN` değişkenine frontend URL'i ekle:

```env
CORS_ORIGIN=https://your-frontend.vercel.app,https://mindtrellis.com
```

### Build Hatası

```bash
# Local'de test et
cd backend
npm install
npm start

cd ../frontend
npm install
npm run build
```

### File Upload Çalışmıyor

1. `MAX_FILE_SIZE` limiti kontrol et
2. Railway'de dosya yazma izinleri var mı kontrol et
3. `/uploads` klasörü var mı kontrol et

---

## 🔐 Güvenlik

### Production Checklist

- [x] `NODE_ENV=production`
- [x] API keys environment variables'da
- [x] CORS doğru ayarlandı
- [x] HTTPS kullanılıyor
- [x] File upload limitleri var
- [x] Error messages production-safe

### API Key Güvenliği

**ASLA:**
- API key'i commit etme
- Frontend'e API key koyma
- Public repo'da API key paylaşma

**HER ZAMAN:**
- Environment variables kullan
- `.env` dosyasını `.gitignore`'a ekle
- Key rotation yap (her 3-6 ayda)

---

## 🎯 Next Steps

Deployment tamamlandıktan sonra:

1. ✅ WordPress'e widget ekle
2. ✅ Google Analytics ekle (opsiyonel)
3. ✅ Error tracking ekle (Sentry, LogRocket)
4. ✅ Performance monitoring
5. ✅ User feedback sistemi

---

## 📞 Destek

Deployment sırasında sorun yaşarsan:

1. README.md oku
2. Railway/Vercel docs oku
3. Logs kontrol et
4. GitHub Issues aç

İyi kullanımlar! 🚀
