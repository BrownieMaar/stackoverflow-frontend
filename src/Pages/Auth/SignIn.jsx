import { useState } from "react"
import { useNavigate } from "react-router-dom";
import "./AuthPages.css"

export default function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/user/auth?name=${username}&password=${password}`);
        try {
            const data = await res.json();
            window.currentUser = data;
            history.back();
        } catch (error) {
            alert("Failed!"); // TODO: értelmesen
        }

    }

    return <>
        <h1>Sign in to<br /><i>Stackoverflow++</i></h1>
        <div className="authcard">
            <form>
                <div className="label">Username</div>
                <div><input type="text" onInput={e => setUsername(e.target.value)} /></div>

                <div className="label">Password</div>
                <div><input type="password" onInput={e => setPassword(e.target.value)} /></div>

                <button type="submit" className="authbutton" onClick={handleSubmit}>Sign in</button>
            </form>
        </div>
    </>
}