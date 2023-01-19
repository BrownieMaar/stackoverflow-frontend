import { useNavigate } from "react-router-dom";
import UserAvatar from "../../Components/UserAvatar";
import { getSignedInUserObject } from "../../Tools/checkUserSignedIn";
import { timeDifferenceFormatter } from "../../Tools/timeDifferenceFormatter";

export default function QuestionCardDetailed({ questionPageDTO }) {
    const navigate = useNavigate()

    return <div className="card detailed">
        <div className="username clickable" onClick={() => navigate("/user/" + questionPageDTO.user.id)}>
            <UserAvatar username={questionPageDTO.user.name} />
            <p>{questionPageDTO.user.name}</p>
        </div>
        <div className="question detailed">
            <h2>{questionPageDTO.title}</h2>
            <p>{questionPageDTO.description}</p>
            <div className="answer infos">
                <div>{getSignedInUserObject()?.id === questionPageDTO.user.id ? <p className="clickable" onClick={() => alert("Fuck you")}>🗑️</p> : ""}</div>
                <p className="flex-end" title={new Date(questionPageDTO.created).toLocaleString()}>{timeDifferenceFormatter(new Date(questionPageDTO.created))}</p>
            </div>
        </div>
    </div>
}