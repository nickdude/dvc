import wifi from '../assets/wifi.svg'
import note from '../assets/note.svg'
import leaf from '../assets/leaf.svg'

const Why = () => {
    return (
        <div id="why-digital" className='w-100 h-[58vh] flex items-center justify-center bg-black text-white flex-col'>
            <h2 className='text-5xl font-semibold font-inter leading-10'>Why should you switch to digital business cards?</h2>
            <div className='w-90 h-48 mt-28 flex items-center justify-center gap-10'>
                <div className='flex flex-col items-center justify-center text-center px-4 w-1/4 '>
                    <img src={wifi} alt='wifi' className='h-12 w-20' />
                    <h3 className='text-xl font-semibold font-inter mt-4'>Tap to Share. No App Needed.</h3>
                    <p className='text-sm font-normal leading-5 font-inter mt-2 text-greyBlack'>With built-in NFC, share your contact details just by tapping your card to a smartphone. Works across most iOS and Android devices without needing an app.</p>
                </div>
                <div className='flex flex-col items-center justify-center text-center px-4 w-1/4'>
                    <img src={note} alt='note' className='h-12 w-20' />
                    <h3 className='text-xl font-semibold font-inter mt-4'>100% Customizable Cards</h3>
                    <p className='text-sm font-normal font-inter mt-2 text-greyBlack'>Update your contact information
                        or professional details before any
                        event without the hassles of re-
                        printing.</p>
                </div>
                <div className='flex flex-col items-center justify-center text-center px-4 w-1/4'>
                    <img src={leaf} alt='leaf' className='h-12 w-20' />
                    <h3 className='text-xl font-semibold font-inter mt-4'>Eco-Friendly + Always Updated</h3>
                    <p className='text-sm font-normal font-inter mt-2 text-greyBlack'>No more paper waste. No more reprints. You can update your details anytime — your card stays current forever.</p>
                </div>

            </div>

        </div>
    )
}

export default Why