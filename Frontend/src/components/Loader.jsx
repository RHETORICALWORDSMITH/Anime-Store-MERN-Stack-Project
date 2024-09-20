// components/Loader.jsx
import React from "react";

function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center justify-center space-x-2">
        <div
          className={`w-8 h-8 rounded-full animate-spin 
border-t-4 border-t-black
           border-4 border-transparent`}
        ></div>
      </div>
    </div>
  );
}

export default Loader;
