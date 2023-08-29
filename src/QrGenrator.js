import React, { useState, useRef,useCallback } from "react";
import axios from "axios";
import { RxDownload, RxShare1 } from "react-icons/rx";
import { ImPrinter } from "react-icons/im";
import { useDropzone } from 'react-dropzone';

function QrGenrator() {

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = event => {
      const files = event.target.files;
      setSelectedFiles(Array.from(files));
  };

  const uploadFiles = () => {
      // Simulate uploading with a timeout
      setUploading(true);
      let progress = 0;
      const interval = setInterval(() => {
          progress += 10;
          setUploadProgress(progress);
          if (progress >= 100) {
              clearInterval(interval);
              setUploading(false);
          }
      }, 500);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: acceptedFiles => {
          setSelectedFiles(acceptedFiles);
      },
  });





  const [url, setUrl] = useState("");
  const [response, setResponse] = useState("");
  const [show, setShow] = useState(false);
  const [selectedSize, setSelectedSize] = useState(600);
  const [QRtype, setQRtype] = useState({name:"Url",placeholder:"Url"});
  const [ssid,setSsid]=useState("")
  const [pwd,setPwd]=useState("")
  const [isHidden,setIsHidden]=useState(false)

  const types = [
    { name: "Url", placeholder: "Url" },
    { name: "Text", placeholder: "Text" },
    { name: "Wifi", placeholder: "Wifi" },
    { name: "Email", placeholder: "Email ID" },
    { name: "SMS", placeholder: "Phone Number" },
    { name: "Image", placeholder: "image-url" },
    { name: "PDF", placeholder: "pdf-url" },
    { name: "Bitcoin", placeholder: "bitcoin-address" },
  ];

  const handlePostRequest = async () => {
    setShow(true);
    if(QRtype.name==="Wifi"){
      setUrl({
        ssid:ssid,
        password:pwd,
        isHidden:isHidden
      })
    }
    try {
      const response = await axios.post(
        "http://localhost:8001/generateQR",
        { type:QRtype, content:url  }
      );
      setResponse(response.data);
      setShow(false);
      console.log(response.data)
    } catch (error) {
      console.error("Error making POST request:", error);
      setResponse("An error occurred.");
      setShow(false);
    }
  };

  const imageRef = useRef(null);

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

  const formatSize = bytes => {
    if (bytes === 0) return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};

  return (
    <section className="text-gray-600 body-font">
      <div className="w-full h-12">
        <ul className="flex flex-column justify-center items-center gap-x-10 cursor-pointer ">
          {types.map((ele, i) => {
            return (
              <li key={i} 
              className={QRtype.name === ele.name ? "selected text-2xl" : "hover:font-bold hover:text-2xl"}
              onClick={() => {setQRtype({name:ele.name,placeholder:ele.placeholder})
              setResponse(null)
              setUrl(null)}}>
                {ele.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="container px-5 py-6 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-500">
            Encode Information in Seconds
          </h1>

          <p className="lg:w-2/3 mx-auto leading-relaxed text-lg">
            "Did you know that QR codes were first created in Japan by a Toyota
            subsidiary to track vehicles during manufacturing? Fast forward to
            today, and QR codes have evolved into versatile gems of information
            sharing. These digital marvels can store not just website URLs, but
            also contact information, Wi-Fi passwords, and even Bitcoin
            addresses!
          </p>
        </div>
      </div>
      {
        QRtype.name==="Url" || QRtype.name==="SMS" || QRtype.name==="Text" || QRtype.name==="Email" || QRtype.name==="Bitcoin"||QRtype.name==="Image" || QRtype.name==="PDF" ? <div className="w-full flex pl-10 mt-[-28px] flex-row items-center justify-center gap-x-4 ">
        <div className="">
          <label
            for="full-name"
            className="leading-8 tracking-widest  text-sm text-gray-600"
          >
            Enter your <span className="text-green-500">{QRtype.placeholder}</span> here!
          </label>

         {
          QRtype.name==="Text" ?
          <textarea onChange={(e) => setUrl(e.target.value)} id="message" rows="4" className="block p-2.5 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your text here..."></textarea>
         :
         <input
         onChange={(e) => setUrl(e.target.value)}
         type="text"
         id="full-name"
         name="full-name"
         className="w-full bg-gray-500 bg-opacity-50 rounded border border-gray-400 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-300 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
       />
       }
          </div>

        <div className="mt-[27px]">
            <button
              onClick={handlePostRequest}
              className="text-white bg-green-500 border-0 py-2  px-8  focus:outline-none hover:bg-green-600 rounded text-lg"
            >
              Generate QR
            </button>
          </div>

  </div>:null
      }

     {QRtype.name==="Wifi" &&
       <div className="w-full flex pl-10 mt-[-28px] flex-row items-center justify-center gap-x-4 ">
       <div className="w-60">
         <label
           for="full-name"
           className="leading-8 tracking-widest  text-sm text-gray-600"
         >
           Enter your <span className="text-green-500">SSID</span> here!
         </label>
         <input
           onChange={(e) => setSsid(e.target.value)}
           type="text"
           id="full-name"
           name="full-name"
           className="w-full bg-gray-500 bg-opacity-50 rounded border border-gray-400 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-300 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
         />
         

       </div>

       <div className="w-60">
         <label
           for="full-name"
           className="leading-8 tracking-widest  text-sm text-gray-600"
         >
           Paste your <span className="text-green-500">Password</span> here!
         </label>
         <input
           onChange={(e) => setPwd(e.target.value)}
           type="text"
           id="full-name"
           name="full-name"
           className="w-full bg-gray-500 bg-opacity-50 rounded border border-gray-400 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-300 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
         />
       </div>

       <div className="mt-[27px]">
           <button
             onClick={handlePostRequest}
             className="text-white bg-green-500 border-0 py-2  px-8  focus:outline-none hover:bg-green-600 rounded text-lg"
           >
             Generate QR
           </button>
         </div>

 </div>}
{QRtype.name==="Wifi" &&
      <div class="w-full flex items-center justify-center mt-2">
      <input onClick={()=>setIsHidden(!isHidden)} id="link-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
      <label for="link-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Check if Wifi SSID is hidden.</label>
  </div>}

  {QRtype.name==="Image" || QRtype.name==="PDF" ?
  <>

        <div className="flex flex-col items-center p-8">
            <div className="mb-4">
                <h2 className="text-2xl font-semibold">Drag & Drop or Browse Files</h2>
            </div>
            <div
                {...getRootProps()}
                className={`w-64 border ${
                    isDragActive ? 'border-green-500' : 'border-dashed border-gray-400'
                } p-4 rounded-lg`}
            >
                <input {...getInputProps()} accept=".pdf,.jpg,.png,.docx" multiple />
                {isDragActive ? (
                    <p>Drop the files here</p>
                ) : (
                    <p>Drag and drop files or click to browse</p>
                )}
            </div>
            {selectedFiles.length > 0 && (
                <div className="mt-4">
                    <button
                        onClick={uploadFiles}
                        className={`py-2 px-4 bg-blue-500 text-white rounded ${
                            uploading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={uploading}
                    >
                        {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
            )}
            {uploading && (
                <div className="mt-2">
                    <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                            <div>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                                    {uploadProgress}%
                                </span>
                            </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
                            <div
                                style={{ width: `${uploadProgress}%` }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
                            ></div>
                        </div>
                    </div>
                </div>
            )}
            <div className="mt-4">
                <ul>
                    {selectedFiles.map((file, index) => (
                        <li key={index} className="flex items-center justify-between">
                            <span>{file.name}</span>
                            <span className="text-gray-400">{formatSize(file.size)}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>


  </>:null}


            
            <div className="w-full">
            {response && (
              <div className="w-full mt-6 flex justify-center items-center">
                {/* <img
                  src={response.qrCodeImageUrl}
                  ref={imageRef}
                  className="w-[250px] h-[250px]"
                ></img> */}
                <div dangerouslySetInnerHTML={{ __html: response }} className="mt-2" />
              </div>
            )}
          </div>

          {response && (
                <div className="mt-4 w-8 h-8  flex flex-col justify-center items-center gap-2">
                  <button
                    onClick={handleDownload}
                    className="text-white  bg-green-500 border-0 py-2 px-4 focus:outline-none hover:bg-green-600 rounded text-lg"
                  >
                    <RxDownload />
                  </button>

                  <button
                    onClick={handlePrint}
                    className="text-white bg-green-500 border-0 py-2 px-4  focus:outline-none hover:bg-green-600 rounded text-lg"
                  >
                    <ImPrinter />
                  </button>

                  <button
                    onClick={handleShare}
                    className="text-white bg-green-500 border-0 py-2 px-4  focus:outline-none hover:bg-green-600 rounded text-lg"
                  >
                    <RxShare1 />
                  </button>
                </div>
              )}

            {/* <div className="w-full flex justify-center">
                <label
                  for="full-name"
                  className="leading-7  text-sm text-gray-600 cursor-pointer"
                >
                  <span
                    className={selectedSize === 600 ? "selected" : ""}
                    onClick={() => setSelectedSize(300)}
                  >
                    600x600{" "}
                  </span>{" "}
                  <span
                    className={selectedSize === 900 ? "selected" : ""}
                    onClick={() => setSelectedSize(600)}
                  >
                    900x900{" "}
                  </span>{" "}
                  <span
                    className={selectedSize === 1200 ? "selected" : ""}
                    onClick={() => setSelectedSize(900)}
                  >
                    1200x1200{" "}
                  </span>
                </label>
              </div> */}
    </section>
  );
}

export default QrGenrator;
