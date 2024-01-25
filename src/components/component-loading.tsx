import React from "react";

function ComponentLoading() {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}

export default ComponentLoading;
