function Header({ showForm, setShowForm }) {
  const appTitle = "Film Finder";

  return (
    <header className="header">
      <div className="logo">
        <img src="film.png" alt="film" />
        <h1>{appTitle}</h1>
      </div>

      <button
        className="btn btn-large btn-open"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Close" : "Share a movie"}
      </button>
    </header>
  );
}

export default Header;
