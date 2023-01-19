import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Loading from "../../Components/Loading";
import AnswerCard from "./AnswerCard";
import QuestionCardDetailed from "./QuestionCardDetailed";

export default function QuestionPage() {
  const { id } = useParams();
  const [questionDTO, setQuestionDTO] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/questions/' + id);
      const data = await response.json();
      console.log(data);
      setQuestionDTO(data);
    }
    fetchData();
  }, []);

  return questionDTO ?
    <div className="questionpage-cards">
      <QuestionCardDetailed questionPageDTO={questionDTO} />
      {questionDTO.answers.map(answer => <AnswerCard key={answer.id} answerDTO={answer} />)}

      <div className="card answer">
        <div className="answer user">Add new question:</div>

      </div>
    </div>
    :
    <Loading />
}