import { useNavigate } from 'react-router-dom';
import cart from '../../../assets/nav/Cart.png';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AppCotext } from '../../../context/AppContext';

function CartDiv() {

    const navigate = useNavigate();
    const {cartData, getCartData, isSeller} = useContext(AppCotext);

    useEffect(() => {
        getCartData();
    },[cartData])

    return(
        <div className='flex flex-row w-[50px] lg:w-[177px]  items-center justify-evenly relative cursor-pointer' onClick={() => !isSeller ? navigate('/cart') : navigate('/dashboard')}>
            <img src={cart} alt="Cart icon" className='cursor-pointer' />
            <div className='hidden lg:flex flex-col justify-evenly'>
                <div className='text-xs'>{isSeller ? 'SHOP' : 'CART'}</div>
                <div className='font-bold'>
                    {
                        cartData?.items
                        ? (cartData.items.reduce((total, item) => total + item.quantity * item.price, 0))
                            .toLocaleString("en-LK", { style: "currency", currency: "LKR" })
                        : 'Rs.0.00'
                    }
                </div>
            </div>
            {
                cartData.items && 
                <div className='font-xs absolute flex justify-center items-center rounded-2xl bg-green-600 size-5 text-white left-10 top-6 cursor-pointer'>
                    <div>
                        {
                            cartData?.items?.reduce((total, item) => total + item.quantity, 0)
                        }
                    </div>
                </div>
            }
            
        </div>
    );
}

export default CartDiv;