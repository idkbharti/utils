import React from 'react'

function UpperMenu({QRtype,setQRtype,setResponse,setUrl,setSelectedFiles}) {
    const types = [
        { name: "Url", placeholder: "Url" },
        { name: "Text", placeholder: "Text" },
        { name: "Wifi", placeholder: "Wifi" },
        { name: "Email", placeholder: "Email ID" },
        // { name: "SMS", placeholder: "Phone Number" },
        { name: "Image", placeholder: "image-url" },
        { name: "PDF", placeholder: "pdf-url" },
        { name: "Bitcoin", placeholder: "bitcoin-address" },

      ];
  return (
    <div className="w-full h-8">
    <ul className="flex flex-column justify-center items-center md:gap-x-6 gap-x-4 cursor-pointer ">
      {types.map((ele, i) => {
        return (
          <li
            key={i}
            className={
              QRtype.name === ele.name
                ? "selected font-bold"
                : "hover:font-bold"
            }
            onClick={() => {
              setQRtype({ name: ele.name, placeholder: ele.placeholder });
              setResponse(null);
              setUrl(null);
              setSelectedFiles([])
            }}
          >
            {ele.name}
          </li>
        );
      })}
    </ul>
  </div>
  )
}

export default UpperMenu