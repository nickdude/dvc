import { useNavigate } from "react-router-dom";
import PreviewCardOne from '../components/PreviewCardOne'
import PreviewCardTwo from '../components/PreviewCardTwo'

const TemplatePage = () => {
    const navigate = useNavigate();
    return (
        <div className='w-100 flex items-center flex-col justify-center py-20'>
            <h2 className='text-4xl font-semibold font-inter leading-10'>Pick a Card Template</h2>
            <p className='text-base font-normal leading-5 font-inter mt-2 text-lightGrey'>Choose a digital business card template that matches your brand and style.</p>
            <div className='w-100 flex items-center justify-center gap-8 flex-wrap mt-8 px-4'>
                <div
                    className="cursor-pointer"
                    onClick={() => navigate("/dashboard/1")}>
                    <PreviewCardOne />
                </div>
                <div
                    className="cursor-pointer"
                    onClick={() => navigate("/dashboard/2")}>
                    <PreviewCardTwo />
                </div>
            </div>

        </div>
    )
}

export default TemplatePage