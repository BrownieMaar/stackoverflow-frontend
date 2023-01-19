import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import "./HomePage.css"
import Loading from "../../Components/Loading";

export default function HomePage() {
    const [questions, setQuestions] = useState(null);

        
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/questions/all');
            const data = await response.json();
            console.log(data);
            data.sort((questionA, questionB) => new Date(questionB.created) - new Date(questionA.created))
            setQuestions(data);
        }
        fetchData();
      }, []);

    return <div className="card-holder">{
        questions ? 
        <>{
            questions.map(question => <QuestionCard key={question.id} question={question} /> )
        }</>
        :
        <Loading />
    }</div>
}