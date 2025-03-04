import React from 'react';
import ButtonCancel from '../atoms/ButtonCancel';
import ButtonDelete from '../atoms/ButtonDelete';

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
        <p className="mb-4 text-gray-700">{message}</p>
        <div className="flex justify-end gap-2">
          <ButtonCancel 
            onClick={onCancel} 
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </ButtonCancel>
          <ButtonDelete 
            onClick={onConfirm} 
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Confirm
          </ButtonDelete>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
