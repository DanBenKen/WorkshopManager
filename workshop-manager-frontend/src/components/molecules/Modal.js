import React from 'react';
import { X } from 'react-feather';

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 p-5">
      <div className="bg-white rounded-lg shadow-xl p-6 relative max-w-[500px] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-5 right-5 text-gray-600"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
          </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
