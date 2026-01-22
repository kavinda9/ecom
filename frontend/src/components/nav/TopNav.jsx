import RegionLanguageButton from './custom/RegionLanguageButton';

function TopNav() {
    return(
        <div className='flex flex-row justify-between'>
            <div className='flex flex-row w-[220px] justify-between items-center'>
                <button className='text-sm rounded-sm w-[100px] h-[30px] bg-gray-200 cursor-pointer'>Hotline 24/7</button>
                <div className='text-sm font-semibold'>0112 456 789</div>
            </div>
            <div className='flex flex-row w-[350px] justify-end sm:justify-between sm:items-center'>
                <div className='text-sm hidden sm:block'>Sell on Kade.lk</div>
                <div className='text-sm hidden sm:block'>Order Track</div>
                <RegionLanguageButton/>
            </div>
            
        </div>
    );
}

export default TopNav;