import React from 'react'

const BlueButton = ({ label, width, onClick, disabled }) => {
    return (
        <button className={`bg-lightBlue font-inter text-white font-medium border border-lightBlue text-sm px-8 py-3 rounded-xl shadow-fancy ${width}`} onClick={onClick} >{label}</button>
    )
}

export default BlueButton