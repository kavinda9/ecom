import SearchBar from "./custom/SearchBar";


function Search() {
    return(
        <div className="bg-[#1ABA1A] mt-3 rounded-md px-4 py-3 text-white ">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">

                {/* serach bar */}
                <SearchBar />

                {/* Promo Messages */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 text-sm sm:text-sm text-white text-center">
                    <div>FREE SHOPPING OVER RS.1000</div>
                    <div>30 DAYS MONEY BACK</div>
                    <div>100% SECURE PAYMENT</div>
                </div>
            </div>
            
        </div>
    );
}

export default Search;