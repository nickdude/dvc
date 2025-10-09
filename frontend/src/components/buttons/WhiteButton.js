import React from 'react'

const WhiteButton = ({ icon, text, onClick, disabled = false }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`group bg-offWhite p-3 w-40 h-11 rounded-lg shadow-custom flex items-center justify-center space-x-3 text-sm transition ${disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-black'
                }`}
        >
            <img src={icon} alt="" className={`w-5 h-5 ${!disabled && 'group-hover:invert group-hover:brightness-0'}`} />
            <span className={!disabled ? 'group-hover:text-white' : ''}>{text}</span>
        </button>

    )
}

export default WhiteButton