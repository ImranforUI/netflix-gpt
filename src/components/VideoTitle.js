import React from "react";
import { useSelector } from "react-redux";

const VideoTitle = ({title, overview}) => {
  

  
  return (
    <div className="w-sreen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="w-1/4 text-lg py-6">{overview}</p>
      <div className="">
        <button className="text-black bg-white px-12 p-4 text-lg  rounded-lg hover:bg-opacity-80">
          ▶️ Play
        </button>
        <button className="mx-2 text-white bg-gray-500 bg-opacity-50 px-12 p-4 text-lg  rounded-lg">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
