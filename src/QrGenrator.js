import React, { useState, useRef } from "react";
import axios from "axios";
import { RxDownload, RxShare1 } from "react-icons/rx";
import { ImPrinter } from "react-icons/im";

function QrGenrator() {
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState("");
  const [show, setShow] = useState(false);
  const [selectedSize, setSelectedSize] = useState(600);
  const [QRtype, setQRtype] = useState('Url');
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
    if(QRtype=="Wifi"){
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

  return (
    <section className="text-gray-600 body-font">
      <div className="w-full h-12">
        <ul className="flex flex-column justify-center items-center gap-x-10 cursor-pointer ">
          {types.map((ele, i) => {
            return (
              <li key={i} 
              className={QRtype === ele.name ? "selected text-2xl" : "hover:font-bold hover:text-2xl"}
              onClick={() => {setQRtype(ele.name)
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
        QRtype=="Url" || QRtype=="SMS" || QRtype=="Text" || QRtype=="Email" || QRtype=="Bitcoin" ? <div className="w-full flex pl-10 mt-[-28px] flex-row items-center justify-center gap-x-4 ">
        <div className="">
          <label
            for="full-name"
            className="leading-8 tracking-widest  text-sm text-gray-600"
          >
            Enter your <span className="text-green-500">{QRtype}</span> here!
          </label>
          <input
            onChange={(e) => setUrl(e.target.value)}
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

  </div>:null
      }

     {QRtype=="Wifi" &&
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
{QRtype=="Wifi" &&
      <div class="w-full flex items-center justify-center mt-2">
      <input onClick={()=>setIsHidden(!isHidden)} id="link-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
      <label for="link-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Check if Wifi SSID is hidden.</label>
  </div>}


            
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
