import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

import ParaCard from "../component/ParaCard";
import OutputDiv from "../component/OutputDiv";
import UpperMenu from "../component/UpperMenu";
import Loading from "../component/Loading";
import InputCard from "../component/InputCard";

function QrGenrator() {
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [document.body.scrollHeight]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState("");
  const [showl, setShowl] = useState(false);
  // const [selectedSize, setSelectedSize] = useState(600);
  const [QRtype, setQRtype] = useState({ name: "Url", placeholder: "Url" });
  const [ssid, setSsid] = useState("");
  const [pwd, setPwd] = useState("");
  const [isHidden, setIsHidden] = useState(false);

  const uploadFiles = () => {
    setShowl(true);
    setResponse("");

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
      const formData = new FormData();
      formData.append("file", selectedFiles[0]);
      axios
        .post("https://url-self.vercel.app/qr/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => setResponse(response.data));
      setShowl(false);
    } catch (error) {
      setShowl(false);
      setResponse("");
      setSelectedFiles([]);
    }
    setShowl(false);
  };



  const handleVaidaton = () => {
    handlePostRequest();
  };

  const handlePostRequest = async () => {
    setShowl(true);
    setResponse("");
    if (QRtype.name === "Wifi") {
      if (!ssid && !pwd) {
        alert("plaese enter ssid and password");
      } else {
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

  return (
    <section className="text-gray-600 min-h-[80vh]">
      <UpperMenu
        setResponse={setResponse}
        QRtype={QRtype}
        setQRtype={setQRtype}
        setUrl={setUrl}
      />
      <ParaCard />
      {!response &&       
      <InputCard
      QRtype={QRtype}
      setUrl={setUrl}
      handlePostRequest={handlePostRequest}
      handleVaidaton={handleVaidaton}
      setIsHidden={setIsHidden}
      setPwd={setPwd}
      setSsid={setSsid}
      response={response}
      showl={showl}
      selectedFiles={selectedFiles}
      setSelectedFiles={setSelectedFiles}
      uploadFiles={uploadFiles}
      uploading={uploading}
      />}


      <OutputDiv response={response} showl={showl} imageRef={imageRef} />
    </section>
  );
}

export default QrGenrator;
