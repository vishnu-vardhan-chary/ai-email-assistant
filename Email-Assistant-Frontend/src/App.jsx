import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post("http://localhost:8181/api/email/generate", {
        emailContent,
        tone
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      setError('Failed to generate email reply. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Email Reply Generator</h1>

      <div className="mb-3">
        <label className="form-label">Original Email Content</label>
        <textarea
          className="form-control"
          rows="6"
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
        ></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">Tone (Optional)</label>
        <select
          className="form-select"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          <option value="">None</option>
          <option value="professional">Professional</option>
          <option value="casual">Casual</option>
          <option value="friendly">Friendly</option>
        </select>
      </div>

      <button
        className="btn btn-primary w-100"
        onClick={handleSubmit}
        disabled={!emailContent || loading}
      >
        {loading ? (
          <div className="spinner-border spinner-border-sm" role="status"></div>
        ) : (
          'Generate Reply'
        )}
      </button>

      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}

      {generatedReply && (
        <div className="mt-4">
          <h5>Generated Reply:</h5>
          <textarea
            className="form-control"
            rows="6"
            readOnly
            value={generatedReply}
          ></textarea>

          <button
            className="btn btn-outline-secondary mt-2"
            onClick={() => navigator.clipboard.writeText(generatedReply)}
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
