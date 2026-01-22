import { useContext, useEffect } from 'react';
import profile from '../../../assets/nav/Link.png'
import { AppCotext } from '../../../context/AppContext';
import { useNavigate } from 'react-router-dom';

function LoginRegi() {

    const { userData, isLoggedin, getUserData, isSeller, getSellerData} = useContext(AppCotext);

    const navigate = useNavigate();

    useEffect(() => {
        getSellerData();
        getUserData();
    },[]);

    return(
        <div className='flex  flex-row w-[41px] lg:w-[177px] items-center justify-between cursor-pointer' onClick={() => { 
                if (isLoggedin && !isSeller) {
                    navigate('/profile');
                }else if(isSeller) {
                    navigate('/profile');
                }else {
                    navigate('/login') 
                }
            } }>
            <img src={profile} alt="Profile icon" className='cursor-pointer' />
            <div className='hidden lg:flex flex-col justify-evenly'>
                <div className='text-xs text-gray-600'>{isLoggedin ? userData.name || userData.contactName : "WELCOME"}</div>
                {isLoggedin ? <div className='text-sm font-bold text-green-500' > {userData.contactName ? "Seller" : "Online"}</div> : <div className='text-sm font-bold' >LOG IN / REGISTER</div>}
            </div>
        </div>
    )
}

export default LoginRegi;