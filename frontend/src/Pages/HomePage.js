import React from 'react'
import Why from '../components/Why'
import Products from '../components/Products'
import TrustedBy from '../components/TrustedBy'
import Benefit from '../components/Benefit'
import HeroSection from '../components/HeroSection'

const HomePage = () => {
    return (
        <>
            <HeroSection />
            <Why />
            <Products />
            <TrustedBy />
            <Benefit />
        </>
    )
}

export default HomePage