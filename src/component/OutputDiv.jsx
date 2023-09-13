import React from "react";
import { RxDownload, RxShare1 } from "react-icons/rx";
import { ImPrinter } from "react-icons/im";
import Loading from "./Loading";

function OutputDiv({ response, showl, imageRef }) {
  const handleDownload = async () => {
    if (imageRef.current) {
      try {
        const response = await fetch(imageRef.current.src);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "image.jpg";
        link.click();

        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading image:", error);
      }
    }
  };

  const handlePrint = () => {
    if (imageRef.current) {
      const printWindow = window.open("", "_blank");
      printWindow.document.write(
        `<img src="${imageRef.current.src}" style="max-width: 100%;" />`
      );
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Shared Image",
          text: "Check out this image!",
          url: imageRef.current?.src,
        })
        .then(() => {
          console.log("Image shared successfully");
        })
        .catch((error) => {
          console.error("Error sharing image:", error);
        });
    }
  };
  return (
    <div className="w-full mt-4 flex-col justify-center items-center">
      {showl && <Loading />}

      {response && (
        <div class="flex justify-center flex-col  mb-4 items-center w-full">
          <div dangerouslySetInnerHTML={{ __html: response }} />
          {/* <div className="mt-6 w-full flex justify-center items-center">
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
          </div> */}
        </div>
      )}
    </div>
  );
}

export default OutputDiv;
