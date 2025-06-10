import React, { useState } from 'react';

const Extract: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleRunExtraction = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const authToken = import.meta.env.VITE_FOUNDRY_BEARER_TOKEN;

    
    console.log("auth", authToken);
    const timestamp = new Date().toISOString();
    const pipelineName = `Pipeline Builder test creation - ${timestamp}`;

    try {
      const response = await fetch(
        'https://northslope.palantirfoundry.com/eddie/api/pipelines-v2/create-with-initial-display',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            createRequest: {
              name: pipelineName,
              parentFolder: 'ri.compass.main.folder.c2de755a-5d2d-47e7-b037-669d18384b37',
              backend: 'Spark',
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to run extraction');
      }

      setSuccess(true);
      console.log('Extraction successful!', await response.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error running extraction:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Extract</h1>
      <p>This is the extract page. Click the button below to run the extraction process.</p>
      <button onClick={handleRunExtraction} disabled={loading}>
        {loading ? 'Running...' : 'Run Extraction'}
      </button>
      {success && <p style={{ color: 'green' }}>Extraction initiated successfully!</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default Extract; 