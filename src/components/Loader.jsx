import React from "react";
import "./loader.css"

const Loader = () => {
  return (
    <>
        <div
          className="fixed top-0 left-0 z-10 flex h-full w-full flex-col items-center justify-center gap-10 bg-gray-950/80 fade-in-delayed"
        >
          <div className="h-[120px] w-[120px] animate-spin rounded-full border-[16px] border-white border-t-gray-800"></div>
          <p className="text-center text-3xl font-bold text-white">Loading</p>
        </div>,
    </>
  );
};

export default Loader;
