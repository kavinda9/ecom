import { useContext, useEffect } from "react";
import HomeSection from "../components/homesection/HomeSection";
import Nav from "../components/nav/Nav";
import { AppCotext } from "../context/AppContext";
import Footer from "../components/footer/Footer";
import Search from "../components/Search/Search";


function Home() {

    const {isSeller, isLoggedin, getUserData, getSellerData, getCartData} = useContext(AppCotext);

    useEffect(() => {
        getSellerData();
        getUserData();
        getCartData();
    },[]);

    return(
        <div className="flex flex-col m-3">
            <Nav />
            <Search />
            <HomeSection/>
            <Footer/>
        </div>
    );
}

export default Home;