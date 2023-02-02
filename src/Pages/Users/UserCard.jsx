import { useNavigate } from "react-router-dom";
import QARatio from "../../Components/QARatio";
import UserAvatar from "../../Components/UserAvatar";

export default function UserCard({ userDTO }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: `radial-gradient(ellipse at center, ${userDTO.colorHex} 70%, black 185%)`,
      }}
      className="usercard"
      onClick={() => navigate("/user/" + userDTO.id)}
    >
      <UserAvatar user={userDTO} />

      <b>{userDTO.name}</b>

      <QARatio user={userDTO} />
    </div>
  );
}
