import { useNavigate } from "react-router-dom"
import { getSignedInUserObject, isSignedInUserAdmin } from "../../Tools/userFunctions";
import { timeDifferenceFormatter } from "../../Tools/timeDifferenceFormatter";
import Vote from "../../Components/Vote";

export default function AnswerCard({ answerDTO, deleteAnswer, refresh }) {
    const navigate = useNavigate();
 
    return <>
        <div className="card answer">
            <div className="answer user"><span className="clickable" onClick={() => navigate("/user/" + answerDTO.user.id)}>{answerDTO.user.name}</span> said:</div>
            <p>{answerDTO.answer}</p>
            <div className="answer infos">
                <div>
                    <Vote card={answerDTO} refresh={refresh}/>
                </div>
                {getSignedInUserObject()?.id === answerDTO.user.id || isSignedInUserAdmin() ? <div className="clickable" onClick={deleteAnswer}>🗑️</div> : ""}
                <div className="flex-end" title={new Date(answerDTO.created).toLocaleString()}>{timeDifferenceFormatter(new Date(answerDTO.created))}</div>

            </div>
        </div>
    </>
}