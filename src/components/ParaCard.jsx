import React, { useEffect, useState } from 'react'

function ParaCard() {
    const [visibleText, setVisibleText] = useState("");
    const text = "Encode Information ";
    const typewriterText = "in Seconds.";
    const textColor = "text-green-500"; // Change the text color to green
  
    useEffect(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= typewriterText.length) {
          setVisibleText(typewriterText.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 100); // Adjust the interval speed as needed
      return () => clearInterval(interval);
    }, []);
  return (
<div
    className="container px-6 py-8 mx-auto"
  >
    <div className="flex flex-col text-center">
      <h1 className="md:text-3xl text-2xl font-medium title-font mb-4 text-gray-500">
        {text}
        <span className={textColor}>{visibleText}</span>
      </h1>

      <p className="lg:w-2/3 mx-auto px-2 leading-relaxed text-center md:text-lg text-sm slide-in">
        "Did you know that QR codes were first created in Japan by a Toyota
        subsidiary to track vehicles during manufacturing? Fast forward to
        today, and QR codes have evolved into versatile gems of information
        sharing. These digital marvels can store not just website URLs, but
        also contact information, Wi-Fi passwords, and even Bitcoin
        addresses!
      </p>
    </div>
  </div>
  )
}

export default ParaCard