import { useParams } from "react-router-dom";
import UserAvatar from "../../Components/UserAvatar";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import "./UserPage.css";

export default function UserPage() {
  const { id } = useParams();
  const [userPageDTO, setUserPageDTO] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/user/" + id);
      const data = await response.json();
      setUserPageDTO(data);
    }
    fetchData();
  }, []);

  return userPageDTO ? (
    <>
    <div className="user-card">
      <div className="user-avatar">
        <UserAvatar username={userPageDTO.name} isBigSize />
      </div>
      <div className="user-details">
      <div className="user-name">{userPageDTO.name}</div>
      <div className="user-registration">Joined: <i>{userPageDTO.registration.split("T").join(" ")}</i></div>
      <div className="user-questions">Questions: <i>{userPageDTO.questions}</i></div>
      <div className="user-answers">Answers: <i>{userPageDTO.answers}</i></div>
      </div>
    </div>
    
    <div className="options">
    <div className="questions-button clickable">Questions</div>
    <div className="answers-button clickable">Answers</div>
    </div>
    </>
  ) : (
    <Loading />
  );
}
