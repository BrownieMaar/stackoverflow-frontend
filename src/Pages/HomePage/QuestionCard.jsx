import { useNavigate } from "react-router-dom";
import UserAvatar from "../../Components/UserAvatar";
import Vote from "../../Components/Vote";
import { timeDifferenceFormatter } from "../../Tools/timeDifferenceFormatter";
import "./Question.css";

export default function QuestionCard({ question, refresh }) {
  const navigate = useNavigate();

  return (
    <div
      style={{ backgroundColor: `${question.user.colorhex}`, color: "white" }}
      className="card clickable"
    >
      <div
        className="username"
        onClick={() => navigate("/user/" + question.user.id)}
      >
        <UserAvatar username={question.user.name} />
        <p>{question.user.name}</p>
      </div>
      <div
        className="question"
        onClick={() => navigate("/question/" + question.id)}
      >
        <h2>{question.title}</h2>
        <div className="question-infos">
          <p>
            <Vote card={question} refresh={refresh} />
          </p>
          <p>Answers: {question.answerCount}</p>
          <p title={new Date(question.created).toLocaleString()}>
            {timeDifferenceFormatter(new Date(question.created))}
          </p>
        </div>
      </div>
    </div>
  );
}
