import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import "./HomePage.css"

export default function HomePage() {
    const [questions, setQuestions] = useState(null);

        
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/questions/all');
            const data = await response.json();
            console.log(data);
            setQuestions(data);
        }
        fetchData();
      }, []);

    return <div className="card-holder">{
        questions ? 
        <>{
            questions.map(question => <QuestionCard question={question} /> )
        }</>
        :
        <div>
            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
    }</div>
}