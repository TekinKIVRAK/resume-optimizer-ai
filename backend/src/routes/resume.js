import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { unlink } from 'fs/promises';
import { validateFile } from '../utils/validator.js';
import { parseResume } from '../services/parser.js';
import { analyzeResume, getATSTips } from '../services/ai.js';

const router = express.Router();

// ESM dirname alternative
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = join(__dirname, '../../uploads');
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `resume-${uniqueSuffix}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10485760 // 10MB
  }
});

/**
 * Helper function to delete uploaded file
 */
async function cleanupFile(filePath) {
  try {
    await unlink(filePath);
    console.log(`Cleaned up file: ${filePath}`);
  } catch (error) {
    console.error(`Failed to cleanup file: ${filePath}`, error);
  }
}

/**
 * POST /api/resume/analyze
 * Analyze uploaded resume
 */
router.post('/analyze', upload.single('file'), async (req, res) => {
  let filePath = null;

  try {
    // Validate file
    const validation = validateFile(req.file);
    if (!validation.valid) {
      if (req.file) await cleanupFile(req.file.path);
      return res.status(400).json({
        success: false,
        message: validation.error
      });
    }

    filePath = req.file.path;
    console.log(`Processing resume: ${req.file.originalname}`);

    // Parse resume
    const resumeText = await parseResume(req.file);
    console.log(`Extracted ${resumeText.length} characters from resume`);

    // Analyze with AI
    const analysis = await analyzeResume(resumeText);

    // Cleanup file after successful processing
    await cleanupFile(filePath);

    // Return results
    res.json({
      success: true,
      data: analysis.data,
      metadata: {
        fileName: req.file.originalname,
        fileSize: req.file.size,
        extractedLength: resumeText.length,
        ...analysis.metadata
      }
    });
  } catch (error) {
    console.error('Resume analysis error:', error);

    // Cleanup file on error
    if (filePath) await cleanupFile(filePath);

    res.status(500).json({
      success: false,
      message: error.message || 'Failed to analyze resume'
    });
  }
});

/**
 * GET /api/resume/ats-tips
 * Get ATS optimization tips
 */
router.get('/ats-tips', (req, res) => {
  res.json({
    success: true,
    data: {
      tips: getATSTips()
    }
  });
});

export default router;