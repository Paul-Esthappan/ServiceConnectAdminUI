import React from 'react';

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-light_gray bg-opacity-10">
            <div className="bg-blue_bg rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-lg font-bold mb-4">Delete Confirmation</h2>
                <p className="mb-4">Are you sure you want to delete this Category?</p>
                <div className="flex justify-end">
                    <button 
                        className="bg-lite_green text-primary rounded-full px-4 py-2 mr-2" 
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button 
                        className="bg-lite_red text-primary rounded-full px-4 py-2" 
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
