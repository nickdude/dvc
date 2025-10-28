import logo from '../assets/logo.jpeg';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className='w-full bg-darkGrey px-4 sm:px-6 lg:px-8 py-12 lg:py-16'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex flex-col lg:flex-row justify-between gap-12 lg:gap-24'>
                    {/* Left Section - Company Info */}
                    <div className='flex flex-col items-start gap-4 lg:max-w-md'>
                        <img src={logo} alt='logo' className='h-6 sm:h-14 w-auto' />
                        <p className='text-sm text-black font-normal font-inter tracking-[-0.15px]'>© 2025 Instaviz pvt ltd.</p>

                        <div className='mt-4'>
                            <h1 className='text-black font-bold text-sm leading-5 mb-2'>Address</h1>
                            <p className='text-black font-inter text-sm leading-5'>
                                5th Floor, Temple Tower,<br />
                                672 Anna Salai, Nandanam,<br />
                                Chennai, TN 600 035
                            </p>
                        </div>

                        <div className='mt-4'>
                            <h1 className='text-black font-bold text-sm leading-5 mb-2'>Contact</h1>
                            <p className='text-black font-inter text-sm leading-5 underline'>hello@instaviz.com</p>
                        </div>

                        <div className="flex space-x-4 items-start text-xl sm:text-2xl text-black mt-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors"><FaFacebookF /></a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors"><FaInstagram /></a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors"><FaLinkedinIn /></a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors"><FaYoutube /></a>
                        </div>
                    </div>

                    {/* Right Section - Menu Links */}
                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 lg:gap-16'>
                        <div>
                            <h1 className='text-black font-bold text-sm leading-5 mb-4'>Features</h1>
                            <div className='space-y-3'>
                                <p className='text-black font-inter text-sm leading-5 hover:text-blue-600 cursor-pointer transition-colors'>Features</p>
                                <p className='text-black font-inter text-sm leading-5 hover:text-blue-600 cursor-pointer transition-colors'>Website</p>
                                <p className='text-black font-inter text-sm leading-5 hover:text-blue-600 cursor-pointer transition-colors'>Business card</p>
                                <p className='text-black font-inter text-sm leading-5 hover:text-blue-600 cursor-pointer transition-colors'>Link in bio</p>
                            </div>
                        </div>

                        <div>
                            <h1 className='text-black font-bold text-sm leading-5 mb-4'>Pricing</h1>
                            <div className='space-y-3'>
                                <p className='text-black font-inter text-sm leading-5 hover:text-blue-600 cursor-pointer transition-colors'>Pricing</p>
                                <p className='text-black font-inter text-sm leading-5 hover:text-blue-600 cursor-pointer transition-colors'>Pro</p>
                                <p className='text-black font-inter text-sm leading-5 hover:text-blue-600 cursor-pointer transition-colors'>Teams</p>
                                <p className='text-black font-inter text-sm leading-5 hover:text-blue-600 cursor-pointer transition-colors'>Enterprise</p>
                            </div>
                        </div>

                        <div>
                            <h1 className='text-black font-bold text-sm leading-5 mb-4'>Company</h1>
                            <div className='space-y-3'>
                                <p className='text-black font-inter text-sm leading-5 hover:text-blue-600 cursor-pointer transition-colors'>Home</p>
                                <p className='text-black font-inter text-sm leading-5 hover:text-blue-600 cursor-pointer transition-colors'>About Us</p>
                                <p className='text-black font-inter text-sm leading-5 hover:text-blue-600 cursor-pointer transition-colors'>Contact us</p>
                                <p className='text-black font-inter text-sm leading-5 hover:text-blue-600 cursor-pointer transition-colors'>Affiliate program</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer