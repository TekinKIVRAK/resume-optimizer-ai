/**
 * File validation utilities
 */

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
  'application/msword' // .doc
];

const ALLOWED_EXTENSIONS = ['.pdf', '.docx', '.doc'];

const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE) || 10485760; // 10MB default

/**
 * Validate uploaded file
 * @param {Object} file - Multer file object
 * @returns {Object} - { valid: boolean, error: string }
 */
export function validateFile(file) {
  if (!file) {
    return { valid: false, error: 'No file uploaded' };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds maximum allowed size of ${MAX_FILE_SIZE / 1024 / 1024}MB`
    };
  }

  // Check MIME type
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return {
      valid: false,
      error: 'Invalid file type. Only PDF and DOCX files are allowed'
    };
  }

  // Check file extension
  const fileExtension = file.originalname.toLowerCase().slice(file.originalname.lastIndexOf('.'));
  if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
    return {
      valid: false,
      error: 'Invalid file extension. Only .pdf and .docx files are allowed'
    };
  }

  return { valid: true };
}

/**
 * Sanitize filename
 * @param {string} filename
 * @returns {string}
 */
export function sanitizeFilename(filename) {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_{2,}/g, '_')
    .toLowerCase();
}