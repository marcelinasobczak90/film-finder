import Movie from "./Movie.container";

function MovieList(props) {
  const { movies, setMovies } = props;

  if (movies.length === 0) {
    return <p className="message">No movies given </p>;
  }

  return (
    <section>
      <ul className="movie-list">
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} setMovies={setMovies} />
        ))}
      </ul>
    </section>
  );
}

export default MovieList;
