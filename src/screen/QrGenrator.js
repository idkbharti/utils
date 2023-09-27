import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

import ParaCard from "../components/ParaCard";
import OutputDiv from "../components/OutputDiv";
import UpperMenu from "../components/UpperMenu";
import InputCard from "../components/InputCard";

function QrGenrator() {
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [document.body.scrollHeight]);
  
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState("");
  const [showl, setShowl] = useState(false);
  const [QRtype, setQRtype] = useState({ name: "Url", placeholder: "Url" });
  const [ssid, setSsid] = useState("");
  const [pwd, setPwd] = useState("");
  const [isHidden, setIsHidden] = useState(false);

  const uploadFiles = async () => {
    try {
    setShowl(true);
    setResponse("");
    const formData = new FormData();
    formData.append("file", selectedFiles[0]);
    const response = await axios.post("https://url-self.vercel.app/qr/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
    setResponse(response.data);
     
    } catch (error) {
       console.log(error)
    }
    setShowl(false);
    setSelectedFiles([]);
  };

  const handleVaidaton = () => {
    if(QRtype.name==="Wifi"){
      setUrl({ssid,password: pwd,isHidden});
    }
    handlePostRequest()
  };

  const handlePostRequest = async () => {
    // console.log(url)
   if(!url){
   alert("please fill all the feild")
   }else{
    try {
    // console.log("api requesting...in try block")
      setShowl(true);
      setResponse("");
      const response = await axios.post("https://url-self.vercel.app/qr/", {
        type: QRtype.name,
        content: url,
      });
      // console.log(response.data)
      setResponse(response.data);
    } catch (error) {
      console.log(error)
    }
    setShowl(false);   }
  };

  const imageRef = useRef(null);

  return (
    <section className="text-gray-600 min-h-[80vh]">
      <UpperMenu
        setResponse={setResponse}
        QRtype={QRtype}
        setQRtype={setQRtype}
        setUrl={setUrl}
        setSelectedFiles={setSelectedFiles}
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
