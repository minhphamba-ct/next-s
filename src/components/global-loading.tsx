import React from "react";

function GlobalLoading() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-900 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-100"></div>
    </div>
  );
}

export default GlobalLoading;
