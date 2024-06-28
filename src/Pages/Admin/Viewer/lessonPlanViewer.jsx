import { Document, Page } from "react-pdf"
const PdfViewer = ({fileUrl}) => {
  return(
    <>
    <Document file={fileUrl}>
      <Page/>
    </Document>
    </>
  )
}
export default PdfViewer