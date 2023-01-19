import { Outlet, useNavigate } from "react-router-dom";
import "./Layout.css"

export default function Layout() {
    const navigate = useNavigate();

    return <>
        <header>
            <div className="logo clickable" onClick={() => navigate("/")}>Stackoverflow++</div>
            <div className="clickable" onClick={() => navigate("/users")}>Users</div>
            {
                window.currentUser ?
                    <>
                        <div className="clickable" onClick={() => navigate("/new")}>New Question</div>
                        <div className="clickable" onClick={() => navigate("/user/" + window.currentUser.id)}>{window.currentUser.name}'s Profile</div>
                    </> :
                    <>
                        <div className="clickable" onClick={() => navigate("/signin")}>Sign in</div>
                        <div className="clickable" onClick={() => navigate("/register")}>Register</div>
                    </>

            }
        </header>
        <Outlet />
    </>
}