import logo from '../assets/logo.svg';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className='w-100% h-96 bg-darkGrey flex justify-center gap-96'>
            <div className='flex flex-col items-start justify-center h-full gap-4'>
                <img src={logo} alt='logo' className='h-7 w-54' />
                <p className='text-sm text-black font-normal font-inter tracking-[-0.15px]'>© 2025 anurtech pvt ltd.</p>
                <h1 className='text-black font-bold text-sm leading-5'>Address</h1>
                <p className='text-black font-inter text-sm leading-5'>5th Floor, Temple Tower,
                    672 Anna Salai, Nandanam,<br />
                    Chennai, TN 600 035</p>
                <h1 className='text-black font-bold text-sm leading-5'>Contact</h1>
                <p className='text-black font-inter text-sm leading-5 underline'>hello@anurtech.com</p>
                <div className="flex space-x-4 items-start text-2xl text-black">
                    <a href="https://facebook.com" target="_blank" className="hover:text-blue-600"><FaFacebookF /></a>
                    <a href="https://instagram.com" target="_blank" className="hover:text-pink-500"><FaInstagram /></a>
                    <a href="https://linkedin.com" target="_blank" className="hover:text-blue-700"><FaLinkedinIn /></a>
                    <a href="https://youtube.com" target="_blank" className="hover:text-red-600"><FaYoutube /></a>
                </div>

            </div>
            <div className='flex justify-start gap-16 mt-14'>
                <div>
                    <h1 className='text-black font-bold text-sm leading-5'>Menu 1</h1>
                    <p className='text-black font-inter text-sm leading-5 mt-3'>Features</p>
                    <p className='text-black font-inter text-sm leading-5 mt-3'>Website</p>
                    <p className='text-black font-inter text-sm leading-5 mt-3'>Business card</p>
                    <p className='text-black font-inter text-sm leading-5 mt-3'>Link in bio</p>
                </div>
                <div>
                    <h1 className='text-black font-bold text-sm leading-5'>Menu 2</h1>
                    <p className='text-black font-inter text-sm leading-5 mt-3'>Pricing</p>
                    <p className='text-black font-inter text-sm leading-5 mt-3'>Pro</p>
                    <p className='text-black font-inter text-sm leading-5 mt-3'>Teams</p>
                    <p className='text-black font-inter text-sm leading-5 mt-3'>Enterprise</p>
                </div>
                <div>
                    <h1 className='text-black font-bold text-sm leading-5'>Menu 3</h1>
                    <p className='text-black font-inter text-sm leading-5 mt-3'>Home</p>
                    <p className='text-black font-inter text-sm leading-5 mt-3'>About Us</p>
                    <p className='text-black font-inter text-sm leading-5 mt-3'>Contact us</p>
                    <p className='text-black font-inter text-sm leading-5 mt-3'>Affiliate program</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer