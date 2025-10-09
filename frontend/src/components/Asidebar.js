import logo from '../assets/logo.svg'
import envelop from '../assets/envelop.svg'
import star from '../assets/star.svg'
import question from '../assets/question.svg'
import BlueTransparentButton from './buttons/BlueTransparentButton'
import { useNavigate } from 'react-router-dom'

const Asidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("Logging out...");
        localStorage.removeItem("token");
        navigate("/login");
    };
    return (
        <div className='w-[20vw] py-10 shadow-md'>
            <img src={logo} alt="logo" className='h-7 w-54 m-4' />
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
    )
}

export default Asidebar