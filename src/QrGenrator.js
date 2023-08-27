import React, { useState,useRef } from 'react'
import axios from 'axios';
import {RxDownload,RxShare1} from "react-icons/rx"
import {ImPrinter} from "react-icons/im"

function QrGenrator() {
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState('');
  const [show,setShow]=useState(false)
  const [selectedSize,setSelectedSize]=useState(600)

  const types=[{name:"Url", path:"/url"},{name:"Text",path:"/text"},{name:"Wifi",path:"wifi"},{name:"Email",path:"/email"},{name:"SMS",path:"/sms"},{name:"Image",path:"/image"},{name:"PDF",path:"pdf"},{name:"Bitcoin",path:"/bitcoin"}]


  const handlePostRequest = async () => {
    setShow(true)
    try {
      const response = await axios.post('http://localhost:8001/generate-qrcode', { url,size:selectedSize });
      setResponse(response.data);
      setShow(false)
      // console.log(response.data)
    } catch (error) {
      console.error('Error making POST request:', error);
      setResponse('An error occurred.');
      setShow(false)
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
      <div className='w-full h-12'>
        <ul className='flex flex-column justify-center items-center gap-x-10'>
          {types.map((ele,i)=>{
            return(
              <li key={i} className='text-lg'>{ele.name}</li>
            )
          })}
        </ul>
      </div>
    <div className="container px-5 py-20 mx-auto">
      <div className="flex flex-col text-center w-full mb-12">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-500">Encode Information in Seconds</h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-lg">"Did you know that QR codes were first created in Japan by a Toyota subsidiary to track vehicles during manufacturing? Fast forward to today, and QR codes have evolved into versatile gems of information sharing. These digital marvels can store not just website URLs, but also contact information, Wi-Fi passwords, and even Bitcoin addresses!</p>
      </div>
      <div className="w-2/3 mx-auto flex flex-row h-72">
        
        {/* input div------------ */}
        <div className='w-1/2 flex pl-10 flex-col'>
        <div className="w-full  flex flex-col justify-center">
          <label for="full-name" className="leading-7  text-sm text-gray-600">Paste the URL here!</label>
          <input onChange={(e)=>setUrl(e.target.value)} type="text" id="full-name" name="full-name" className="w-full bg-gray-500 bg-opacity-50 rounded border border-gray-400 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-300 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
        </div>

        {/* button div------ */}
      <div className='w-full flex flex-col  mt-4'>
      <div className='w-full flex justify-center'>
      <button onClick={handlePostRequest} className="text-white bg-green-500 border-0 py-2  px-8  focus:outline-none hover:bg-green-600 rounded text-lg">Generate QRCODE</button>
     </div>

     <div className='w-full flex justify-center'>
      <label for="full-name" className="leading-7  text-sm text-gray-600 cursor-pointer">
        <span className={selectedSize === 600 ? "selected" : ""}
      onClick={() => setSelectedSize(300)}>600x600  </span>    <span className={selectedSize === 900 ? "selected" : ""}
      onClick={() => setSelectedSize(600)}>900x900  </span>    <span className={selectedSize === 1200 ? "selected" : ""}
      onClick={() => setSelectedSize(900)}>1200x1200  </span></label>
      </div>


{response &&       <div className='mt-4 w-full flex justify-center'>
      <button onClick={handleDownload} className="text-white  bg-green-500 border-0 py-2 px-4 focus:outline-none hover:bg-green-600 rounded text-lg"><RxDownload/></button>
 
 <button onClick={handlePrint} className="text-white bg-green-500 border-0 py-2 px-4 ml-2 focus:outline-none hover:bg-green-600 rounded text-lg"><ImPrinter/></button>

 <button onClick={handleShare} className="text-white bg-green-500 border-0 py-2 px-4 ml-2 focus:outline-none hover:bg-green-600 rounded text-lg"><RxShare1/></button>
      </div>}
      </div>
      </div>



      
      <div className='w-1/2'>
        { response &&
        <div className='w-full mt-6 flex justify-center items-center'>
        <img src={response.qrCodeImageUrl} ref={imageRef} className='w-[250px] h-[250px]'></img>
        </div>
        }
        </div>
    </div>

      {/* qrcode div-------------- */}
     {/* {show && <div className='w-full mt-10 flex justify-center items-center'>
     <div role="status" class="space-y-8 animate-pulse w-[200px] h-[200px] md:space-y-0 md:space-x-8 md:flex md:items-center">
     <div class="flex items-center justify-center w-[200px] h-[200px] bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
        <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
        </svg>
    </div>
    </div>
    </div>} */}


    
    </div>
  </section>
  )
}

export default QrGenrator