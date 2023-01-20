import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Loading from "../../Components/Loading";
import { getSignedInUserObject, isUserSignedIn } from "../../Tools/userFunctions";
import AnswerCard from "./AnswerCard";
import QuestionCardDetailed from "./QuestionCardDetailed";
import "./QuestionPage.css"

export default function QuestionPage() {
  const { id } = useParams();
  const [questionDTO, setQuestionDTO] = useState(null);
  const [answerInput, setAnswerInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/questions/' + id);
      const data = await response.json();
      console.log(data);
      setQuestionDTO(data);
      window.document.title = `${data.user.name}: ${data.title} - Stackoverflow++`
    }
    fetchData()
  }, []);


  const deleteAnswer = id => {
    fetch("/api/answers/" + id, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          const newQuestionDTO = { ...questionDTO };
          newQuestionDTO.answers = newQuestionDTO.answers.filter(answer => answer.id !== id)
          setQuestionDTO(newQuestionDTO);
        }
        else alert("error")
      })
  }

  const deleteQuestion = () => {
    fetch("/api/questions/" + id, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          navigate("/");
        }
        else alert("error")
      })
  }

  const handleSubmit = () => {
    fetch("/api/answers/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        answer: answerInput,
        question_id: questionDTO.id,
        user_id: getSignedInUserObject().id
      })
    })
      .then(res => res.json())
      .then(data => {
        const newQuestionDTO = { ...questionDTO };
        newQuestionDTO.answers.push(data);
        window.document.getElementById("answer-textarea").value = "";
        setQuestionDTO(newQuestionDTO);
      });
  }

  const handleQuestionVoteClick = async (isUpVote) => {
    if (!getSignedInUserObject()) return;

    const res = await fetch("/api/questions/vote", {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        vote: isUpVote,
        userId: getSignedInUserObject().id,
        questionId: questionDTO.id
      })
    });
    const isSuccess = await res.json();
    console.log(isSuccess);
    if (!isSuccess) return;
    const newQuestionDTO = { ...questionDTO };
    if (isUpVote) {
      const uid = getSignedInUserObject().id;
      newQuestionDTO.upVoteIds = newQuestionDTO.upVoteIds.includes(uid) ? newQuestionDTO.upVoteIds.filter(id => id !== uid) : newQuestionDTO.upVoteIds.push(uid)
    }
    if (!isUpVote) {
      const uid = getSignedInUserObject().id;
      newQuestionDTO.downVoteIds = newQuestionDTO.downVoteIds.includes(uid) ? newQuestionDTO.downVoteIds.filter(id => id !== uid) : newQuestionDTO.downVoteIds.push(uid)
    }
    setQuestionDTO(newQuestionDTO);
  }


  return questionDTO ?
    <div className="questionpage-cards">
      <QuestionCardDetailed questionPageDTO={questionDTO} deleteQuestion={deleteQuestion} handleVoteClick={handleQuestionVoteClick} />
      {questionDTO.answers.map(answer => <AnswerCard key={answer.id} answerDTO={answer} deleteAnswer={() => deleteAnswer(answer.id)} />)}

      <div className="card answer">
        {isUserSignedIn() ?
          <>
            <div className="answer user">Add new answer:</div>
            <textarea rows={3} onInput={e => setAnswerInput(e.target.value)} id="answer-textarea"></textarea>

            <div className="flex-end"><button className="clickable" onClick={handleSubmit}>Submit</button></div>

          </>
          :
          <>
            <div className="answer user">To post an answer to this question, <b className="clickable" onClick={() => navigate("/signin")}>Sign in</b> or <b className="clickable" onClick={() => navigate("/register")}>Register</b>.</div>
          </>
        }
      </div>
    </div>
    :
    <Loading />
}