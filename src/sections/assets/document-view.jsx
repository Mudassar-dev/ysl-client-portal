import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { getAssetsFileById } from 'src/services/userService';

import Loading from 'src/components/loading/loading';

const PdfViewer = () => {
  const { fileId } = useParams();
  const [fileUrl, setFileUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await getAssetsFileById(fileId);

        const fileData = new Blob([response], { type: 'application/pdf' });
        const fUrl = URL.createObjectURL(fileData);
        setFileUrl(fUrl);
      } catch (err) {
        console.error('Error fetching the PDF file:', err);
        setError('Failed to load the PDF file.');
      } finally {
        setLoading(false);
      }
    };

    fetchFile();
  }, [fileId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {fileUrl && (
        <iframe
          src={fileUrl}
          width="100%"
          height="600px"
          title="PDF Viewer"
          style={{ border: 'none' }}
        />
      )}
    </div>
  );
};

export default PdfViewer;
