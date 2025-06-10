import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

// console.log ("999 before entering AppLayout");
function AppLayout () {
    // console.log ("999 Entering AppLayout")
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default AppLayout;