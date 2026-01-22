import downIcon from '../../../assets/nav/down-icon.png';
import en from '../../../assets/nav/en.png'

function RegionLanguageButton() {
    return(
        <div className='flex flex-row w-[120px] relative justify-between items-center'>
            <div className='flex flex-row justify-between items-center w-10'>
                <div className='text-sm'>SL</div>
                <div >
                    <img src={downIcon} alt="Down Icon" className='w-2.5' />
                </div>
            </div>
            <div className='text-[20px] text-gray-400 absolute left-12 top-[-8px]'>|</div>
            <div className='flex flex-row justify-start gap-1.5 items-center'>
                <img src={en} alt="Languge icon"/>
                <div className='text-sm'>Eng</div>
                <img src={downIcon} alt="Down Icon" className='w-2.5 h-2.5' />
            </div>
        </div>
    );
}

export default RegionLanguageButton;