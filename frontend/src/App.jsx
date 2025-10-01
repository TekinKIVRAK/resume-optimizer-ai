import { useState } from 'react';
import Upload from './components/Upload';
import Results from './components/Results';

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalysisComplete = (data) => {
    setResults(data);
    setLoading(false);
  };

  const handleAnalysisStart = () => {
    setLoading(true);
    setError(null);
    setResults(null);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setLoading(false);
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
    setLoading(false);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎯 Resume Optimizer AI
          </h1>
          <p className="text-lg text-gray-600">
            Analyze and improve your resume with AI
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Upload Section */}
          {!results && (
            <Upload
              onAnalysisComplete={handleAnalysisComplete}
              onAnalysisStart={handleAnalysisStart}
              onError={handleError}
              loading={loading}
            />
          )}

          {/* Error Display */}
          {error && (
            <div className="card bg-red-50 border-red-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <p className="mt-1 text-sm text-red-700">{error}</p>
                  <button
                    onClick={handleReset}
                    className="mt-2 text-sm text-red-600 hover:text-red-800 font-medium"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Results Display */}
          {results && <Results data={results} onReset={handleReset} />}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            Powered by AI technology
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;