# Claude AI Assistant - Project Context

This document provides context for AI assistants working on the Resume Optimizer AI project.

## 📌 Project Overview

**Resume Optimizer AI** is a full-stack web application that analyzes resumes using Claude AI (Anthropic) and provides detailed feedback including:
- Overall score (0-100)
- Strengths and weaknesses
- Concrete improvement suggestions
- ATS (Applicant Tracking System) compatibility analysis
- Format and content quality ratings

**Target Users:** Job seekers, career coaches, recruitment agencies
**WordPress Integration:** Embeddable widget for WordPress sites

---

## 🏗️ Architecture

### Technology Stack

**Backend (Node.js + Express)**
- Runtime: Node.js 18+
- Framework: Express 4.19.2
- AI Integration: @anthropic-ai/sdk 0.27.3 (Claude 3.5 Sonnet)
- File Processing: multer (upload), pdf-parse (PDF), mammoth (DOCX)
- Security: cors, dotenv

**Frontend (React + Vite)**
- UI Framework: React 18.3.1
- Build Tool: Vite 5.3.1
- Styling: Tailwind CSS 3.4.4
- HTTP Client: Axios 1.7.2
- Hot Module Replacement (HMR) enabled

### Project Structure

```
resume-optimizer-ai/
├── backend/
│   ├── src/
│   │   ├── server.js           # Express server setup
│   │   ├── routes/
│   │   │   └── resume.js       # /api/resume/* endpoints
│   │   ├── services/
│   │   │   ├── parser.js       # PDF/DOCX text extraction
│   │   │   └── ai.js           # Claude AI integration
│   │   └── utils/
│   │       └── validator.js    # File validation logic
│   ├── uploads/                # Temporary file storage (auto-cleanup)
│   ├── .env                    # Environment variables (gitignored)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx             # Main app component
│   │   ├── main.jsx            # React entry point
│   │   ├── components/
│   │   │   ├── Upload.jsx      # File upload UI with drag-drop
│   │   │   └── Results.jsx     # Analysis results display
│   │   └── styles/
│   │       └── index.css       # Tailwind base + custom styles
│   ├── vite.config.js          # Vite config with proxy
│   └── package.json
└── claude.md                   # This file
```

---

## 🎯 Code Standards

### JavaScript/JSX
- **Module System:** ES6+ modules (`import`/`export`)
- **Async Operations:** Use `async/await` over callbacks
- **Error Handling:** Always use try-catch for async operations
- **Naming Conventions:**
  - Functions: camelCase (`analyzeResume`, `parseResume`)
  - Components: PascalCase (`Upload`, `Results`)
  - Constants: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`, `ALLOWED_MIME_TYPES`)
  - Files: kebab-case for utils, PascalCase for components

### React Best Practices
- **Hooks Only:** Use functional components with hooks (no class components)
- **State Management:** `useState` for local state, props for parent-child communication
- **Side Effects:** `useEffect` for API calls, cleanup in return function
- **Refs:** `useRef` for DOM references (file input)
- **Prop Validation:** Destructure props in function signature

### Backend Patterns
- **Route Organization:** Group related endpoints in route files
- **Service Layer:** Business logic in `services/`, routes only handle HTTP
- **Error Responses:** Consistent JSON format:
  ```json
  {
    "success": false,
    "message": "Error description"
  }
  ```
- **Success Responses:**
  ```json
  {
    "success": true,
    "data": { /* result */ },
    "metadata": { /* optional metadata */ }
  }
  ```

---

## 🔒 Security Guidelines

### File Upload Security
1. **Validation Chain:**
   - MIME type check (PDF/DOCX only)
   - File extension check (.pdf, .docx, .doc)
   - Size limit enforcement (10MB max)
2. **Auto Cleanup:** Temporary files deleted after processing (success or failure)
3. **Unique Filenames:** Timestamp + random suffix to prevent collisions

### API Key Management
- **Never commit:** API keys must be in `.env` (gitignored)
- **Environment Check:** Validate `ANTHROPIC_API_KEY` exists before server starts
- **Error Messages:** Don't expose API key errors to clients (generic message)

### CORS Configuration
- **Whitelist Origins:** `process.env.CORS_ORIGIN` split by comma
- **Allowed Methods:** GET, POST, OPTIONS only
- **Credentials:** Not required for this app

---

## 📡 API Design

### Endpoint: POST /api/resume/analyze

**Request:**
- Content-Type: `multipart/form-data`
- Field: `file` (PDF or DOCX, max 10MB)

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "score": 85,
    "strengths": ["string", "string", "..."],
    "weaknesses": ["string", "string", "..."],
    "suggestions": ["string", "string", "..."],
    "atsCompatibility": {
      "level": "High",
      "explanation": "string"
    },
    "format": {
      "rating": "Good",
      "comments": "string"
    },
    "content": {
      "rating": "Medium",
      "comments": "string"
    }
  },
  "metadata": {
    "fileName": "resume.pdf",
    "fileSize": 123456,
    "extractedLength": 5000,
    "model": "claude-3-5-sonnet-20241022",
    "tokensUsed": 2048
  }
}
```

**Response (Error - 400/500):**
```json
{
  "success": false,
  "message": "Error description"
}
```

### Endpoint: GET /api/health

Health check for monitoring/deployment.

**Response (200):**
```json
{
  "status": "healthy",
  "timestamp": "2025-10-01T12:00:00.000Z",
  "environment": "development"
}
```

---

## 🤖 Claude AI Integration

### Model Configuration
- **Model:** `claude-3-5-sonnet-20241022`
- **Max Tokens:** 2048 (sufficient for detailed analysis)
- **Temperature:** 0.7 (balanced creativity/consistency)

### Prompt Engineering
- **Structured Output:** Prompt explicitly requests JSON format
- **Validation:** Parse response with regex to extract JSON block
- **Error Handling:** Graceful fallback if AI response is malformed
- **Context:** Resume text included in full, no truncation

### Response Parsing
1. Extract text from AI message
2. Regex match: `/\{[\s\S]*\}/` (JSON block)
3. Parse JSON with `JSON.parse()`
4. Validate required fields (`score`, `strengths`, `suggestions`)
5. Return structured analysis object

---

## 🎨 UI/UX Principles

### Component Design
- **Single Responsibility:** Each component has one clear purpose
- **Controlled Components:** Form inputs managed by React state
- **Loading States:** Show spinners during async operations
- **Error Boundaries:** Display user-friendly error messages

### Tailwind Usage
- **Custom Classes:** Defined in `@layer components` (`.btn-primary`, `.card`)
- **Color Scheme:** Primary blue (`primary-*` scale)
- **Responsive:** Mobile-first design with `sm:`, `md:`, `lg:` breakpoints
- **Accessibility:** Semantic HTML, ARIA labels where needed

### User Feedback
- **Progress Indicators:** Spinner + "Analyzing..." text during API call
- **Error Messages:** Red background, icon, "Try Again" button
- **Success Display:** Color-coded score (green/yellow/red), organized sections
- **Reset Functionality:** "Analyze New Resume" button to restart

---

## 🔄 Development Workflow

### Running Locally
1. **Backend:** `cd backend && npm run dev` (port 3000, auto-restart on changes)
2. **Frontend:** `cd frontend && npm run dev` (port 5173, HMR enabled)
3. **Proxy:** Vite proxies `/api/*` requests to `http://localhost:3000`

### Environment Variables
**Backend (.env):**
```env
PORT=3000
ANTHROPIC_API_KEY=sk-ant-...
CORS_ORIGIN=http://localhost:5173,https://mindtrellis.com
MAX_FILE_SIZE=10485760
NODE_ENV=development
```

### Git Workflow
- **Branch:** `main` (production-ready code)
- **Commit Format:** Conventional commits (`feat:`, `fix:`, `docs:`, `refactor:`)
- **Protected Files:** `.env` never committed (in `.gitignore`)

### Testing Strategy
- **Manual Testing:** Upload various PDF/DOCX files, test edge cases
- **API Testing:** curl commands for health check and resume analysis
- **Error Scenarios:** Invalid files, missing API key, network timeout

---

## 🚀 Deployment

### Railway Deployment
- **Backend:** Deploy from GitHub, set environment variables in Railway dashboard
- **Frontend:** Build with `npm run build`, deploy `dist/` folder
- **Domain:** Custom domain can be configured in Railway settings

### WordPress Embedding
- **Widget Build:** Vite configured to output `widget.js` and `widget.css`
- **Embed Methods:**
  1. Script tag injection (recommended)
  2. iframe embedding (fallback)

---

## 🤝 AI Assistant Guidelines

### When Making Changes

1. **Read First:** Always read existing files before editing
2. **Preserve Structure:** Maintain current architecture and patterns
3. **Test Compatibility:** Ensure changes work with both dev and production
4. **Update Docs:** If changing behavior, update README or this file

### Code Generation

- **Match Style:** Follow existing code patterns (see Code Standards section)
- **Error Handling:** Always include try-catch and user-friendly error messages
- **Validation:** Validate inputs before processing
- **Comments:** Add JSDoc comments for functions, explain complex logic

### Common Tasks

**Adding a new API endpoint:**
1. Add route in `backend/src/routes/resume.js`
2. Add business logic in appropriate service file
3. Update this file with endpoint documentation
4. Test with curl or Postman

**Adding a new UI component:**
1. Create component in `frontend/src/components/`
2. Use Tailwind classes, leverage `.card`, `.btn-primary` custom classes
3. Manage state with hooks (`useState`, `useEffect`)
4. Import and use in `App.jsx`

**Modifying AI prompt:**
1. Edit prompt in `backend/src/services/ai.js`
2. Test with various resume samples
3. Ensure JSON response parsing still works
4. Update expected response format in this file if needed

### Things to Avoid

- ❌ Hardcoding API keys or secrets
- ❌ Using class components (use functional + hooks)
- ❌ Inline styles (use Tailwind)
- ❌ Committing `node_modules/` or `.env`
- ❌ Breaking CORS configuration
- ❌ Removing file validation checks
- ❌ Ignoring error handling

---

## 📚 Additional Resources

- [Claude AI API Docs](https://docs.anthropic.com/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [React Hooks Reference](https://react.dev/reference/react)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Configuration](https://vitejs.dev/config/)

---

**Last Updated:** 2025-10-01
**Maintained By:** TekinKIVRAK
**AI Assistant:** Claude (Anthropic)