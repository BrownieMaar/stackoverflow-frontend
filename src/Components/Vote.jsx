import React from "react";
import { useState, useEffect } from "react";
import "./Vote.css";

export default function Vote({ card, refresh }) {
  function handleVote(e) {
    let vote = null;

    e.target.id === "upVote" ? (vote = true) :
      e.target.id === "upVote-green" ? (vote = null) : (vote = false);

    if ("answer" in card) {

      fetch("/api/answers/vote", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vote: vote,
          userId: window.currentUser.id,
          answerId: card.id,
        }),
      }).then(() => {
        refresh();
      });

    } else {

      fetch("/api/questions/vote", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionId: card.id,
          userId: window.currentUser.id,
          vote: vote,
        }),
      }).then(() => {
        refresh();
      });
    }
  }

  return (
    <div className="votes">
      <span
        className="emoji"
        id={card.upVoteCount > 0 ? "upVote-green" : "upVote"}
        onClick={(e) => handleVote(e)}
      >
        🍆
      </span>{" "}
      {card.upVoteCount}&emsp;
      <span
        className="emoji"
        id={card.downVoteCount > 0 ? "downVote-red" : "downVote"}
        onClick={(e) => handleVote(e)}
      >
        👎
      </span>{" "}
      {card.downVoteCount}
    </div>
  );
}
