import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import ParaCard from "../component/ParaCard";
import OutputDiv from "../component/OutputDiv";
import UpperMenu from "../component/UpperMenu";

function QrGenrator() {
  useEffect(()=>{
    window.scrollTo(0, document.body.scrollHeight);
  },[document.body.scrollHeight])
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState("");
  const [showl, setShowl] = useState(false);
  const [selectedSize, setSelectedSize] = useState(600);
  const [QRtype, setQRtype] = useState({ name: "Url", placeholder: "Url" });
  const [ssid, setSsid] = useState("");
  const [pwd, setPwd] = useState("");
  const [isHidden, setIsHidden] = useState(false);

  const uploadFiles = () => {
    // Simulate uploading with a timeout
    // setUploading(true);
    // let progress = 0;
    // const interval = setInterval(() => {
    //   progress += 10;
    //   setUploadProgress(progress);
    //   if (progress >= 100) {
    //     clearInterval(interval);
    //     setUploading(false);
    //     setShowl(true);
    //     setResponse("");

    //   }
    // }, 500);

    try {
      setShowl(true)
      const formData = new FormData();
      formData.append('file', selectedFiles[0]);
      axios.post("https://url-self.vercel.app/qr/upload",formData, {
     headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(response=>setResponse(response.data))
      setShowl(false);
    } catch (error) {
      setShowl(false);
      setResponse("");
    }
    setShowl(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSelectedFiles(acceptedFiles);
    },
  });

const handlePostRequest = async () => {
    setShowl(true);
    setResponse("");

    
    if (QRtype.name === "Wifi") {
      if(!ssid && !pwd){
         alert("plaese enter ssid and password")
      }else{
        setUrl({
          ssid: ssid,
          password: pwd,
          isHidden: isHidden,
        });
      }
      
    }
    try {
      const response = await axios.post("https://url-self.vercel.app/qr/", {
        type: QRtype.name,
        content: url,
      });
      setShowl(false);

      setResponse(response.data);
      console.log(response, QRtype, url);
    } catch (error) {
      setShowl(false);
      setResponse("");
    }
    setShowl(false);
  };

  const imageRef = useRef(null);

  const formatSize = (bytes) => {
    if (bytes === 0) return "0 B";
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };

  return (
    <section className="text-gray-600 body-font">
      <UpperMenu setResponse={setResponse} QRtype={QRtype} setQRtype={setQRtype} setUrl={setUrl} />
      <ParaCard/>

      {QRtype.name !== "Wifi" ? (
        <div className="w-full flex pl-10 mt-[-28px] flex-row items-center justify-center gap-x-4 ">
          <div className="">
            <label
              for="full-name"
              className="leading-8 tracking-widest  text-sm text-gray-600"
            >
              Enter your{" "}
              <span className="text-green-500">{QRtype.placeholder}</span> here!
            </label>

            {QRtype.name === "Text" ? (
              <textarea
                onChange={(e) => setUrl(e.target.value)}
                id="message"
                rows="4"
                className="block p-2.5 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your text here..."
              ></textarea>
            ) : (
              <input
                onChange={(e) => setUrl(e.target.value)}
                type="text"
                id="full-name"
                name="full-name"
                className="w-full bg-gray-500 bg-opacity-50 rounded border border-gray-400 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-300 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            )}
          </div>

          <div className="mt-[27px]">
            <button
              onClick={handleVaidaton}
              className="text-white bg-green-500 border-0 py-2  px-8  focus:outline-none hover:bg-green-600 rounded text-lg"
            >
              Generate QR
            </button>
          </div>
        </div>
      ) : null}

      {QRtype.name === "Wifi" && (
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
        </div>
      )}
      {QRtype.name === "Wifi" && (
        <div class="w-full flex items-center justify-center mt-2">
          <input
            onClick={() => setIsHidden(!isHidden)}
            id="link-checkbox"
            type="checkbox"
            value=""
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="link-checkbox"
            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Check if Wifi SSID is hidden.
          </label>
        </div>
      )}

      {QRtype.name === "Image" || QRtype.name === "PDF" ? (
        <>
          <div className="flex flex-col items-center p-4">
         
            {selectedFiles.length===0 && 
               <>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold">
                 OR
              </h2>
            </div>
            <div
              {...getRootProps()}
              className={`w-80 border ${
                isDragActive
                  ? "border-green-500"
                  : "border-dashed border-gray-400"
              } p-4 rounded-lg`}
            >
              <input
                {...getInputProps()}
                accept=".pdf,.jpg,.png,.docx"
                multiple
              />
              {isDragActive ? (
                <p>Drop the files here</p>
              ) : (
                <p>Drag and drop files or click to browse</p>
              )}
            </div>
            </>}

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
          {!response && 
          <>
                    <div className="mt-4">
              <ul>
                {selectedFiles.map((file, index) => (
                  <li key={index} className="flex items-center flex-row h-10 gap-x-4 justify-center">
                    <div>{file.name}</div>
                    <div className="text-gray-400">
                      {formatSize(file.size)}
                    </div>
             
                  </li>
                ))}
              </ul>
            </div>
            {selectedFiles.length > 0 && (
              <div className="mt-4">
                <button
                  onClick={uploadFiles}
                  className={`py-2 px-4 bg-blue-500 text-white rounded ${
                    uploading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            )}
          </>}
          </div>
        </>
      ) : null}

       <OutputDiv response={response} showl={showl} imageRef={imageRef}/>
    </section>
  );
}

export default QrGenrator;
