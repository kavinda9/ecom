import BottomNav from "./BottomNav";
import TopNav from "./TopNav";

function Nav() {
    return(
        <div className="flex flex-col justify-between bg-white p-3 gap-y-3 rounded-lg">
            <TopNav/>
            <BottomNav/>
        </div>
    );
}

export default Nav;