import React from 'react'

function UpperMenu({QRtype,setQRtype,setResponse,setUrl}) {
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
  return (
    <div className="w-full h-12">
    <ul className="flex flex-column justify-center items-center gap-x-10 cursor-pointer ">
      {types.map((ele, i) => {
        return (
          <li
            key={i}
            className={
              QRtype.name === ele.name
                ? "selected text-2xl"
                : "hover:font-bold hover:text-2xl"
            }
            onClick={() => {
              setQRtype({ name: ele.name, placeholder: ele.placeholder });
              setResponse(null);
              setUrl(null);
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