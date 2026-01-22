import { useNavigate } from 'react-router-dom';
import down from '../../../assets/nav/down-icon.png';
function PagesList() {

    const listClass = 'flex flex-row items-center font-bold gap-x-3 cursor-pointer';

    const navigate = useNavigate();

    return(
        <ol type="none" className='hidden lg:flex flex-row lg:w-90  justify-between'>
            <li className={listClass} onClick={() => navigate('/')}>
                <div className='text-xs'>HOMES</div>
                <img className='size-2' src={down} alt="Down icon" />
            </li>
            <li className={listClass}>
                <div className='text-xs'>PAGES</div>
                <img className='size-2' src={down} alt="Down icon" />
            </li>
            <li onClick={() => navigate('/products')} className={listClass}>
                <div  className='text-xs'>PRODUCTS</div>
                <img className='size-2' src={down} alt="Down icon" />
            </li>
            <li className={listClass}>
                <div className='text-xs'>CONTACT</div>
                <img className='size-2' src={down} alt="Down icon" />
            </li>
        </ol>
    );
}

export default PagesList;