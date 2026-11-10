import { NavLink, Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout() {
    return (
        <>
            <Header />

            <nav>
                <NavLink to="/employees">Employees</NavLink>
                {" | "}
                <NavLink to="/organization">Organization</NavLink>
            </nav>

            <Outlet />

            <Footer />
        </>
    );
}