import React from 'react'
import Why from '../components/Why'
import Products from '../components/Products'
import TrustedBy from '../components/TrustedBy'
import Benefit from '../components/Benefit'
import HeroSection from '../components/HeroSection'
import PlanCard from '../components/PlanCard'
import { useNavigate } from 'react-router-dom'

// static sample plans (rendered on home page)
const SAMPLE_PLANS = [
    {
        _id: '69147dcc649c109a2a85299c',
        title: 'Annually',
        price: 4.99,
        subtitle: 'only digital card',
        duration: 365,
    },
    {
        _id: '69148153649c109a2a8529a6',
        title: 'Annually',
        price: 9.99,
        subtitle: 'digital + plastic NFC card',
        duration: 365,
    },
    {
        _id: '6914816a649c109a2a8529a9',
        title: 'Annually',
        price: 24.99,
        subtitle: 'digital + metal card',
        duration: 365,
    },
    {
        _id: '6914819d649c109a2a8529ad',
        title: 'Annually',
        price: 99,
        subtitle: 'digital + plastic card',
        duration: 365,
    },
]

const HomePage = () => {
    const navigate = useNavigate()

    return (
        <>
            <HeroSection />

            <Why />

            {/* Plans preview (static data) */}
            <section id="plans" className="w-full bg-darkGrey flex items-start justify-center py-16 px-4">
                <div className="max-w-screen-xl w-full mx-auto">
                    <div className="text-center mb-4">
                        <h2 className="text-2xl font-semibold text-black">Plans</h2>
                        <p className="text-sm text-lightGrey">Choose a plan that fits you. Visit Plans page to purchase.</p>
                    </div>

                    <div className="flex items-start justify-center md:justify-between gap-6 mt-4 flex-wrap w-full py-10">
                        {SAMPLE_PLANS.map((plan) => (
                            <PlanCard
                                key={plan._id}
                                title={plan.title}
                                price={plan.price}
                                subtitle={plan.subtitle}
                                onContinue={() => navigate('/login')}
                                disabled={false}
                                showButton={true}
                            />
                        ))}
                    </div>
                </div>
            </section>
            <Products />
            <TrustedBy />
            <Benefit />
        </>
    )
}

export default HomePage