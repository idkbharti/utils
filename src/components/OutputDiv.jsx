import React, { useRef } from "react";
import { RxDownload, RxShare1 } from "react-icons/rx";
import { ImPrinter } from "react-icons/im";
import Loading from "./Loading";

function OutputDiv({ response, showl, imageRef }) {

  const svgContent = '<svg width="100" height="100"><circle cx="50" cy="50" r="40" /></svg>';

  const handleDownload = () => {
    // Create a data URI from the SVG content
    const dataUri = `data:image/svg+xml,${encodeURIComponent(svgContent)}`;

    // Create an anchor element for downloading
    const link = document.createElement('a');
    link.href = dataUri;
    link.download = 'image.svg';

    // Trigger a click event to initiate the download
    link.click();
  };
  
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(response);
    printWindow.document.close();
    printWindow.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      // Construct a blob from the SVG content
      const svgBlob = new Blob([response], { type: "image/svg+xml" });
      
      // Create a URL for the blob
      const svgBlobUrl = URL.createObjectURL(svgBlob);
  
      navigator
        .share({
          title: "Shared Content",
          text: "Check out this content!",
          url: svgBlobUrl,
        })
        .then(() => {
          console.log("Content shared successfully");
        })
        .catch((error) => {
          console.error("Error sharing content:", error);
        });
    } else {
      console.log("Web Share API is not supported in this browser.");
    }
  };
  
  return (
    <div className="w-full mt-4 flex-col justify-center items-center">
      {showl && <Loading />}

      {response && (
        <div className="flex justify-center flex-col  mb-4 items-center w-full">
          <div dangerouslySetInnerHTML={{ __html: response }} />
          <div className="mt-6 w-full flex justify-center items-center">
            <div>
              <button
                onClick={handleDownload}
                className="text-white  bg-green-500 border-0 py-4 px-4 focus:outline-none hover:bg-green-600 rounded-full text-lg"
              >
                <RxDownload />
              </button>
            </div>

            <div>
              <button
                onClick={handlePrint}
                className="text-white bg-green-500 border-0 py-4 px-4 ml-4 focus:outline-none hover:bg-green-600 rounded-full text-lg"
              >
                <ImPrinter />
              </button>
            </div>

            <div>
              <button
                onClick={handleShare}
                className="text-white bg-green-500 border-0 py-4 px-4 ml-4 focus:outline-none hover:bg-green-600 rounded-full text-lg"
              >
                <RxShare1 />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OutputDiv;
