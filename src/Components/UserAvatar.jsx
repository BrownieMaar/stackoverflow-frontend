import "./avatar.css";

export default function UserAvatar({ user, isBigSize = false }) {
  return (
    <div
      className={
        isBigSize ? "letter-avatar-big tooltipBig" : "letter-avatar tooltip"
      }
    >
      {user.name.slice(0, 1)}
      <span className="tooltiptext">
        id: {user.id}
        <br />
        name: {user.name}
        <br />
      </span>
    </div>
  );
}
