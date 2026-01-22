import LogoImg from '../../../assets/nav/k-logo.png';

function Logo() {
    return (
        <div className='flex flex-row w-42 justify-between cursor-pointer'>
            <img src={LogoImg} alt="Logo" />
            <div className='flex flex-col justify-evenly' >
                <div className='font-bold text-2xl'>KADE.LK</div>
                <div className='text-1xl text-gray-700'>EveryThing</div>
            </div>
        </div>
    );
}

export default Logo;