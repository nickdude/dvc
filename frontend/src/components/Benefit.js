import closeIcon from '../assets/close.svg';
import tick from '../assets/tick.svg';
import BlueButton from './buttons/BlueButton';
import oldCard from '../assets/old_card.svg';
import newCard from '../assets/new_card.svg';
import { Link } from 'react-router-dom';

const Benefit = () => {
    return (
        <div id="paper-vs-digital" className='w-100 flex items-center flex-col justify-center py-20'>
            <h2 className='text-4xl font-semibold font-inter leading-10'>Benefits of Our Digital NFC Card</h2>
            <p className='text-base font-normal leading-5 font-inter mt-2 text-lightGrey'>The smarter, modern alternative to traditional business cards.</p>
            <div className='w-100 flex items-center justify-center gap-8 flex-wrap mt-8 px-4 mb-10'>
                {/* <div className=' bg-darkGrey rounded-xl flex flex-col items-center  gap-4 cursor-pointer hover:shadow-custom p-4'>
                    <h3 className='text-xl font-semibold text-black text-center'>Paper Business Card</h3>
                    <div className='flex flex-col items-start gap-2'>
                        <div className='w-[35vw] min-h-[395px] bg-white rounded-lg p-4 flex flex-col items-start gap-2'>
                            <div className='flex items-center gap-2'>
                                <img src={closeIcon} alt='card1' className='w-5 h-5 rounded-t-xl' />
                                <h1 className='text-base font-medium text-lightGrey'>Shares just the basics</h1>
                            </div>
                            <p className='text-sm font-normal ml-7 text-lightGrey mb-2'>Name, Number, Website.</p>

                            <div className='flex items-center gap-2'>
                                <img src={closeIcon} alt='card1' className='w-5 h-5 rounded-t-xl' />
                                <h1 className='text-base font-medium text-lightGrey'>Limited Sharing</h1>
                            </div>
                            <p className='text-sm font-normal ml-7 text-lightGrey'>Needs to be handed over physically.</p>

                            <div className='flex items-center gap-2'>
                                <img src={closeIcon} alt='card1' className='w-5 h-5 rounded-t-xl' />
                                <h1 className='text-base font-medium text-lightGrey'>Hard to Update</h1>
                            </div>
                            <p className='text-sm font-normal ml-7 text-lightGrey'>Changes need reprinting.</p>

                            <div className='flex items-center gap-2'>
                                <img src={closeIcon} alt='card1' className='w-5 h-5 rounded-t-xl' />
                                <h1 className='text-base font-medium text-lightGrey'>Limited Info Space</h1>
                            </div>
                            <p className='text-sm font-normal ml-7 text-lightGrey'>Only basic text fits.</p>
                        </div>
                    </div>
                </div> */}

                <div className="relative bg-darkGrey rounded-xl flex flex-col items-center gap-4 cursor-pointer hover:shadow-custom p-4">
                    <h3 className="text-xl font-semibold text-black text-center">
                        Paper Business Card
                    </h3>
                    <div className="flex flex-col items-start gap-2">
                        <div className="w-[35vw] min-h-[395px] bg-white rounded-lg p-4 flex flex-col items-start gap-2">
                            <div className="flex items-center gap-2">
                                <img src={closeIcon} alt="card1" className="w-5 h-5 rounded-t-xl" />
                                <h1 className="text-base font-medium text-lightGrey">
                                    Shares just the basics
                                </h1>
                            </div>
                            <p className="text-sm font-normal ml-7 text-lightGrey mb-2">
                                Name, Number, Website.
                            </p>

                            <div className="flex items-center gap-2">
                                <img src={closeIcon} alt="card1" className="w-5 h-5 rounded-t-xl" />
                                <h1 className="text-base font-medium text-lightGrey">Limited Sharing</h1>
                            </div>
                            <p className="text-sm font-normal ml-7 text-lightGrey">
                                Needs to be handed over physically.
                            </p>

                            <div className="flex items-center gap-2">
                                <img src={closeIcon} alt="card1" className="w-5 h-5 rounded-t-xl" />
                                <h1 className="text-base font-medium text-lightGrey">Hard to Update</h1>
                            </div>
                            <p className="text-sm font-normal ml-7 text-lightGrey">
                                Changes need reprinting.
                            </p>

                            <div className="flex items-center gap-2">
                                <img src={closeIcon} alt="card1" className="w-5 h-5 rounded-t-xl" />
                                <h1 className="text-base font-medium text-lightGrey">
                                    Limited Info Space
                                </h1>
                            </div>
                            <p className="text-sm font-normal ml-7 text-lightGrey">
                                Only basic text fits.
                            </p>
                        </div>
                    </div>

                    {/* Floating Image */}
                    <img
                        src={oldCard}
                        alt="floating"
                        className="absolute -bottom-8 -left-64 translate-x-1/2 translate-y-1/2 w-80 h-80"
                    />
                </div>


                <div className='relative bg-lightBlue rounded-xl flex flex-col items-center justify-center gap-4 cursor-pointer hover:shadow-custom p-4'>
                    <h3 className='text-xl font-semibold text-white text-center'>Our Digital NFC Card</h3>
                    <div className='flex flex-col items-start gap-2'>
                        <div className='w-[35vw] min-h-[395px] bg-white rounded-lg p-4 flex flex-col items-start gap-2'>
                            <div className='flex items-center gap-2'>
                                <img src={tick} alt='card1' className='w-5 h-5 rounded-t-xl' />
                                <h1 className='text-base font-medium text-lightGrey'>Instant Sharing in one Tap</h1>
                            </div>
                            <p className='text-sm font-normal ml-7 text-lightGrey mb-2'>Tap, scan, or send via link anytime.</p>

                            <div className='flex items-center gap-2'>
                                <img src={tick} alt='card1' className='w-5 h-5 rounded-t-xl' />
                                <h1 className='text-base font-medium text-lightGrey'>Edit your card anytime</h1>
                            </div>
                            <p className='text-sm font-normal ml-7 text-lightGrey'>Edit your info anytime without extra cost..</p>

                            <div className='flex items-center gap-2'>
                                <img src={tick} alt='card1' className='w-5 h-5 rounded-t-xl' />
                                <h1 className='text-base font-medium text-lightGrey'>Eco-Friendly</h1>
                            </div>
                            <p className='text-sm font-normal ml-7 text-lightGrey'>100% digital, zero waste.</p>

                            <div className='flex items-center gap-2'>
                                <img src={tick} alt='card1' className='w-5 h-5 rounded-t-xl' />
                                <h1 className='text-base font-medium text-lightGrey'>Unlimited Info</h1>
                            </div>
                            <p className='text-sm font-normal ml-7 text-lightGrey'>Add links, videos, social media & more.</p>

                            <div className='flex items-center gap-2'>
                                <img src={tick} alt='card1' className='w-5 h-5 rounded-t-xl' />
                                <h1 className='text-base font-medium text-lightGrey'>Cost-Effective</h1>
                            </div>
                            <p className='text-sm font-normal ml-7 text-lightGrey'>One-time setup, no ongoing print costs.</p>

                            <div className='flex items-center gap-2'>
                                <img src={tick} alt='card1' className='w-5 h-5 rounded-t-xl' />
                                <h1 className='text-base font-medium text-lightGrey'>Modern & Impressive</h1>
                            </div>
                            <p className='text-sm font-normal ml-7 text-lightGrey'>Stand out with a sleek, smart card.</p>
                        </div>
                    </div>

                    <img
                        src={newCard}
                        alt="floating"
                        className="absolute -bottom-8 left-40 translate-x-1/2 translate-y-1/2 w-80 h-80"
                    />
                </div>
            </div>

            <Link to="/register"><BlueButton label='Get Yours Now' /></Link>
        </div>
    )
}

export default Benefit