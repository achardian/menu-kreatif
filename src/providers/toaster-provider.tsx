"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <div className='fixed '>
      <Toaster />
    </div>
  );
};

export default ToasterProvider;
