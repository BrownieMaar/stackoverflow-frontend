import { useNavigate } from "react-router-dom"
import { timeDifferenceFormatter } from "../../Tools/timeDifferenceFormatter";

export default function AnswerCard({answerDTO}) {
    const navigate = useNavigate();

    return <>
    <div className="card answer">
        <div className="answer user"><span className="clickable" onClick={() => navigate("/user/" + answerDTO.user.id)}>{answerDTO.user.name}</span> said:</div>
        <p>{answerDTO.answer}</p>
        <div className="flex-end" title={new Date(answerDTO.created).toLocaleString()}>{timeDifferenceFormatter(new Date(answerDTO.created))}</div>
    </div>
    </>
}