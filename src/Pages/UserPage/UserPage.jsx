import { useNavigate, useParams } from "react-router-dom";
import UserAvatar from "../../Components/UserAvatar";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import "./UserPage.css";
import QARatio from "../../Components/QARatio";

export default function UserPage() {
  const { id } = useParams();
  const [userPageDTO, setUserPageDTO] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/user/" + id);
      const data = await response.json();
      setUserPageDTO(data);
    }
    fetchData();
  }, []);

  const signOut = () => {
    window.currentUser = null;
    history.back();
  }

  return userPageDTO ? (
    <>
      <div className="user-card">
        <div className="user-avatar">
          <UserAvatar username={userPageDTO.name} isBigSize />
        </div>
        <div className="user-details">
          <div className="user-name">{userPageDTO.name}</div>
          <div className="user-registration">Joined: <i>{new Date(userPageDTO.registration).toLocaleString()}</i></div>
          <div>Q/A: <QARatio user={userPageDTO} span /> </div>
        </div>
      </div>

      <div className="options">
        <div className="button clickable">Questions</div>
        <div className="button clickable">Answers</div>
        {window.currentUser && window.currentUser.id === userPageDTO.id ? <div className="button clickable" onClick={signOut}>Sign Out</div> : <></> }
      </div>
    </>
  ) : (
    <Loading />
  );
}
