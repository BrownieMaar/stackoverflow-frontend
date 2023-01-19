import { useNavigate, useParams } from "react-router-dom";
import UserAvatar from "../../Components/UserAvatar";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import "./UserPage.css";
import QuestionsOption from "./QuestionsOption";
import AnswersOption from "./AnswersOption";

export default function UserPage() {
  const { id } = useParams();
  const [userPageDTO, setUserPageDTO] = useState(null);
  const [activeOption, setActiveOption] = useState("Questions");
  const navigate = useNavigate();

  function handleOptions(e) {
    e.target.innerText === "Questions"
      ? setActiveOption("Questions")
      : setActiveOption("Answers");
  }

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
  };

  return userPageDTO ? (
    <>
      <div className="user-card">
        <div className="user-avatar">
          <UserAvatar username={userPageDTO.name} isBigSize />
        </div>
        <div className="user-details">
          <div className="user-name">{userPageDTO.name}</div>
          <div className="user-registration">
            Joined: <i>{new Date(userPageDTO.registration).toLocaleString()}</i>
          </div>
          <div>
            Q/A:{" "}
            <span className="qa-ratio">
              <span>{userPageDTO.questions}</span> /{" "}
              <span>{userPageDTO.answers}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="options">
        <div className="button clickable" onClick={(e) => handleOptions(e)}>
          Questions
        </div>
        <div className="button clickable" onClick={(e) => handleOptions(e)}>
          Answers
        </div>
        {window.currentUser && window.currentUser.id === userPageDTO.id ? (
          <div className="button clickable" onClick={signOut}>
            Sign Out
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="user-option">
        {activeOption === "Questions" ? (
          <QuestionsOption user={userPageDTO} />
        ) : (
          <AnswersOption user={userPageDTO} />
        )}
      </div>
    </>
  ) : (
    <Loading />
  );
}
