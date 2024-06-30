import { Document, Page, pdfjs } from "react-pdf";
import { version } from "pdfjs-dist";

// Manually set the worker path to the latest version available on the CDN
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/${version}/pdf.worker.min.js`;

const PdfViewer = ({ fileUrl }) => {
  return (
    <>
      <Document file={fileUrl}>
        <Page pageNumber={1} />
      </Document>
    </>
  );
}

export default PdfViewer;
