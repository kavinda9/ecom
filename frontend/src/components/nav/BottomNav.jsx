import CartDiv from "./custom/CartDiv";
import LoginRegi from "./custom/LoginRegi";
import Logo from "./custom/Logo";
import PagesList from "./custom/PagesList";

function BottomNav() {
    return(
        <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-between w-xl">
                <Logo/>
                <PagesList/>
            </div>
            <div className="flex flex-row justify-evenly items-center w-sm">
                <LoginRegi/>
                <CartDiv/>
            </div>
        </div>
    );
}

export default BottomNav;