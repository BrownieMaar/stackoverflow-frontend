import { useParams } from "react-router-dom"

export default function QuestionPage() {
    const { id } = useParams();

    return <>Question n. {id}</>
}