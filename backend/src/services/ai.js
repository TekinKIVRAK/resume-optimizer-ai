import Anthropic from '@anthropic-ai/sdk';

/**
 * Get or create Anthropic client instance
 * @returns {Anthropic} - Anthropic client
 */
function getAnthropicClient() {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is not configured');
  }

  return new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
  });
}

/**
 * Analyze resume using Claude AI
 * @param {string} resumeText - Extracted text from resume
 * @returns {Promise<Object>} - Analysis results
 */
export async function analyzeResume(resumeText) {
  try {
    const anthropic = getAnthropicClient();

    const prompt = `You are a professional CV/Resume analysis expert. Analyze the following resume and provide detailed feedback.

Resume Text:
${resumeText}

Please analyze in the following format:

1. OVERALL SCORE (0-100): General evaluation score
2. STRENGTHS: At least 3 items
3. WEAKNESSES: At least 3 items
4. IMPROVEMENT SUGGESTIONS: At least 5 concrete recommendations
5. ATS COMPATIBILITY: (Low/Medium/High) with explanation
6. FORMAT & STRUCTURE: Comments about format and layout
7. CONTENT QUALITY: Comments about content and expression

Please provide your response in JSON format:
{
  "score": 85,
  "strengths": ["...", "...", "..."],
  "weaknesses": ["...", "...", "..."],
  "suggestions": ["...", "...", "...", "...", "..."],
  "atsCompatibility": {
    "level": "High",
    "explanation": "..."
  },
  "format": {
    "rating": "Good",
    "comments": "..."
  },
  "content": {
    "rating": "Medium",
    "comments": "..."
  }
}`;

    const message = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 2048,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    // Extract JSON from response
    const responseText = message.content[0].text;

    // Try to find JSON in the response
    let jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse AI response as JSON');
    }

    const analysis = JSON.parse(jsonMatch[0]);

    // Validate response structure
    if (!analysis.score || !analysis.strengths || !analysis.suggestions) {
      throw new Error('Invalid analysis structure from AI');
    }

    return {
      success: true,
      data: analysis,
      metadata: {
        model: message.model,
        tokensUsed: message.usage.input_tokens + message.usage.output_tokens
      }
    };
  } catch (error) {
    console.error('AI Analysis Error:', error);

    if (error.message.includes('API key')) {
      throw new Error('AI service configuration error. Please contact administrator.');
    }

    throw new Error(`AI analysis failed: ${error.message}`);
  }
}

/**
 * Get ATS compatibility tips
 * @returns {Array<string>} - ATS tips
 */
export function getATSTips() {
  return [
    'Use standard headings (Experience, Education, Skills)',
    'Include keywords from job descriptions in your resume',
    'Avoid graphics and images',
    'Use a simple and clean format',
    'Prefer PDF format',
    'Use consistent date formats',
    'List work experience in reverse chronological order'
  ];
}