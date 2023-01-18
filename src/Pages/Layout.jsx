import { Outlet, useNavigate } from "react-router-dom";
import "./Layout.css"

export default function Layout() {
    const navigate = useNavigate();

    return <>
        <header>
            <div className="logo clickable" onClick={() => navigate("/")}>Stackoverflow++</div>
            <div className="clickable">Users</div>
        </header>
        <Outlet />
    </>
}