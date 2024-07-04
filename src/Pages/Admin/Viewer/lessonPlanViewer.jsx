import { Worker, Viewer } from '@react-pdf-viewer/core';

import '@react-pdf-viewer/core/lib/styles/index.css';

const MyPdfViewer = ({fileUrl}) => {
  return <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
   <div className='border w-screen h-fit mx-auto'>
    <Viewer fileUrl={fileUrl} />
  </div>

  </Worker>;
};
export default MyPdfViewer  