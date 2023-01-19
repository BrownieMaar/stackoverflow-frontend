import "./avatar.css"

export default function UserAvatar({username, isBigSize=false}) {
    return <div className= {isBigSize ? "letter-avatar-big" : "letter-avatar"}>{username.slice(0, 1)}</div>
}