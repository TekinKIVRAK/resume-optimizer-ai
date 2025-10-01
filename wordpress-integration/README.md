# Resume Optimizer AI - WordPress Widget

AI-powered resume analyzer widget for WordPress. Uses Claude AI to provide detailed feedback on resumes.

## 📦 Installation

### Option 1: Manual Installation (Recommended)

1. **Download/Copy Files:**
   - `resume-optimizer-widget.php`
   - `assets/widget.js`
   - `assets/widget.css`

2. **Upload to WordPress:**
   ```
   wp-content/plugins/resume-optimizer-widget/
   ├── resume-optimizer-widget.php
   └── assets/
       ├── widget.js
       └── widget.css
   ```

3. **Activate Plugin:**
   - Go to **WordPress Admin** → **Plugins**
   - Find "Resume Optimizer AI Widget"
   - Click **Activate**

### Option 2: FTP Upload

1. Compress the `resume-optimizer-widget` folder as ZIP
2. Upload via **Plugins** → **Add New** → **Upload Plugin**
3. Click **Install Now** → **Activate**

---

## 🎯 Usage

### Basic Shortcode

Add this shortcode to any page or post:

```
[resume_optimizer]
```

### With Custom Title & Subtitle

```
[resume_optimizer title="Analyze Your Resume" subtitle="Get instant AI feedback"]
```

### Example Page Setup

1. Create a new page: **AI Tools** → **Resume Optimizer**
2. Set permalink: `/ai-tools/resume-optimizer/`
3. Add shortcode:
   ```
   [resume_optimizer title="Resume Optimizer AI" subtitle="Upload your resume and get detailed AI-powered feedback in seconds"]
   ```
4. Publish!

---

## 🎨 Customization

### Custom CSS (via Blocksy Theme Customizer)

**Appearance** → **Customize** → **Additional CSS**

```css
/* Change primary color */
.btn-primary {
    background-color: #your-color !important;
}

/* Adjust container width */
.resume-optimizer-container {
    max-width: 1000px;
}

/* Custom header styling */
.resume-optimizer-header h2 {
    color: #your-brand-color;
    font-family: 'Your Font', sans-serif;
}
```

### Widget Positioning

**Center aligned (default):**
```
[resume_optimizer]
```

**Full width:**
```css
.resume-optimizer-container {
    max-width: 100%;
    padding: 0;
}
```

---

## 🔧 Configuration

### Backend API URL

Widget is pre-configured to use:
```
https://resume-optimizer-ai-production.up.railway.app
```

To change API URL (if self-hosting):
1. Edit `assets/widget.js`
2. Find `VITE_API_BASE_URL`
3. Replace with your backend URL
4. Re-upload `widget.js`

### CORS Settings

Ensure your backend allows requests from:
```
https://mindtrellis.com
```

**Railway Environment Variables:**
```
CORS_ORIGIN=https://mindtrellis.com
```

---

## 📱 Responsive Design

Widget is fully responsive:
- **Desktop:** Full-featured drag & drop
- **Tablet:** Touch-friendly interface
- **Mobile:** Optimized layout, file picker

---

## ⚠️ Troubleshooting

### Widget not showing
1. Clear WordPress cache (if using caching plugin)
2. Check if shortcode is correct: `[resume_optimizer]`
3. Verify plugin is activated

### Upload not working
1. Check browser console for errors (F12)
2. Verify backend API is running:
   ```
   https://resume-optimizer-ai-production.up.railway.app/api/health
   ```
3. Check CORS settings in Railway

### Styling issues
1. Check for theme CSS conflicts
2. Add `!important` to custom CSS rules
3. Clear browser cache

### File size limit
- Default: 10MB max
- Supported formats: PDF, DOCX, DOC

---

## 🔒 Security

- ✅ Files processed server-side only
- ✅ Automatic file cleanup after analysis
- ✅ CORS protection enabled
- ✅ Input validation (file type, size)
- ✅ Secure API communication (HTTPS)

---

## 🚀 Features

- ✅ Drag & drop file upload
- ✅ AI-powered analysis (Claude 3.5 Sonnet)
- ✅ Detailed feedback:
  - Overall score (0-100)
  - Strengths & weaknesses
  - Improvement suggestions
  - ATS compatibility check
  - Format & content ratings
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling

---

## 📊 Performance

- **Widget size:** 188 KB (JS) + 12 KB (CSS)
- **Analysis time:** 10-30 seconds
- **File upload limit:** 10 MB
- **Supported formats:** PDF, DOCX, DOC

---

## 🛠️ Technical Details

**Frontend:**
- React 18.3.1
- Vite 5.4.20
- Tailwind CSS 3.4.4
- Axios for API calls

**Backend:**
- Node.js + Express
- Claude AI API (Anthropic)
- PDF/DOCX parsing
- Deployed on Railway

---

## 📞 Support

**Issues or Questions?**
- GitHub: [TekinKIVRAK/resume-optimizer-ai](https://github.com/TekinKIVRAK/resume-optimizer-ai)
- Website: https://mindtrellis.com
- Email: [your-email]

---

## 📝 License

MIT License - Free to use and modify

---

## 🎉 Credits

Powered by:
- [Claude AI](https://anthropic.com) - AI analysis
- [Railway](https://railway.app) - Backend hosting
- Built by **TekinKIVRAK**

---

**Last Updated:** 2025-10-01