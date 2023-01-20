import { useNavigate } from "react-router-dom";
import UserAvatar from "../../Components/UserAvatar";
import { getSignedInUserObject, isSignedInUserAdmin } from "../../Tools/userFunctions";
import { timeDifferenceFormatter } from "../../Tools/timeDifferenceFormatter";

export default function QuestionCardDetailed({ questionPageDTO, deleteQuestion, handleVoteClick }) {
    const navigate = useNavigate();

    

    return <div className="card detailed">
        <div className="username clickable" onClick={() => navigate("/user/" + questionPageDTO.user.id)}>
            <UserAvatar username={questionPageDTO.user.name} />
            <p>{questionPageDTO.user.name}</p>
        </div>
        <div className="question detailed">
            <h2>{questionPageDTO.title}</h2>
            <p>{questionPageDTO.description}</p>
            <div className="answer infos">
                <div>
                    <span onClick={() => handleVoteClick(true)} className={!getSignedInUserObject() ? "emoji" : questionPageDTO.upVoteIds.includes(getSignedInUserObject()?.id) ? "emoji upvote" : "emoji clickable glow"}>👍</span> {questionPageDTO.upVoteCount}&emsp;
                    <span onClick={() => handleVoteClick(false)} className={!getSignedInUserObject() ? "emoji" : questionPageDTO.downVoteIds.includes(getSignedInUserObject()?.id) ? "emoji downvote" : "emoji clickable glow"}>👎</span> {questionPageDTO.downVoteCount}
                </div>
                {getSignedInUserObject()?.id === questionPageDTO.user.id || isSignedInUserAdmin() ? <div className="clickable" onClick={deleteQuestion}>🗑️</div> : <></>}
                <div className="flex-end" title={new Date(questionPageDTO.created).toLocaleString()}>{timeDifferenceFormatter(new Date(questionPageDTO.created))}</div>
            </div>
        </div>
    </div>
}