import { useEffect, useState } from "react"
import Loading from "../../Components/Loading";
import UserCard from "./UserCard.jsx"
import "./UserCards.css"

export default function Users() {
    const [userDTOs, setUserDTOs] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/user/all');
            const data = await response.json();
            console.log(data);
            setUserDTOs(data);
        }
        fetchData();
      }, []);

    return userDTOs ? <div className="user-grid">
        {userDTOs.map(userDTO => <UserCard key={userDTO.id} userDTO={userDTO} /> )}
    </div>
    :
    <Loading />
}