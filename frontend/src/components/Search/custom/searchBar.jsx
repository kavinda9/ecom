import { assets } from '../../../assets/nav/assests';
import serach from '../../../assets/serach/Symbol.png';

function SearchBar() {
    return(
        <div className='flex items-center bg-white rounded-full overflow-hidden w-full'>
            <div className='flex items-center px-4 text-black font-semibold text-sm whitespace-nowrap'>
                All Categories
                <img src={assets.downIcon} className="w-3 ml-4" />
            </div>
            <input type="text" placeholder='Serach anything...' className='flex-1 px-2 py-2 text-sm text-gray-700 focus:outline-none' />
            <button className='px-4 text-black'>
                <img src={serach} alt="Search Bar" />
            </button>
        </div>
    );
}

export default SearchBar;