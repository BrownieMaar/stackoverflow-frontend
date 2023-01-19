import { useNavigate } from "react-router-dom";
import QARatio from "../../Components/QARatio";
import UserAvatar from "../../Components/UserAvatar";

export default function UserCard({ userDTO }) {
    const navigate = useNavigate();

    return <div className="usercard" onClick={() => navigate("/user/" + userDTO.id)}>

        <UserAvatar username={userDTO.name} />

        <b>{userDTO.name}</b>

        <QARatio user={userDTO} />
    </div>
}