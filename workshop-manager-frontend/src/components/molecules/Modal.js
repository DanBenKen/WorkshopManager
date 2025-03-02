import React from 'react';

const Modal = ({ children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 p-5">
      <div className="bg-white rounded-lg shadow-xl p-6 relative md:w-[500px] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
