import { useNavigate } from "react-router-dom"
import UserAvatar from "../../Components/UserAvatar";
import "./Question.css"

export default function QuestionCard({ question }) {
    const navigate = useNavigate();

    const timeDifferenceFormatter = date => {
        const relativeTimeFormatter = new Intl.RelativeTimeFormat('en', { numeric: "auto" });
        const now = new Date();
        const diffType = Math.abs(date - now) > 1000 * 60 * 60 * 24 ? "days" : Math.abs(date - now) > 1000 * 60 * 60 ? "hours" : "minutes";
        const dateDiff = diffType === "days" ? (date - now) / 1000 / 60 / 60 / 24 : diffType === "hours" ? (date - now) / 1000 / 60 / 60 : (date - now) / 1000 / 60;

        return relativeTimeFormatter.format(Math.floor(dateDiff) + 1, diffType);
    }

    return <div className="card">
        <div className="username" onClick={() => navigate("/user/" + question.user.id)}>
            <UserAvatar username={question.user.name} />
            {question.user.name}
        </div>
        <div className="question" onClick={() => navigate("/question/" + question.id)}>
            <h2>{question.title}</h2>
            <div className="question-infos">
                <p>Answers: {question.answerCount}</p>
                <p>{timeDifferenceFormatter(new Date(question.created))}</p>
            </div>
        </div>
    </div>
}