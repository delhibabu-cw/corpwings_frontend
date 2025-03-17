import noDataImg from "../../img/NoDataFound/noData.jpg";
import "./DocumentViewer.css"; // Import the normal CSS file

function DocumentViewer({ open, handleModal, document }) {
  if (!open) return null;

  console.log(document);
  console.log(document?.val);
  // console.log(document?.val?.name);
  
  return (
    <div className="overlay">
      <div
        className={`modal-content ${
          document?.key === "document" ? "large-modal" : "small-modal"
        }`}
      >
        <div className="modal-header">
          <h2 className="modal-title">
            {document?.title ? document?.title : ""} Viewer
          </h2>
          <button type="button" className="close-btn" onClick={handleModal}>
            <span className="sr-only">Close</span>
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="modal-body">
          {document?.key === "document" && document?.val ? (
            //  <embed src={document.val} type="application/pdf" width="100%" height="760px" />
            <iframe src={`${document?.val}?inline=true`} className="iframe-content" title="Document Viewer" />
          ) : document?.key === "image" ? (
            <img
              src={document?.val ? document?.val : noDataImg}
              className={`image-content ${document?.val ? "" : "default-image"}`}
              alt="Image Viewer"
            />
          ) : document?.key === "video" ? (
            <video src={document?.val ? document?.val : noDataImg} controls className="video-content" title="Video Player">
              Sorry, your browser doesn't support embedded videos.
            </video>
          ) : document?.key === "word" || document?.key === "excel" ? (
            <iframe
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${document?.val}`}
              className="iframe-content"
              title={`${document?.key === "word" ? "Word" : "Excel"} Document Viewer`}
            />
          ) : document?.key === "csv" ? (
            <iframe src={document?.val} className="iframe-content" title="CSV File Viewer" />
          ) : (
            <p className="unsupported-text">Unsupported file type</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DocumentViewer;
