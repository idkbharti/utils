import React from "react";
import Loading from "./Loading";
import { useDropzone } from "react-dropzone";

function InputCard({
  QRtype,
  setUrl,
  handleVaidaton,
  setSsid,
  setIsHidden,
  setPwd,
  selectedFiles,
  handlePostRequest,
  isHidden,
  response,
  setSelectedFiles,
  uploadFiles,
  uploading,
  showl,
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSelectedFiles(acceptedFiles);
    },
  });

  const formatSize = (bytes) => {
    if (bytes === 0) return "0 B";
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };
  return (
    <>
      {QRtype.name !== "Wifi" ? (
        <div className="w-full flex  flex-col items-center justify-center">
          <div className="w-80">
            <label
              for="full-name"
              className="leading-8 tracking-widest text-sm text-gray-600"
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

          <div className="mt-6">
            <button
              onClick={handleVaidaton}
              className="text-white bg-green-500 border-0 py-2  px-8  focus:outline-none hover:bg-green-600 rounded text-lg"
            >
              Generate QR
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-80">
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
              className="w-80 bg-gray-500 bg-opacity-50 rounded border border-gray-400 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-300 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <div className="w-80">
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
              className="w-80 bg-gray-500 bg-opacity-50 rounded border border-gray-400 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-300 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          {QRtype.name === "Wifi" && (
            <div class="w-80 flex items-center justify-center mt-2">
              <input
                onClick={() => setIsHidden(!isHidden)}
                id="link-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="link-checkbox"
                class="ml-2 text-xs font-normal text-gray-900 dark:text-gray-300"
              >
                Check if Wifi SSID is hidden.
              </label>
            </div>
          )}

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

      {QRtype.name === "Image" || QRtype.name === "PDF" ? (
        <>
          <div className="flex flex-col items-center ">
            {selectedFiles.length === 0 && (
              <>
                <div className="mb-4">
                  <h2 className="text-2xl font-semibold">OR</h2>
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
              </>
            )}

            {/* {uploading && (
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
            )} */}
            {!response && (
              <>
                <div className="mt-4">
                  <ul>
                    {selectedFiles.map((file, index) => (
                      <li
                        key={index}
                        className="flex items-center flex-row h-10 gap-x-4 justify-center"
                      >
                        <div>{file.name}</div>
                        <div className="text-gray-400">
                          {formatSize(file.size)}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                {showl ? (
                  <Loading />
                ) : (
                  <>
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
                  </>
                )}
              </>
            )}
          </div>
        </>
      ) : null}
    </>
  );
}

export default InputCard;
