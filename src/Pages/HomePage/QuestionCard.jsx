import { useNavigate } from "react-router-dom"
import "./Question.css"

export default function QuestionCard({ question }) {
    const navigate = useNavigate();

    return <div className="card" onClick={() => navigate("/question/" + question.id)}>
        <div className="username">{question.user.name}</div>
        <h2>{question.title}</h2>
    </div>
}