# 🎯 Resume Optimizer AI Tool

AI-powered resume analysis and optimization tool. Integrates with WordPress, analyzes user resumes, and provides improvement suggestions using Claude AI.

## 📋 Features

- ✅ Upload PDF/DOCX format resumes
- ✅ Detailed resume analysis with Claude AI
- ✅ ATS (Applicant Tracking System) compatibility check
- ✅ Scoring system (0-100)
- ✅ Concrete improvement suggestions
- ✅ WordPress embed support
- ✅ Responsive design

## 🏗️ Technology Stack

### Backend
- **Node.js** + **Express** - API server
- **Multer** - File upload
- **pdf-parse** - PDF parsing
- **mammoth** - DOCX parsing
- **@anthropic-ai/sdk** - Claude AI integration

### Frontend
- **React** - UI framework
- **Tailwind CSS** - Styling
- **Axios** - API requests
- **Vite** - Build tool

## 📁 Project Structure

```
resume-optimizer-ai/
├── backend/
│   ├── src/
│   │   ├── server.js          # Main server
│   │   ├── routes/
│   │   │   └── resume.js      # Resume endpoints
│   │   ├── services/
│   │   │   ├── parser.js      # Resume parsing
│   │   │   └── ai.js          # Claude AI integration
│   │   └── utils/
│   │       └── validator.js   # Validation
│   ├── uploads/               # Temporary files
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Main component
│   │   ├── components/
│   │   │   ├── Upload.jsx     # Upload component
│   │   │   └── Results.jsx    # Results display
│   │   └── styles/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🚀 Installation

### 1. Backend Setup

```bash
cd backend
npm install
```

### 2. Environment Variables

The `backend/.env` file is already configured with your API key:

```env
PORT=3000
ANTHROPIC_API_KEY=your-api-key-here
CORS_ORIGIN=http://localhost:5173,https://mindtrellis.com
MAX_FILE_SIZE=10485760
NODE_ENV=development
```

**To get a new Anthropic API Key:**
1. Go to https://console.anthropic.com/
2. Create an account or sign in
3. Create a new key from API Keys section
4. Copy and paste the key into `.env` file

### 3. Frontend Setup

```bash
cd frontend
npm install
```

### 4. Running the Application

**Backend (Terminal 1):**
```bash
cd backend
npm run dev
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```

Backend: http://localhost:3000
Frontend: http://localhost:5173

## 🔌 WordPress Integration

### Method 1: Script Tag (Recommended)

Add to your WordPress `functions.php` or custom HTML block:

```html
<!-- Production -->
<div id="resume-optimizer-root"></div>
<script src="https://your-app.railway.app/widget.js"></script>

<!-- Local testing -->
<div id="resume-optimizer-root"></div>
<script src="http://localhost:5173/widget.js"></script>
```

### Method 2: iFrame

```html
<iframe
  src="https://your-app.railway.app"
  width="100%"
  height="600px"
  frameborder="0">
</iframe>
```

## 📦 Deployment (Railway)

### 1. Railway Account

1. Go to https://railway.app/
2. Sign in with GitHub
3. "New Project" → "Deploy from GitHub repo"

### 2. Backend Deployment

```bash
cd backend
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

In Railway:
- Select your GitHub repo
- Add Environment Variables:
  - `ANTHROPIC_API_KEY`
  - `CORS_ORIGIN`
  - `NODE_ENV=production`

### 3. Frontend Build & Deploy

```bash
cd frontend
npm run build
```

Deploy build files to Railway or Vercel.

### 4. Custom Domain (Optional)

Railway → Settings → Domains → Add Custom Domain

## 🧪 Testing

### Backend API Test

```bash
# Health check
curl http://localhost:3000/api/health

# Resume analysis (example)
curl -X POST http://localhost:3000/api/resume/analyze \
  -F "file=@/path/to/your/resume.pdf"
```

### Frontend Test

1. Open http://localhost:5173
2. Upload a resume (PDF or DOCX)
3. Click "Analyze Resume" button
4. Check the results

## 🔒 Security

- ✅ File size limit (10MB)
- ✅ File type validation (PDF/DOCX only)
- ✅ CORS protection
- ✅ Temporary files auto-deleted
- ✅ API key in environment variables

## 📊 API Endpoints

### `POST /api/resume/analyze`

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` (PDF or DOCX)

**Response:**
```json
{
  "success": true,
  "data": {
    "score": 85,
    "strengths": ["..."],
    "weaknesses": ["..."],
    "suggestions": ["..."],
    "atsCompatibility": "High"
  }
}
```

### `GET /api/health`

Health check endpoint.

## 💡 Usage

1. Upload your resume (PDF or DOCX format)
2. Click "Analyze Resume" button
3. Claude AI performs the analysis
4. View your results:
   - Overall score (0-100)
   - Strengths
   - Areas for improvement
   - Concrete suggestions
   - ATS compatibility status

## 🐛 Troubleshooting

### "API key not found" error
- Ensure `.env` file is in `backend/` directory
- Verify `ANTHROPIC_API_KEY` variable is correct

### CORS error
- Add your frontend URL to `CORS_ORIGIN` variable
- Separate multiple origins with commas

### File upload error
- Ensure file size is under 10MB
- Only PDF and DOCX formats are supported

## 💰 Cost Estimate

- **Railway**: $5-10/month
- **Claude API**: ~$1-5/month (starting usage)
- **Total**: ~$7-15/month

**Free Testing:**
- Railway 500 hours/month free tier
- Anthropic $5 free credit (new accounts)

## 📚 Documentation

- [Claude AI API Docs](https://docs.anthropic.com/)
- [Railway Docs](https://docs.railway.app/)
- [Express.js](https://expressjs.com/)
- [React](https://react.dev/)

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

## 📄 License

MIT

## 📧 Contact

For questions: https://mindtrellis.com

---

**Created by:** AI-powered by Claude
**Version:** 1.0.0
**Last Updated:** 2025
