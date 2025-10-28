import logo from '../assets/logo.jpeg'
import envelop from '../assets/envelop.svg'
import star from '../assets/star.svg'
import question from '../assets/question.svg'
import BlueTransparentButton from './buttons/BlueTransparentButton'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Asidebar = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        console.log("Logging out...");
        localStorage.removeItem("token");
        navigate("/login");
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <div className='hidden lg:flex lg:w-80 py-10 shadow-md flex-col'>
                <img
                    src={logo}
                    alt="logo"
                    className='h-14 w-48 m-4 cursor-pointer hover:opacity-80 transition-opacity'
                    onClick={() => navigate('/')}
                />
                <div className='text-white ml-4 mt-14 flex'>
                    <div className='font-normal flex items-center justify-center rounded-lg text-sm font-inter bg-lightBlue p-3 w-10'>S</div>
                    <div className='ml-3 flex flex-col items-start justify-center'>
                        <p className='font-semibold text-sm text-semiLightBlack'>Shubham</p>
                        <p className='font-normal text-xs text-semiLightBlack'>link.v1ce.co/gzamoplr</p>
                    </div>
                </div>
                <div className='mt-10 flex flex-col items-start justify-center text-sm font-inter text-semiLightBlack'>
                    <h1 className='font-medium text-xs leading-3 text-semiLightBlack mb-4 ml-3'>HOME</h1>
                    <div
                        onClick={() => navigate('/my-cards')}
                        className='mb-4 ml-8 cursor-pointer flex items-center hover:bg-gray-100 p-2 rounded-lg transition-colors'
                    >
                        <img src={star} alt='home' className='inline mr-2' />
                        <p className='font-normal text-sm text-semiBlack'>My Digital Cards</p>
                    </div>
                    <div
                        onClick={() => navigate('/template')}
                        className='mb-4 ml-8 cursor-pointer flex items-center hover:bg-gray-100 p-2 rounded-lg transition-colors'
                    >
                        <img src={envelop} alt='home' className='inline mr-2' />
                        <p className='font-normal text-sm text-semiBlack'>Choose Template</p>
                    </div>

                    <h1 className='font-medium text-xs leading-3 text-semiLightBlack mb-4 ml-3'>HELP</h1>
                    <div className='mb-4 ml-8 cursor-pointer flex items-center hover:bg-gray-100 p-2 rounded-lg transition-colors'>
                        <img src={question} alt='home' className='inline mr-2' />
                        <p className='font-normal text-sm text-semiBlack'>HELP</p>
                    </div>
                </div>
                <div className='my-6 mx-4'>
                    <BlueTransparentButton label="Logout" onClick={handleLogout} />
                </div>
            </div>

            {/* Mobile Header */}
            <div className='lg:hidden w-full bg-white shadow-md p-4 flex items-center justify-between'>
                <img
                    src={logo}
                    alt="logo"
                    className='h-6 w-auto cursor-pointer hover:opacity-80 transition-opacity'
                    onClick={() => navigate('/')}
                />
                <button
                    onClick={toggleMobileMenu}
                    className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className='lg:hidden w-full bg-white shadow-lg border-t'>
                    <div className='p-4 space-y-4'>
                        <div className='flex items-center mb-4'>
                            <div className='font-normal flex items-center justify-center rounded-lg text-sm font-inter bg-lightBlue p-3 w-10 text-white'>S</div>
                            <div className='ml-3 flex flex-col items-start justify-center'>
                                <p className='font-semibold text-sm text-semiLightBlack'>Shubham</p>
                                <p className='font-normal text-xs text-semiLightBlack'>link.v1ce.co/gzamoplr</p>
                            </div>
                        </div>

                        <div className='space-y-3'>
                            <h1 className='font-medium text-xs leading-3 text-semiLightBlack'>HOME</h1>
                            <div
                                onClick={() => {
                                    navigate('/my-cards');
                                    setIsMobileMenuOpen(false);
                                }}
                                className='cursor-pointer flex items-center hover:bg-gray-100 p-3 rounded-lg transition-colors'
                            >
                                <img src={star} alt='home' className='inline mr-2' />
                                <p className='font-normal text-sm text-semiBlack'>My Digital Cards</p>
                            </div>
                            <div
                                onClick={() => {
                                    navigate('/template');
                                    setIsMobileMenuOpen(false);
                                }}
                                className='cursor-pointer flex items-center hover:bg-gray-100 p-3 rounded-lg transition-colors'
                            >
                                <img src={envelop} alt='home' className='inline mr-2' />
                                <p className='font-normal text-sm text-semiBlack'>Choose Template</p>
                            </div>

                            <h1 className='font-medium text-xs leading-3 text-semiLightBlack mt-6'>HELP</h1>
                            <div className='cursor-pointer flex items-center hover:bg-gray-100 p-3 rounded-lg transition-colors'>
                                <img src={question} alt='home' className='inline mr-2' />
                                <p className='font-normal text-sm text-semiBlack'>HELP</p>
                            </div>
                        </div>

                        <div className='pt-4 border-t'>
                            <BlueTransparentButton label="Logout" onClick={() => {
                                handleLogout();
                                setIsMobileMenuOpen(false);
                            }} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Asidebar