export default function UserAvatar({username}) {
    return <div className="letter-avatar">{username.slice(0, 1)}</div>
}