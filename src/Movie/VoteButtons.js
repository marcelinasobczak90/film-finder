import { useState } from "react";

function VoteButtons(props) {
  const { movie, setMovies, supabase } = props;
  const [isUpdating, setIsUpdating] = useState(false);
  const columnNames = ["votesLove", "votesLike", "votesHate"];

  function isButtonPresed(columnName) {
    return localStorage.getItem(`${movie.id}` + `${columnName}`) === "true"
      ? "pressed"
      : "unpressed";
  }

  function setNewLocalStorageVariable(columnName, value) {
    localStorage.getItem(`${movie.id}` + `${columnName}`);
    localStorage.setItem(`${movie.id}` + `${columnName}`, value);
  }

  function handlePressed(columnName) {
    if (localStorage.getItem(`${movie.id}` + `${columnName}`) !== null) {
      const opposite =
        localStorage.getItem(`${movie.id}` + `${columnName}`) === "true"
          ? "false"
          : "true";
      localStorage.setItem(`${movie.id}` + `${columnName}`, opposite);
    } else {
      setNewLocalStorageVariable(columnName, "true");
    }

    columnNames.forEach((name) => {
      if (name !== columnName) {
        setNewLocalStorageVariable(name, "false");
      }
    });
  }

  async function setUpdate(columnName, isPressed) {
    const counter = isPressed ? 1 : -1;
    setIsUpdating(true);
    const { data: updatedMovie, error } = await supabase
      .from("movies")
      .update({ [columnName]: movie[columnName] + counter })
      .eq("id", movie.id)
      .select();

    if (!error)
      setMovies((movies) =>
        movies.map((f) => (f.id === movie.id ? updatedMovie[0] : f))
      );
    setIsUpdating(false);
  }

  function getAnotherPressed(columnName) {
    let result = "";
    columnNames.forEach((name) => {
      if (
        name !== columnName &&
        localStorage.getItem(`${movie.id}` + `${name}`) === "true"
      ) {
        result = name;
      }
    });
    return result;
  }

  function handleVote(columnName) {
    // handling another buttons for movie pressed
    if (getAnotherPressed(columnName) !== "") {
      setUpdate(getAnotherPressed(columnName), false);
    }

    //handling pressing new button / the same button again
    handlePressed(columnName);
    const isPressed =
      localStorage.getItem(`${movie.id}` + `${columnName}`) === "true";
    setUpdate(columnName, isPressed);
  }

  return (
    <div className="vote-buttons">
      <button
        onClick={() => {
          handleVote("votesLove");
        }}
        disabled={isUpdating}
        className={isButtonPresed("votesLove")}
      >
        ❤️‍🔥 {movie.votesLove}
      </button>
      <button
        onClick={() => {
          handleVote("votesLike");
        }}
        disabled={isUpdating}
        className={isButtonPresed("votesLike")}
      >
        👍 {movie.votesLike}
      </button>
      <button
        onClick={() => {
          handleVote("votesHate");
        }}
        disabled={isUpdating}
        className={isButtonPresed("votesHate")}
      >
        👎 {movie.votesHate}
      </button>
    </div>
  );
}

export default VoteButtons;
