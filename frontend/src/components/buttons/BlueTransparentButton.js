import React from 'react'

const BlueTransparentButton = ({ label, onClick }) => {
    return (
        <button className='font-medium font-inter text-sm text-lightBlue border border-lightBlue px-8 py-3 rounded-xl shadow-custom' onClick={onClick}>{label}</button>
    )
}

export default BlueTransparentButton