import { useEffect, useState } from "react"

export default function Users() {
    const [userDTOs, setUserDTOs] = useState();

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

    return <div className="user-grid">

    </div>
}