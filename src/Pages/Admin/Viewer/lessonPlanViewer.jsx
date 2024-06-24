import React from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css'; 


const MyPdfViewer = ({ fileUrl }) => {
  return (
    <div style={{ height: '100vh' }}>
      <Viewer fileUrl={fileUrl} />
    </div>
  );
};

export default MyPdfViewer;
