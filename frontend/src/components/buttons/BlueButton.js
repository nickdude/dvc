import React from 'react'

const BlueButton = ({ label, width, onClick, disabled }) => {
    return (
        <button
            className={`bg-lightBlue font-inter text-white font-medium border border-lightBlue text-sm px-6 sm:px-8 py-2 sm:py-3 rounded-xl shadow-fancy transition-all hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed ${width || 'w-full sm:w-auto'}`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    )
}

export default BlueButton