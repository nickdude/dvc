import { FaStar } from 'react-icons/fa'
import test1 from '../assets/testinomial.svg'
import per1 from '../assets/per1.svg'
import left from '../assets/left.svg'
import right from '../assets/right.svg'

const TrustedBy = () => {
    return (
        <div id="reviews" className='w-100 h-[100vh] flex flex-col items-center px-4 bg-darkGrey'>
            <h1 className='font-semibold text-4xl font-inter my-20'>Trusted by Modern Professionals</h1>
            <div className='w-100 flex items-center justify-center gap-8 flex-wrap mt-8 px-4'>
                <div className='w-[528px] h-96 bg-blue-700 rounded-lg flex items-center justify-center'>
                    <img src={test1} alt='floating' className='cover' />
                </div>

                <div className='w-[528px] h-96 bg-white rounded-lg flex flex-col'>
                    <div className='w-[500px] h-80 rounded-lg flex flex-col items-start gap-4 p-6'>
                        <div className='flex items-center gap-2 '>
                            <FaStar className="text-lightBlue text-lg" />
                            <FaStar className="text-lightBlue text-lg" />
                            <FaStar className="text-lightBlue text-lg" />
                            <FaStar className="text-lightBlue text-lg" />
                            <FaStar className="text-lightBlue text-lg" />
                        </div>
                        <p className='font-medium text-2xl font-inter text-black'>"My entire executive leadership team
                            uses AnurTech."</p>
                        <p className='font-normal text-sm font-inter text-black'>I’ve created AnurTech digital business cards for my company's
                            executive leadership and had a wonderful experience doing it -
                            great product, service, and value. I highly recommend it!</p>
                    </div>
                    <div className='w-[528px] h-20 rounded-lg flex items-center gap-4 p-6 mt-4 bg-shadowGrey'>
                        <img src={per1} alt='floating' className='w-12 h-12 rounded-full' />
                        <div className='flex flex-col items-start'>
                            <p className='font-bold text-lg font-inter text-black'>Philip Smith,</p>
                            <p className='font-normal text-base font-inter text-mediumGrey leading-4'>Communications Manager<br />
                                Chick-fil-A</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-[75vw] flex items-center justify-end gap-8 mt-8 px-4 mb-20'>
                <button className=' border border-lightBlue px-4 py-3 rounded-md'><img src={left} alt='left' /></button>
                1 / 5
                <button className=' border border-lightBlue px-4 py-3 rounded-md'><img src={right} alt='right' /></button>
            </div>

        </div>
    )
}

export default TrustedBy